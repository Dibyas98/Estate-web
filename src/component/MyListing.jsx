import React, { useEffect, useState } from 'react'
import { Eye, Trash2 } from 'lucide-react';
import axios from 'axios';
import { apicall } from '../function/apiweb';
import { useDispatch, useSelector } from 'react-redux';
import { deleteList, listing } from '../redux/listingSlice';
import { FetchApi } from '../function/Mylisting';
import { nanoid } from '@reduxjs/toolkit';
import PreLoader from './PreLoader';




const Text = ({ title, style }) => {
    return (
        <p className={`${style}`}>{title}</p>
    )
}

const Button = ({ title, icon: Icon,func,data }) => {
    return (
        <button className='flex items-center gap-2 justify-between border rounded-sm px-1 font-semibold bg-[#3d9ee340] text-[#000000db]' onClick={()=>func?func(data):null}>
            {title}
            {Icon && <Icon />}
        </button>
    )
}


const ListingCard = ({ data,deleteFunc }) => {
    return (
        <section className='w-full h-28   py-2'>
            <div className='w-full h-full flex gap-5 items-center justify-center'>
                <div className='w-1/5 border-2 h-full flex gap-2 flex-wrap overflow-y-scroll no-scrollbar justify-center py-1 rounded-sm'>
                    {
                        data.imageUrls.map((ele) => {
                            return <div className='w-24 h-10' key={nanoid()}>
                                <img src={ele} className='w-full h-full' />
                            </div>
                        })
                    }
                </div>
                <div className='text-left w-3/5 '>

                    <Text title={data.name} style={'font-bold text-xl'}></Text>
                    <Text title={data.description}></Text>
                    <div>
                        <Text title={`RS ${data.regularPrice}`} style={`italic font-semibold`}></Text>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <Button title={'View'} icon={Eye}></Button>
                    <Button title={'Delete'} icon={Trash2} data={data} func={deleteFunc}></Button>
                </div>
            </div>
        </section>
    )
}


function MyListing() {
    const dispatch = useDispatch()
    useEffect(() => {
        const localstore = JSON.parse(localStorage.getItem('persist:root'))
        let listStore = JSON.parse(localstore.list)
        if (listStore.list != null) {
            dispatch(listing(listStore.list))

        }
        else {
            //
            async function data() {
                try {

                    const respo = await FetchApi();
                    dispatch(listing(respo))
                } catch (error) {

                }
            }
            data()
        }
    }, [])

    const DeleteList = async(item)=>{
        try {
            // console.log(item);
            dispatch(deleteList(item))
        } catch (error) {
            console.log(error);
            
        }
    }

    const list = useSelector((store) => store.list)
    return (
        <section className='w-full flex flex-col gap-2 pt-2'>
             {list.load && <PreLoader></PreLoader>}
            <h1 className='text-2xl font-semibold'>Listing</h1>
            {
               list.list && list.list.map((ele) => {
                    return <ListingCard data={ele} key={nanoid()} deleteFunc={DeleteList}></ListingCard>
                })
            }
        </section>
    )
}

export default React.memo(MyListing)