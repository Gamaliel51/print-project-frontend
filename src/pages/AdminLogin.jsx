import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";


const AdminLoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '', password: ''
  });
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [domain, setDomain] = useState('')


  const handleChhange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
    setErrorMsg('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const {username,password} = formData

    if(username === ''){
      setErrorMsg('Invalid Username')
      return
    } 

    axios.post(`${domain}/adminlogin`, {username: username, password: password})
      .then((res) => {
        console.log("HERE", res.data)
          if(res.data.status === 'success'){
              setLoading(false)
              sessionStorage.setItem('adminToken', "adminloggedin")
              setErrorMsg('')
              navigate('/admindashboard')
          }
          else{
              if(res.data.status === 'fail'){
                  setLoading(false)
                  setErrorMsg(res.data.error)
              }
              else{
                  setLoading(false)
                  setErrorMsg('Network Error. Please try again')
              }
          }
      })
      
  };

  useEffect(() => {
    if(sessionStorage.getItem('adminToken')){
      navigate('/admindashboard')
    }

    const base = window.location.href
    let nohttp = ""
    let bare = ""
    if(base.includes('http')){
      nohttp = base.replace('http://', '')
      bare = nohttp.split('/', 1)[0]
      setDomain(`http://localhost:8000`)
      console.log("HERE: ",  domain)
    }
    if(base.includes('https')){
      nohttp = base.replace('https://', '')
      bare = nohttp.split('/', 1)[0]
      setDomain(`https://localhost:8000`)
      console.log("HERE: ",  domain)
    }

  }, [])


  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0D1117]">
      <h1 className="text-[30px] text-center text-[#E6EDF3] lg:text-[20px]  ">
        <img src="/assets/cu-logo.png" alt="" className='h-16 w-16'/>Admin
      </h1>
      <form className=" w-10/12 py-[2rem] mt-[3rem] flex flex-col gap-[1rem] items-center bg-[#161B22] lg:w-[20%] lg:mt-[1rem] rounded-[10px] ">
        <div className=" w-11/12 gap-[7px]  flex flex-col items-center justify-between">
          <label htmlFor="username" className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px] ">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            value={formData.username}
            onChange={handleChhange}
            className="h-[25px] w-full py-5 px-4 text-white rounded-[8px] outline-none bg-[#0D1117] focus:bg-[#0D1117] border border-[#30363D] lg:text-[14px]"
          />
        </div>
        <div className=" w-11/12 gap-[7px]  flex flex-col items-center justify-between">
          <label htmlFor="password" className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px]">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChhange}
            className="h-[25px] w-full py-5 px-4 text-white rounded-[8px] outline-none bg-[#0D1117] border border-[#30363D] lg:text-[10px]"
          />
        </div>
       
        <button
        onClick={handleSubmit}
          className=" h-[30px] w-11/12 flex justify-center items-center py-5 rounded-[8px] bg-[#2EA043] text-white font-[500] text-[18px] lg:font-[500]  lg:text-[15px] lg:h-[30px] lg:rounded-[5px] "
        >
          Login
        </button>
      </form>
      <div>
        <p className="text-red-500 ">
          {errorMsg}
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
