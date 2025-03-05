import {useState,useEffect} from 'react';
import {useAuth} from "../../context/Auth";
import {Outlet} from "react-router-dom"
import Spinner from './../Spinner';
export default function AdminRoute (){
    const [ok,setOk] = useState(false);
    const {auth,setAuth} = useAuth(); 
    
    useEffect(()=>{  
         console.log(`Bearer ${auth?.token}`);
          const authCheck = async()=>{ 
             const res = await fetch('http://localhost:9090/api/v1/auth/admin-auth', {
                method: 'GET',
                headers: {
                   "Authorization": `Bearer ${auth?.token}`
                }
            });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
            const data  = await res.json();
            console.log(data.ok);
            if (data.ok){
                setOk(true)
            }
            else{
                setOk(false)
            }
           
          
    } 
    if(auth?.token) {authCheck();}
    },[auth?.token])
    
    return ok ? <Outlet/>: <Spinner path = ""/>
}