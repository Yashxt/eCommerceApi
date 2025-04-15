import React from 'react'
import {useNavigate} from "react-router-dom"
const Success = () => {
  const navigate = useNavigate();
  return (
    <div>payment success
       {navigate("/cart")}
    </div>
  )
}

export default Success