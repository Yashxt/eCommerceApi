import React from 'react'
import LayoutTemp from '../../components/layout/LayoutTemp'
import UserMenu from '../../components/layout/UserMenu'
import {useState,useEffect} from 'react';
import { useAuth } from '../../context/Auth';
const Orders = () => {

  return (
    <LayoutTemp title = {"your order"}> 
        <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu/>
          </div>
          <div className="col-md-9">
            <h1>All Orders</h1>
          </div>
        </div>
      </div>
    </LayoutTemp>
  )
}

export default Orders