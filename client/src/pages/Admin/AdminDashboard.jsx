import LayoutTemp from '../../components/layout/LayoutTemp'
import AdminMenu from './../../components/layout/AdminMenu';
import { useAuth } from '../../context/Auth';
const AdminDashboard = () => {
   const {auth} = useAuth();
  return (
   
    <LayoutTemp>  
       <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3"><AdminMenu/></div>
        <div className="col-md-9">
           <div className="card w-75 p-3">
          
            <h3>Admin Name : {auth?.user?.name} </h3>
            <h3>Admin Email : {auth?.user?.email} </h3>
            <h3>Admin contact  : {auth?.user?.phone} </h3>
          </div>
          </div>
      </div>

       </div>

    </LayoutTemp>
  )
}

export default AdminDashboard