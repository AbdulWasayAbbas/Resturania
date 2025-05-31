'use strict';

const bcrypt = require('bcryptjs');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async submitOrder(ctx) {
        console.log("|||||||||||||| Body |||||||||||||||||")
        console.log(ctx.request.body)
        try {
            let { username, phone,email,address, order_items } = ctx.request.body;

            if (!username || !phone) {
                return ctx.badRequest("Username and phone are required.");
            }

            if (!Array.isArray(order_items) || order_items.length === 0) {
                return ctx.badRequest("Order must contain at least one item.");
            }

            if(!email){
                email = `${username.toLowerCase()}@example.com`;
            }

            const defaultPassword = '12345678';

            // find the role ID for the role you want (e.g., 'authenticated' or 'customer')
            const role = await strapi.query('plugin::users-permissions.role').findOne({
                where: { type: 'customer' }
            });
            
            if (!role) {
                return ctx.badRequest('Role not found');
            }
            
            // User Check and creation if new 
            let user = await strapi.query('plugin::users-permissions.user').findOne({
                where: { username:username,phone:phone } 
            });

            console.log("|||||||||||||||||")
            

            if(!user){
                console.log("its a new User")
        
                // hash password 
                const hashedPassword = await bcrypt.hash(defaultPassword, 10);
        
                user = await strapi.query('plugin::users-permissions.user').create({
                    data: {
                        username,
                        email,
                        password: hashedPassword,
                        role: role.id,
                        phone,
                        address,
                        confirmed: true,
                    },
                });
            }


        

            let totalPrice = 0;
            const orderItemsToCreate = [];

            for (const item of order_items) {
                const product = await strapi.entityService.findOne('api::product.product', item.product, {
                    fields: ['price', 'name'],
                });

                if (!product) {
                return ctx.badRequest(`Product with ID ${item.id} not found.`);
                }

                console.log(product.name)

                const unit_price = product.price;
                const quantity = item.quantity;
                const sub_total = unit_price * quantity;
                totalPrice += sub_total;

                orderItemsToCreate.push({
                    product: {
                        connect:[product.documentId]
                    },
                    unit_price,
                    sub_total,
                    quantity,
                });
            }

            const createdOrder = await strapi.entityService.create('api::order.order', {
                data: {
                    user: {
                        connect:[user.id]
                    },
                    order_status: 'Pending',
                    total: totalPrice,
                },
                
                // populate: ['order_items'], // Populate to include related data
            });

            console.log(typeof(user.id))

            let items_ids =[]
        
            for (const item of orderItemsToCreate) {
                console.log('||||||||||||||||||||||||||||||')
                console.log(createdOrder.id)
                console.log(item)
                
                
                const createdItems = await strapi.entityService.create('api::order-item.order-item', {
                data: {
                    order: {
                        connect:[createdOrder.id]
                    },
                    ...item,
                },
                //   populate: ['order','product 
                
                });
                items_ids.push(createdItems.id)
            }
               console.log('|||||||||||||||||||||||||||||| placed order')
             const orderUpdate = await strapi.entityService.update('api::order.order',createdOrder.id,{
                    data: {
                        order_items: {
                            connect:[...items_ids]
                        },
                    },

                });

            return ctx.send({
                message: "Order placed successfully.",
                orderId: createdOrder.id,
                userId: user.id,
            });

        } catch (err) {
            
            
            console.error(err);
            return ctx.internalServerError("An error occurred while placing the order.");
        
        }
    },

    async findOrders(ctx) {
        try {
            
        const { id } = ctx.query;

            console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\")
            console.log(id)
            const data = await strapi.query('plugin::users-permissions.user').findOne({
                where:{id:id},
                populate: {
                    orders: {
                        populate: {
                            order_items: {
                                populate: ['product'],
                            }
                        },
                    },
                },
            });
            
            console.log(data)
            return data;
            
        } catch (error) {
            console.log(error)
            return ctx.internalServerError("An error occurred while finding the order.");
        }
    },


}));