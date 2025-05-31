"use client";
import { usePathname } from "next/navigation";
import { useCart } from "./cartComponents/CartContext";

export default function Navbar() {
  const pathname = usePathname()

  const hideCart = ['/checkout',]
  const shouldShowCart = !hideCart.includes(pathname)
  const { toggleCart,cartItems } = useCart();

  return (
    <nav className="flex h-[60px]  fixed w-full items-center justify-between p-4 shadow-md bg-[#800000]">
      <div className="font-medium text-xl text-white">🍽️ Resturania </div>

      {/* <input
        type="text"
        placeholder="Search meals..."
        className="border rounded-2xl border-black px-3 py-1  w-1/2 text-black"
      /> */}

      {shouldShowCart && <div className="flex gap-4 items-center group relative cursor-pointer" onClick={toggleCart}>
        {/* <button title="Profile" color="White" className="text-white">👤</button> */}
        <button  title="Cart" className="cursor-pointer text-white text-2xl">🛒</button>
         
         {cartItems.length>0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cartItems.length}
        </span>}
      </div>}
    </nav>
  );
}
