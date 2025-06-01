"use client";
import { useCart } from "../../components/cartComponents/CartContext";
import ProductList from "../../components/productComponents/productList";

export default function Home() {
  
  const { isOpen } = useCart();
  return (
    <div className={`flex flex-col transition-transform  duration-300   p-8 bg-slate-200 h-screen ${
      isOpen ? ' sm:w-full md:w-[70vw] lg:w-[80vw]' : 'w-full'}`}>
    
      <ProductList/>
        
    </div>
  );
}
