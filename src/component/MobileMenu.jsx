import React, { useContext } from 'react'
import { X } from 'lucide-react';
import { ContextProp } from '../context/Context';
import { Link } from 'react-router-dom';

export default function MobileMenu({user}) {
    const{handelSideBar,SideBar} = useContext(ContextProp)
    return (
        <div className='w-full h-full bg-[#8AF5C8CC] fixed z-10 top-0 flex justify-end xl:hidden md:hidden lg:hidden'>
            <X className='mt-2'onClick={()=> handelSideBar()}></X>
            <ul className='w-3/4 bg-slate-500 flex flex-col items-center gap-3 py-6 px-2 '>
                <Link to={"/"} className='w-full'><li className='hover:border-b-2 w-full h-10 text-center py-2'>Home</li></Link>
                <Link to={"/about"} className='w-full'><li className='hover:border-b-2 w-full h-10 text-center py-2'>About</li></Link>
                {user== null ?<><Link to={'/signin'}>Sign in</Link>
                    <Link to={'/signup'}>Create Account</Link></>:<><Link to={'/listing'}>Create Listing</Link> <Link to={'/logout'}>Logout</Link></>}

            </ul>
        </div>
    )
}
