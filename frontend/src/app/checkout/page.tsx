"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useCart } from "../../../components/cartComponents/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();


  interface FormData {
    name: string;
    email: string;
    phone: string;
    address: string;
  }

  interface Errors {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  }

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [errors, setErrors] = useState<Errors>({});
  const [check, setCheck] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const { cartItems, totalItems, total,clearCart } = useCart();
  const [isOrderSummarOpen, setIsOrderSummaryOpen] = useState(false);
  const checkoutItems = cartItems.map(item => ({
    product: item.id,
    quantity: item.quantity
  }));
  


  useEffect(() => {
    console.log("I..................");
    console.log(cartItems.length);
    
    if (cartItems && cartItems.length === 0) {
      console.log("Getting back");
      router.back();
    }
    else{
      setCheck(true);
    }
}, [cartItems,router]);


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (): Errors => {
    const newErrors: Errors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'A valid email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Enter a valid phone number (10–12 digits)';
    } else if (!/^\d{10,12}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10–12 digits';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address cannot be empty';
    }

    return newErrors;
  };

  function createOrderJSON() {
    return {
      "name": formData.name,
      "email":formData.email,
      "phone": formData.phone,
      "address": formData.address,
      "order": checkoutItems
    };
  }

  const checkoutOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage('');
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("||||||||||||||||||||||||||||||||");
      let o = createOrderJSON();
      console.log(o);

      try {
        const response = await fetch("http://localhost:1337/api/order/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body:  JSON.stringify({
            username: formData.name,
            email:formData.email,
            phone: formData.phone,
            address: formData.address,
            order_items: checkoutItems
          })
        });

        if (!response.ok) throw new Error("Failed to send order.");

        const data = await response.json();
        console.log("Order placed successfully:", data);
        alert("Order placed successfully!");
        clearCart();
        setSuccessMessage("Order placed successfully!");

        // Reset form
        setFormData({ name: '', email: '', phone: '', address: '' });

      } catch (error) {
        console.error("Error:", error);
        alert("Failed to place order.");
      }
    }
  };

  console.log(cartItems)
  console.log('\\\\\\\\\\')
  if(!check){
    return null;
  }
  return (
    <form onSubmit={checkoutOrder}>
      <div className="min-h-screen bg-slate-100 px-4 py-8 font-sans pt-[6%] flex justify-center items-center">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Details */}
            <div className="bg-white rounded shadow p-6 space-y-4">
              <h2 className="font-bold text-lg">Delivery details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <div className="flex items-center border p-2 rounded w-full">
                    <span className="px-2">🇵🇰</span>
                    <span>+92</span>
                    <input
                      type="tel"
                      name="phone"
                      className="ml-2 w-full outline-none"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>

              <textarea
                placeholder="Add delivery instructions (optional)"
                className="border p-2 rounded w-full"
              ></textarea>

              {successMessage && <p className="text-green-600 font-semibold">{successMessage}</p>}
            </div>

            {/* Payment Details */}
            <div className="bg-white rounded shadow p-6">
              <h2 className="font-bold text-lg mb-2">Payment details</h2>
              <div className="border p-2 rounded flex items-center space-x-2">
                <input type="radio" checked readOnly />
                <span>Cash on delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white rounded shadow p-6 space-y-4 h-max">
            <div className="w-full max-w-md mx-auto mt-0 p-0 bg-white shadow">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsOrderSummaryOpen(!isOrderSummarOpen)}
              >
                <h2 className="text-lg font-semibold">Order Summary</h2>
              </div>

              {isOrderSummarOpen && (
                <ul className="mt-4 space-y-3 transition-all duration-300">
                  {cartItems.map((item, index) => (
                    <li key={index}>
                      <div className="flex justify-between text-base font-medium">
                        <span className="flex space-x-0.5">
                          <span className="font-bold">{item.quantity}</span>
                          <h1 className="font-normal capitalize">( {item.name} )</h1>
                        </span>
                        <span>Rs.{item.price * item.quantity}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <h2 className="font-bold text-lg">Order Total</h2>
            <div className="text-sm flex justify-between">
              <span>Subtotal (<span className="text-gray-500 px-1">{totalItems} items</span>)</span>
              <span>Rs {total}</span>
            </div>

            <div className="text-sm text-gray-500">
              <p>Have a coupon?</p>
              <p>To avail discount, please update your address.</p>
            </div>

            <div className="font-semibold flex justify-between">
              <span>Total</span>
              <span>Rs {total}</span>
            </div>

            <button className="bg-red-700 text-white w-full py-2 rounded hover:bg-red-800" type="submit">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
