"use client";
import { useCart } from "./CartContext";

export default function Slider() {
  const { cartItems, total, toggleCart, isOpen } = useCart();

  return (
    <div className={`flex flex-col justify-between top-0 right-0 h-screen bg-white border-x-2 border-slate-200 overflow-visible shadow-lg ${isOpen? 'w-[15%]':'w-[0px]'}  p-4 z-0 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-[15%]"}`}>
        <div>
            <div className="flex space-x-2 justify-between items-center mt-2 mb-5">
                <button onClick={toggleCart} title="Cart" className="cursor-pointer border-1 border-[#800000] bg-transparent text-[#800000] bg px-2.5 rounded-full font-light text-2xl">x</button>
                <h2 className="text-lg font-bold place-self-center  text-black">Your Cart</h2>
            </div>

            {cartItems.length !== 0 ?  <>
            
            <ul className="space-y-2">
                {cartItems.map(item => (
                <li key={item.id} className="flex justify-between text-black">
                    <span className="space-x-2">
                    <span className="font-bold">{item.quantity}</span>
                    <span>{item.name}</span>
                    </span>

                    <span>${item.price*item.quantity }</span>
                </li>
                ))}
            </ul>
        
            <div className="mt-4 border-t pt-2">
                <div className="flex justify-between font-semibold text-black">
                <span>Total:</span>
                <span>${total}</span>
                </div>

            </div>
         </>: <h2 className="text-sm place-self-center  font-bold  text-black">Your Cart is Empty</h2>    }
        </div>
        {cartItems.length !== 0 ? <button className="w-full mt-4 bg-[#800000] text-white p-2 rounded place-self-end self-end">
          Checkout
        </button>:<></>}
    </div>
  );
}
