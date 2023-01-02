import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './../Navbar/Navbar';

export default function Main({currentUser , removeUserData}) {



  return <>



    <Navbar currentUser={currentUser} removeUserData={removeUserData}/>
    <Outlet />

  
  
  
  
  
  </>
  
}
