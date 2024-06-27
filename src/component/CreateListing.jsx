import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import { app } from '../redux/firebase';
import axios from 'axios';
import { ContextProp } from '../context/Context';
import PreLoader from './PreLoader';
import { Trash } from 'lucide-react';
import { apicall } from '../function/apiweb';

export default function CreateListing({setTab}) {
    const { loader, setload,Conterror,setContError  } = useContext(ContextProp)
    const [files, setfiles] = useState([]);
    const [error, setError] = useState(false);
    const [imageload, setimgeload] = useState(false)
    const fileRef = useRef(null)
    const list = {
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    }
    const [ListData, setListData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    })

    useEffect(() => {
        setload(false)
    }, [])


    const handelImageUpload = () => {
        setimgeload(true)
        if (files.length > 0 && files.length < 7) {
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setListData({ ...ListData, imageUrls: ListData.imageUrls.concat(urls) })
            })
        }

    }
    const handelForm = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setListData({
                ...ListData,
                type: e.target.id
            });
        }

        if (
            e.target.id === 'parking' ||
            e.target.id === 'furnished' ||
            e.target.id === 'offer'
        ) {
            setListData({
                ...ListData,
                [e.target.id]: e.target.checked,
            });
        }

        if (
            e.target.type === 'number' ||
            e.target.type === 'text' ||
            e.target.type === 'textarea'
        ) {
            setListData({
                ...ListData,
                [e.target.id]: e.target.value,
            });
        }

    };
    const handelCreate = async () => {
        setload(true)
        try {
            if (ListData.imageUrls.length < 1) {
                setload(false)
                return setError('You must upload at least one image')
            }
            const tok =JSON.parse(localStorage.getItem('persist:root'))
            console.log(JSON.parse(tok.user).currentUser.token);

            const res = await axios.post(`${apicall}api/listing/create`, ListData,
                {
                    
                    headers:{
                        access_token:JSON.parse(tok.user).currentUser.token
                    }
                }
            )
            console.log(res.data)
            setError(null)
            setload(false)
            setListData(list)
            setTab()

        } catch (error) {
            setContError(error.response.data.message)
            setload(false)
        }

    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageref = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageref, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(progress);
                    if (progress > 99) {
                        setimgeload(false)
                        fileRef.current.value = ''
                    }
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((doenloadUrl) => {
                        resolve(doenloadUrl);
                    })
                }
            )
        })
    }

    const handelImageDelete = useCallback((img) => {
        setListData({ ...ListData, imageUrls: ListData.imageUrls.filter((ele) => ele != img) })
    }, [])

    return (
        <>
            {loader && <PreLoader></PreLoader>}
            <div className='w-full flex flex-col items-center py-8 gap-5'>
                <h1 className='text-2xl font-semibold'>Create Listing</h1>
                {Conterror && <h1 className='font-semibold text-xl text-red-500'>{Conterror}</h1>}

                <div className='w-full flex flex-col items-center  px-5 xl:flex-row xl:justify-center xl:items-start xl:gap-10'>

                    <div className='w-full flex flex-col gap-3 xl:w-2/6 py-3 md:w-2/5' >
                        <input type="text" placeholder='Name' id='name' className='p-2 rounded-md' onChange={handelForm} value={ListData.name} />
                        <input type="text" placeholder='Description' className='p-2 rounded-md' id='description' onChange={handelForm} value={ListData.description} />
                        <input type="text" placeholder='Address' className='p-2 rounded-md' id='address' onChange={handelForm} value={ListData.address} />

                        <div className='flex gap-5 w-full flex-wrap px-2'>
                            <div className='flex items-center gap-1'>
                                <input type="checkbox" id="sale" className='h-5 w-5 ' onChange={handelForm} checked={ListData.type === 'sale'} />
                                <span>Sell</span>
                            </div>
                            <div className='flex items-center gap-1'>
                                <input type="checkbox" id="rent" className='h-5 w-5' onChange={handelForm} checked={ListData.type === 'rent'} />
                                <span>Rent</span>
                            </div>
                            <div className='flex items-center gap-1'>
                                <input type="checkbox" id="parking" className='h-5 w-5' onChange={handelForm} checked={ListData.parking} />
                                <span>Parking Spot</span>
                            </div>
                            <div className='flex items-center gap-1'>
                                <input type="checkbox" id="furnished" className='h-5 w-5' onChange={handelForm} checked={ListData.furnished} />
                                <span>Furnished</span>
                            </div>
                            <div className='flex items-center gap-1'>
                                <input type="checkbox" id="offer" className='h-5 w-5' onChange={handelForm} checked={ListData.offer} />
                                <span>Offer</span>
                            </div>
                        </div>
                        <div className='flex flex-wrap  gap-5 w-full'>
                            <div className='flex gap-3'>
                                <input type="number" id="bedrooms" min={1} max={4} onChange={handelForm} value={ListData.bedrooms} />
                                <span>Beds</span>
                            </div>
                            <div className='flex gap-3'>
                                <input type="number" id="bathrooms" min={1} max={4} onChange={handelForm} value={ListData.bathrooms} />
                                <span>Baths</span>
                            </div>
                            <div className='flex gap-3'>
                                <input type="number" id="regularPrice" min={1000} max={1000000} onChange={handelForm} value={ListData.regularPrice} />
                                <span>Regular Price</span>
                            </div>
                            <div className='flex gap-3'>
                                <input type="number" id="discountPrice" min={1} max={ListData.regularPrice - 1} onChange={handelForm} value={ListData.discountPrice} />
                                <span>Discounted Price</span>
                            </div>
                        </div>

                    </div>
                    <div className='flex flex-col gap-3 xl:py-10 px-5'>
                        <i className='font-semibold text-lg'> Images:- <span>max 6</span></i>

                        <div className='flex'>
                            <input type="file" ref={fileRef} name="" id="images" accept='image/*' multiple onChange={(e) => setfiles(e.target.files)} />
                            <button className='button-3' onClick={handelImageUpload} disabled={imageload}>{imageload ? 'uploading' : 'Upload'}</button>
                        </div>
                        <div className='flex flex-col gap-2'>
                            {
                                ListData.imageUrls.length > 0 && ListData.imageUrls.map((ele,id)=> <div key={id} className='w-full h-14 flex justify-between items-center'>
                                <img src={ele} className='w-2/5 h-full' alt="" />
                                <Trash onClick={()=>handelImageDelete(ele)} ></Trash>
                            </div>)
                            }
                        </div>
                    </div>

                </div>
                {error && <p className='text-red-700 text-sm'>{error}</p>}
                <button className='button-1' onClick={handelCreate}>Create Listing</button>
            </div>
        </>
    )
}
