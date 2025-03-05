import React from 'react'
import LayoutTemp from '../../components/layout/LayoutTemp'
import AdminMenu from './../../components/layout/AdminMenu';

const User = () => {
  return (
    <LayoutTemp title = {"Dashboard-User"}>
      <div className="container-fluid m-3 p-3">
        <h1>All Users</h1>
        <div className="row">
            <div className="col-md-3">
              <AdminMenu/>
            </div>
            <div className="col-md-9">
              <h1>all users</h1>
            </div>
        </div>
</div>
    </LayoutTemp>
  )
}

export default User