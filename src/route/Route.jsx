import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from "../component/Navbar"
import Layout from '../component/Layout';
import SignIn from '../component/SignIn'
import CreateAccount from '../component/CreateAccount'
import Home from '../component/Home'
import Logout from '../component/Logout';
import { LazyListing } from '../lazyLoading/LazyLoader';


export default function Route() {
    const router = createBrowserRouter([
        {
          path:'/',
          element:<Layout></Layout>,
          children:[
            {
              path:'/',
              element:<Home></Home>
            },
            {
              path:'/about',
              element:<h1>About</h1>
            },
            {
              path:"/signin",
              element: <SignIn></SignIn>
            },
            {
              path:"/signup",
              element:<CreateAccount></CreateAccount>
            },
            {
              path:'/listing',
              element:<LazyListing></LazyListing>
            },
            {
              path:'/logout',
              element:<Logout></Logout>
            }
          ]
        }
      ])
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}
