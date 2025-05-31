"use client";
import { useEffect, useState } from "react";
import { useCart } from "../cartComponents/CartContext";

type Product = {
  id: string;
  name: string;
  price: number;
  quantity:number;
  image:{url:string}
};

type ProductCardProps = {
  product: Product;
  incrementItem: (product: Product) => void;
  decrementItem: (product: Product) => void;
};

export default function ProductCard({ product}: {product:Product}) {
// export default function ProductCard({ product, incrementItem,decrementItem }: ProductCardProps) {
  
  const [count,setCount] = useState(0);
  const { cartItems, decrementItem, incrementItem} = useCart();

  useEffect(() => {
    cartItems.map((item)=>(item.id==product.id&&
      setCount(item.quantity)
    ))
  }, [])
  
  
  return (

    <div key={product.id} className="border-slate-300 border h-[200px] rounded-xl shadow flex flex-col justify-end"
     style={{backgroundImage:`url(http://localhost:1337${product.image.url})`, backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat'}}
    >
      <div className="w-full h-max bg-black/50 p-2 rounded-b-xl">
        
        <h3 className="font-semibold text-white text-sm sm:text-md md:text-lg lg:text-2xl capitalize ">{product.name}</h3>
        
        <div className="flex w-full text-white text-xs md:text-sm pl-1 bg-green-00 justify-between items-center">
          <p>Rs.{product.price}</p>
          
          {count<=0?
          <button
            onClick={() =>{
              setCount(count+1)
              incrementItem(product)}}
              className="bg-transparent hover:bg-black/40 border-2 border-white text-xs md:text-sm lg:text-md text-white px-3 py-0.5  lg:py-1 rounded-xl">  
          
          Add to Cart
          
          </button>
          :
          <div className="flex w-max space-x-1 justify-between items-center bg-amber-00">
            
            
            <button
              onClick={() => {setCount(count-1)
                decrementItem(product)}}
              className="bg-transparent hover:bg-black/40 border-2 border-white  text-xs md:text-sm lg:text-md text-white px-3 mr-2 py-0.5  lg:py-1 rounded-xl">-</button>
                <h1 className="text-xs md:text-sm lg:text-md">
                  {count}
                </h1>
            
            <button
              onClick={() => 
                {setCount(count+1)
                incrementItem(product)}}
              className="bg-transparent hover:bg-black/40 border-2 border-white text-xs md:text-sm lg:text-md  text-white px-3 ml-2  py-0.5  lg:py-1 rounded-xl">+</button>
                
          </div>
          }
      
        </div>
      
      </div>
    
    </div>
  );
}
