import React from 'react'
import { NavLink } from 'react-router-dom'
const UserMenu = () => {
  return (
    <>
    <div className="text-center">
<div className="list-group">
 <h4>Admin Panel</h4>
 <NavLink to = "/dashboard/user/profile" className="list-group-item list-group-item-action">profile</NavLink>
 <NavLink to = "/dashboard/user/orders" className="list-group-item list-group-item-action">orders</NavLink>
</div>
</div>
</>
  )
}

export default UserMenu