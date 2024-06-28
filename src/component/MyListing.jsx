import React, { useEffect, useState } from 'react'
import { Eye, Trash2 } from 'lucide-react';
import axios from 'axios';
import { apicall } from '../function/apiweb';




const Text = ({ title, style }) => {
    return (
        <p className={`${style}`}>{title}</p>
    )
}

const Button = ({ title, icon: Icon }) => {
    return (
        <button className='flex items-center gap-2 justify-between border rounded-sm px-1 font-semibold bg-[#3d9ee340] text-[#000000db]'>
            {title}
            {Icon && <Icon />}
        </button>
    )
}

const ListingCard = ({data}) => {
    return (
        <section className='w-full h-28   py-2'>
            <div className='w-full h-full flex gap-5 items-center justify-center'>
                <div className='w-1/5 border-2 h-full flex gap-2 flex-wrap overflow-y-scroll no-scrollbar justify-center py-1 rounded-sm'>
                    {
                        data.imageUrls.map((ele)=>{
                            return <div className='w-24 h-10'>
                                    <img src={ele} className='w-full h-full'/>
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
                    <Button title={'Delete'} icon={Trash2}></Button>
                </div>
            </div>
        </section>
    )
}


function MyListing() {
    const [list, setList] = useState([])
    useEffect(() => {
        const FetchApi = async () => {
            try {
                const tok = JSON.parse(localStorage.getItem('persist:root'))
                const response = await axios.get(`${apicall}api/listing`,
                    {

                        headers: {
                            access_token: JSON.parse(tok.user).currentUser.token
                        }
                    }
                )
                setList(response.data.list);
            } catch (error) {
                console.log(error);
            }
        }
        FetchApi();
    }, [])
    return (
        <section className='w-full flex flex-col gap-2 pt-2'>
            <h1 className='text-2xl font-semibold'>Listing</h1>
            {
                list.map((ele)=>{
                    return <ListingCard data={ele}></ListingCard>
                })
            }
        </section>
    )
}

export default React.memo(MyListing)