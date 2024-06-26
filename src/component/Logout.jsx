import React from 'react'
import {useDispatch} from 'react-redux'
import { signoutSuccess } from '../redux/userSlice';
import {useNavigate} from 'react-router-dom'

export default function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    dispatch((signoutSuccess()))
    navigate('/');

  return (
    <></>
  )
}
