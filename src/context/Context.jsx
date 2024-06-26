import React, { createContext, useState } from 'react'
import axios from 'axios'


export const ContextProp = createContext();
export default function Context({ children }) {

  const [SideBar,setSideBar] = useState(false);
  const [loader,setload]= useState(true)
  
  function handelSideBar(){
    setSideBar(!SideBar)
  }

  async function handleFormData(arg) {
    try {
      await axios.post('http://localhost:4000/api/user/signup', arg);
    } catch (error) {

    }
  }

  return (
    <ContextProp.Provider value={{ handleFormData,handelSideBar,SideBar,loader,setload }}>
      {children}
    </ContextProp.Provider>
  )
}
