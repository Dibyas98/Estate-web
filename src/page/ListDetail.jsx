import React, { useEffect, useState } from 'react'
import ListView from '../component/ListView'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { apicall } from '../function/apiweb'
import LocalStorage from '../function/LocalStorage'
import PreLoader from '../component/PreLoader'

function ListDetail() {
    const param =useParams()
    const[detail,setDetail]= useState(null);
    useEffect(()=>{
        async function FetchList(){
            try {
                const res = await axios.get(`${apicall}api/listing/${param.listId}`,{
                    headers:{
                        access_token:LocalStorage()
                    }
                })
                console.log(res.data.list);
                setDetail(res.data.list)
            } catch (error) {
                
            }
        }
        FetchList()
    },[])
  return (
    <>
    {
        
        detail==null?<PreLoader></PreLoader>:<ListView data={detail}></ListView>
    }
    </>
  )
}

export default ListDetail