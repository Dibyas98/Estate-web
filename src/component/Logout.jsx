import React from 'react'
import {useDispatch} from 'react-redux'
import { signoutSuccess } from '../redux/userSlice';
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import { LogoutList } from '../redux/listingSlice';

export default function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    dispatch((signoutSuccess()))
    dispatch(LogoutList())
    navigate('/');

  return (
    <></>
  )
}
