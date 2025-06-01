"use client";
import Link from "next/link";
import { useCart } from "./CartContext";

export default function CartSlider() {
  const { cartItems, total, toggleCart, isOpen } = useCart();

  return (
    <div className={`flex flex-col justify-between fixed top-0 right-0 h-full bg-white border-x-1 border-slate-200 overflow-visible shadow-xl  w-max sm:w-[50vw] md:w-[30vw] lg:w-[20vw] p-4 z-0 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div >
            <div className="flex space-x-2 justify-between items-center mt-2 mb-5">
                <button onClick={toggleCart} title="Cart" className="cursor-pointer border-2 border-[#800000] bg-transparent text-[#800000] bg px-2.5 rounded-full font-light text-2xl">x</button>
                <h2 className="text-lg font-bold place-self-center  text-black">Your Cart</h2>
            </div>

            {cartItems.length !== 0 ?  <>
            
            <ul className="space-y-2  ">
                {cartItems.map(item => (
                <li key={item.id} className="flex justify-between space-x-2 border-t-1 border-slate-200 pt-2 text-black capitalize">
                    <span className="flex space-x-2 ">
                      <span className="font-bold">{item.quantity}</span>
                      <h1 className="font-normal capitalize">{item.name}</h1>
                    </span>

                    <span>Rs.{item.price*item.quantity }</span>
                </li>
                ))}
            </ul>
        
            <div className="mt-4 border-t-1 border-slate-300 pt-2">
                <div className="flex justify-between font-semibold text-black">
                <span>Total:</span>
                <span>Rs.{total}</span>
                </div>

            </div>
         </>: <h2 className="text-sm place-self-center  font-bold  text-black">Your Cart is Empty</h2>    }
        </div>
        {cartItems.length !== 0 ? 
          
            <Link href="/checkout" passHref >
              <button className="w-full mt-4 bg-[#800000] text-white p-2 rounded place-self-end self-end cursor-pointer group " onClick={isOpen?toggleCart:()=>{}}>
                Checkout
              </button>
            </Link>
        : <></>}
    </div>
  );
}
