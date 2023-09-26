'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const page = () => {
// eslint-disable-next-line react-hooks/rules-of-hooks
const [data, setData] = useState()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      // eslint-disable-next-line react-hooks/rules-of-hooks
      } = useForm()
      const onSubmit = (data) => {
        axios.post("https://mong-next.vercel.app/api/topics", data)
        .then(data=>{
            console.log(data);
        })
      };

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(()=>{
        fetch("https://mong-next.vercel.app/api/topics/")
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setData(data)
        })
      },[])
    return (
        <div>
            <h1 className='text-4xl font-bold text-center'>Connect to mongodb</h1>
            <div>
             <form onSubmit={handleSubmit(onSubmit)} className='bg-slate-300 p-5 flex flex-col gap-3 w-2/4 mx-auto'>

             <input  {...register("name")} type="text" placeholder='type your name' />
                <input  {...register("email")} type="text" placeholder='type your email' />
                <input  {...register("des")} type="text" placeholder='type your description' />
                <button>Submit</button>
             </form>
            </div>
            <div className='border '>
{
    data?.map(m=>(
        <div className='bg-red-200 border border-red-500 p-5 m-4' key={m._id}>
            <p>{m?.name}</p>
            <p>{m?.des}</p>
            <p>{m?.email}</p>
        </div>
    ))
}
            </div>
        </div>
    );
};

export default page;