import React, { useContext, useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { signinStart, signinSuccess } from '../redux/userSlice';
import { json, useNavigate } from 'react-router-dom'
import { ContextProp } from '../context/Context';
import PreLoader from './PreLoader';
import { apicall } from '../function/apiweb';
import Cookies from 'js-cookie'

export default function SignIn() {
    const { loader, setload,Conterror,setContError } = useContext(ContextProp)
    useEffect(()=>{
        setload(false)
    },[])
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [formData, setformData] = useState({});
    async function handelForm(e) {
        try {
            setload(true)
            dispatch(signinStart());
            e.preventDefault();
            const res = await axios.post(`${apicall}api/user/signin`, formData,);
            Cookies.set("access_token",res.data.token)
            dispatch(signinSuccess(res.data))
            setContError(null)
            navigate('/')

        } catch (error) {
            console.log(error);
            setContError(error.response.data.message)
            setload(false)

        }
    }
    function handelChange(e) {
        setformData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    return (
        <>
        {loader && <PreLoader></PreLoader>}
            <div className='w-full flex py-10 flex-col items-center gap-2'>
                <div className='w-4/5  flex flex-col items-center gap-4 b xl:w-2/6 xl:px-10'>
                    <h2 className='text-3xl font-bold'>Sign in</h2>

                    {Conterror && <h1 className='font-semibold text-xl text-red-500'>{Conterror}</h1>}
                    <form action="" className='w-full flex flex-col gap-4' onSubmit={handelForm}>
                        <input type="text" className='h-8 w-full rounded-sm px-1 xl:h-12' placeholder='Email' id='email' onChange={handelChange} />
                        <input type="password" className='h-8 w-full rounded-sm px-1 xl:h-12' placeholder='Password' id='password' onChange={handelChange} />
                        {<div className='w-full flex justify-between px-5'>
                            <button className='button-3 ' type='submit'>Sign in</button>
                            <button className='button-1' >Forget Password</button>
                        </div>}
                    </form>
                    <p>OR</p>

                </div>
                <div>
                    <button className='button-15'>Continue with Google</button>
                </div>
                <div className='w-full  text-center flex justify-center gap-1'>
                    <span>Dont Have an account? </span>
                    <a href="" className='text-sky-600 hover:underline flex'>Create Account<ChevronRight ></ChevronRight ></a>
                </div>

            </div>
        </>
    )
}
