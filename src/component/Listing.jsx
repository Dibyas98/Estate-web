import React, { useMemo, useState } from 'react'
import CreateListing from './CreateListing';
import '../assets/style/listingtab.css'

function Listing() {
    let[tab,setTab]= useState('myListing');
    const handelTab =()=>{
        if(tab== 'myListing'){
            setTab('createlisting')
        }else if(tab == 'createlisting'){
            setTab('myListing')
        }
    }
    return (
        <div className='w-full flex justify-center flex-col'>
            <div className='flex  justify-center w-full py-2 font-semibold' onClick={()=> handelTab()}>
                <button className={`w-2/5  flex flex-col  items-center  gap-2 ${tab=='createlisting'?'tab':null}`}><span className=''>Create Listing</span></button>
                <button className={`w-2/5  flex flex-col  items-center  gap-2 ${tab=='myListing'?'tab':null}`}><span>My Listing</span></button>
            </div>

            {tab=='createlisting' && <CreateListing setTab={handelTab}></CreateListing>}
            {/* {tab=='myListing' && <h1>Listing</h1>} */}
        </div>
    )
}

export default Listing