import LayoutTemp from '../../components/layout/LayoutTemp'
import UserMenu from './../../components/layout/UserMenu';
import  {useAuth}  from '../../context/Auth';
const Dashboard = () => {
  const{auth} = useAuth();
  return (
    <LayoutTemp title ={"Dashboard - Ecommerce App" }>
        <div className="contaianer-fluid m3 p-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu/> 
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3 ">
                <h3>{auth?.user?.name}</h3>
                <h3>{auth?.user?.email}</h3>
                <h3>{auth?.user?.address}</h3>
              </div>
            </div>
          </div>
        </div>
    </LayoutTemp>
  )
}

export default Dashboard