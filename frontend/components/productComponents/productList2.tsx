"use client";

import { useEffect, useState } from "react";
import { useCart } from "../cartComponents/CartContext";

import ProductCard from "./ProductCard";
import ApiManager from "../../src/api/apiManager";

type category = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  products: [];
};

export default function ProductList2() {
    const { incrementItem,decrementItem } = useCart();
    const [data, setData] = useState<category[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      
      useEffect(()  => {
        ApiManager.getProducts();
      const fetchData = async () => {
        try {
          
          const response = await fetch('http://localhost:1337/api/categories?populate[products]][fields][0]=name&populate[products][fields][1]=description&populate[products][fields][2]=price&populate[products][populate][image][fields][0]=url')    
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result = await response.json();
          setData(result.data);
          console.log(result.data)
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);

  return (
    loading?
  (<div className='flex w-full h-screen justify-center items-center '>
    <h1 className="text-3xl font-bold text-[#800000]">Resturania 🍽️ </h1>
  </div>)
  :
   ( <div className="w-full bg-slate-200 p-10 space-y-4">

      {data.map((category) => (
        <div key={category.id} className="p-5 bg-white  rounded-xl">
          <h1 className="text-2xl font-bold  capitalize">{category.name}</h1>
          <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 p-4  ">
            {category.products.map((product)=>(
              <ProductCard
              key={product['id']}
              product={product}
              />
            ))}
          </div>
        </div>
      ))}
    </div>)
  );
}
