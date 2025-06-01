import EndPoints from "./endPoints";

const ApiManager = {

    getProducts: async () => {
        const url = process.env.RESTURANIA_BASE_URL+ EndPoints.getProducts;
        console.log(url,"---------",process.env.REACT_APP_BASE_URL);
        try {
            // const response = await axios.get(url);
            // return response;
        } catch (error) {
            console.error(error);
            return error;
        }

        const response = {
            "success":true,
            "data": {
                "info": "We believe in driving innovation with a purpose. Our commitment to excellence is at the core of everything we do, propelling us to create solutions that not only meet the needs of today but also lay the foundation for a better tomorrow. By fostering a culture of integrity, collaboration, and continuous improvement, we empower our teams to push boundaries and achieve greatness. With every product we design, every service we deliver, and every customer we serve, we aim to make a positive impact on the world. We're not just building a business—we're building a legacy of success and a future that benefits us all."
            }
        };
        return response;
    },

    // loginUser: async (email, password) => {
    //     const url = process.env.REACT_APP_BASE_URL + EndPoints.login;
    //     console.log("loginUser URL ------",url,"----creds----",email,password);
    //     const loginData = {
    //         email: email,
    //         password: password,
    //     };
    //     // try {
    //     //     const response = await axios.post(url, loginData);
    //     //     return response.data;
    //     // } catch (error) {
    //     //     let response = error.response.data;
    //     //     return response
    //     // }

    //     const response = {
    //         "success": true,
    //         "data": {
    //             "token": "fb566635a66295da0c8ad3f467c32dcf"
    //         }
    //     }
    //     return response;

    // },

    // getProfile: async (authToken) => {

    //     const url = process.env.REACT_APP_BASE_URL + EndPoints.getProfile;
    //     console.log("get Profile URL ------",url,"----Token----",authToken);
    //     // try {
    //     //     const response = await axios.get(`${url}?token=[${authToken}]`)
    //     //     return response;
    //     // } catch (error) {
    //     //     console.error(error);
    //     //     return error;
    //     // }
    //     const response = {
    //         "success": true,
    //         "data": {
    //             "fullname": "Aleksei K",
    //             "email": "aleksei@example.com"
    //         }
    //     }
    //     return response;
        
    // },


    // getAuther: async (authToken) => {

    //     const url = process.env.REACT_APP_BASE_URL + EndPoints.getAuthor;
    //     console.log("get Author URL ------",url,"----Token----",authToken);
    //     // try {
    //     //     const response = await axios.get(`${url}?token=[${authToken}]`)
    //     //     return response;
    //     // } catch (error) {
    //     //     console.error(error);
    //     //     return error;
    //     // }
    //     const response = {
    //         "success": true,
    //         "data": {
    //             "authorId": 1,
    //             "name": "Charlie Chaplin"
    //         }
    //     }
    //     return response;
    // },


    // getQuote: async (authToken,authorId) => {

    //     const url = process.env.REACT_APP_BASE_URL + EndPoints.getQuote;

    //     console.log("get Quote URL ------",url,"----Token----",authToken,"------authorID-----",authorId);
    //     // try {
    //     //     const response = await axios.get(`${url}?token=[${authToken}]&authorId=[${authorId}]`)
    //     //     return response;
    //     // } catch (error) {
    //     //     console.error(error);
    //     //     return error;
    //     // }
    //     const response = {
    //         "success": true,
    //         "data": {
    //             "quoteId": 1,
    //             "authorId": 1,
    //             "quote": "A day without laughter is a day wasted."
    //         }
    //     };
    //         return response
        

    // },


    // logoutUser: async (authToken) => {
    //     const url = process.env.REACT_APP_BASE_URL + EndPoints.logout;
    //     console.log("logoutUser URL ------",url,"----Token----",authToken);
    //     // try {
    //     //     const response = await axios.delete(`${url}?token=[${authToken}]`);
    //     //     return response;
    //     // } catch (error) {
    //     //     console.error(error);
    //     //     return error;
    //     // }

    //     const response ={
    //         "success": true,
    //         "data": {}
    //     }
    //     return response;
    // },







};

export default ApiManager;