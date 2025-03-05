import React from 'react'
import LayoutTemp from '../../components/layout/LayoutTemp'
import UserMenu from './../../components/layout/UserMenu';

const Profile = () => {
  return (
    <LayoutTemp title = {"profile"}>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                    your perofile
                </div>
            </div>
        </div>
    </LayoutTemp>
  )
}

export default Profile