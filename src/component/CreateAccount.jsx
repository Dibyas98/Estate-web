import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { ContextProp } from '../context/Context';
import axios from 'axios';
import { apicall } from '../function/apiweb';
import PreLoader from './PreLoader';

export default function CreateAccount() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const { handleFormData,loader,setload } = useContext(ContextProp);
  const navigate = useNavigate();

  async function handleForm(e) {
    e.preventDefault();
    setload(true)
    const user = {
      username: userName,
      email: email,
      password: password,
      mobile: mobileNumber
    };
    try {
      console.log('here');
      const res = await axios.post(`${apicall}api/user/signup`, user);
      // const res = await axios.post('/api/user/signup',user);
      navigate('/signin'); 
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      setload(false)
    }
  }

  useEffect(()=>{
    setload(false)
  })

  return (
    <>
    {loader && <PreLoader></PreLoader>}
    <div className='w-full flex justify-center py-10'>
      <div className='w-4/5 flex flex-col items-center gap-4 b xl:w-2/6 xl:px-10'>
        <h2 className='text-3xl font-bold'>Create Account</h2>
        <form onSubmit={handleForm} className='flex flex-col items-center gap-4 w-full'>
          <input type="text" placeholder='User Name' value={userName} onChange={(e) => setUserName(e.target.value)} className='h-8 w-full rounded-sm px-1 xl:h-12' />
          <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='h-8 w-full rounded-sm px-1 xl:h-12' />
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='h-8 w-full rounded-sm px-1 xl:h-12' />
          <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='h-8 w-full rounded-sm px-1 xl:h-12' />
          <input type="text" placeholder='Mobile Number' value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className='h-8 w-full rounded-sm px-1 xl:h-12' />
          <div>
            <input type='submit' className='button-3' value='Sign up' />
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
