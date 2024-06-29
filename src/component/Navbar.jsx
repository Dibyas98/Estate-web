import React, { useContext, useEffect } from 'react'
import { CircleChevronLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { store } from '../redux/store.js'

import MobileMenu from './MobileMenu';
import { ContextProp } from '../context/Context';

export default function Navbar() {
    const { handelSideBar, SideBar } = useContext(ContextProp);
    const CurrentLogin = useSelector((store) => store);


    return (
        <div className='w-full h-10 xl:h-14 bg-[#E2E8F0] flex justify-center items-center px-2 sticky z-10 top-0'>
            <div className='w-full xl:w-9/12 h-full flex items-center justify-between'>
                <div>
                    <h1>Dibya Estate</h1>
                </div>
                <div className='flex  justify-center'>
                    <input type="text" className='border-none w-3/4' />
                    <Search className='bg-white'></Search>
                </div>
                <div>
                    <CircleChevronLeft className='xl:hidden' onClick={() => handelSideBar()}></CircleChevronLeft>
                    <div className='hidden  xl:flex gap-6'>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/about'}>About</Link>
                        {CurrentLogin.user.currentUser == null ? <>
                            <Link to={'/signin'}>Sign in</Link>
                            <Link to={'/signup'}>Create Account</Link></> : <>
                            <Link to={'/listing'}>My Listing</Link>
                            <Link to={'/logout'}>Logout</Link></>}
                    </div>
                </div>
            </div>
            {SideBar && <MobileMenu user ={CurrentLogin.user.currentUser} ></MobileMenu>}

        </div >
    )
}
