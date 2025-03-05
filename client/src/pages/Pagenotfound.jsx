import LayoutTemp from '../components/layout/LayoutTemp'
import{Link} from "react-router-dom" 
const Pagenotfound = () => {
  return (
    <LayoutTemp title ={"PageNotFound"}>   
      
      <div className='pnf'>
        <h1 className='pnf-title'>404</h1>
         <h2 className='pnf-heading'>Oops! Page Not Found </h2>
         <Link to="/" className="pnf-bttn">Go Back</Link>
      </div>
       </LayoutTemp>

  )
}

export default Pagenotfound