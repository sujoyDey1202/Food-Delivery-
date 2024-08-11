import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import {StoreContext} from '../../context/StoreContext.jsx' 
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {
    const {url, setToken} = useContext(StoreContext); 

    const [currState, setCurrState] = useState("sign up");
    const [data, setData] = useState({
        name : "",
        email : "",
        password : ""
    });
    const onChangeHandler= (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setData((data)=>({...data,[name]:value}))
      }
      const onLogin = async(event)=>{
        event.preventDefault();
        let newUrl = url+"/api/user";
        if(currState==="Login"){
            newUrl+="/login";
        }
        else {
            newUrl+="/register";
        }
        const responce = await axios.post(newUrl,data);
        if(responce.data.success){
            setToken(responce.data.token);
            localStorage.setItem("token", responce.data.token);
            setShowLogin(false);
        }
        else{
            alert(responce.data.massage);
        }
      }
  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></> :<input onChange={onChangeHandler} name='name' value={data.name} type="text" placeholder='your name' required />}
                <input onChange={onChangeHandler} name="email" value={data.email} type="email" placeholder='your email' required />
                <input onChange={onChangeHandler} name="password" value={data.password} type="password" placeholder='password' required />
            </div>
            <button type="submit" >{currState==='sign up'?"Create account" : "Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, i agree to the terms of use and private policy</p>
            </div>
            {currState==="Login"
             ?<p>Create a new account? <span onClick={()=>setCurrState("sign in")} >click here</span></p>
             :<p>Already have an account? <span onClick={()=>setCurrState("Login")} >Login here</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopup