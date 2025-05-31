"use client";
import { useEffect, useState } from 'react'
import ProductCard from '../../../components/ProductCard'
function page() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(()  => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/categories?populate[products][populate]=image')    
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
    
  return loading?
  (<div className='flex w-full h-screen justify-center items-center'>laoding</div>):
  (<div className='flex flex-col w-full h-full pt-[4%] px-10 bg-slate-200'>
    {
        data.map((e)=>{
          
          return (
          <>
            <div key={e.id} className='text-black font-bold text-2xl'>
              {e.name}
            </div>
            
            {e.products.map((product,index)=>(
              <div key={index} className='text-black pl-5 m-2'>
                <ProductCard product={product}/>
                

               
              </div>
            
            ))}
          </>
          )
        })
    }
  </div>)

}

export default page