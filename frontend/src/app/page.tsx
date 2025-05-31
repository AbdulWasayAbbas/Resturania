"use client";
import ProductList from "../../components/productComponents/ProductList";
import { useCart } from "../../components/cartComponents/CartContext";
import ProductList2 from "../../components/productComponents/productList2";


export default function Home() {
  
  const { isOpen } = useCart();
  return (
    <div className={`flex flex-col transition-transform  duration-300   p-8 bg-slate-200 h-full ${
    isOpen ? ' sm:w-full md:w-[70vw] lg:w-[80vw]' : 'w-full'}`}>
    {/* <ProductList /> */}
        <ProductList2/>
        
      </div>
  );
}
