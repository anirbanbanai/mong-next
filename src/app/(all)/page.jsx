'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

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
            .then(data => {
                console.log(data);
            })
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetch("https://mong-next.vercel.app/api/topics/")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data)
            })
    }, []);

    const handleDelete = (id) => {
        console.log(id);
        axios.delete(`https://mong-next.vercel.app/api/topics?id=${id}`)
        .then(data=>{
            console.log(data);
            if(data.data.message === "Topic deleted"){
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }
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
                    data?.map(m => (
                        <div className='bg-red-200 border border-red-500 p-5 m-4' key={m._id}>
                            <div>
                                <p>{m?.name}</p>
                                <p>{m?.des}</p>
                                <p>{m?.email}</p>
                            </div>
                            <div>
                                <button onClick={() => handleDelete(m?._id)} className='btn bg-red-500 p-3'>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default page;