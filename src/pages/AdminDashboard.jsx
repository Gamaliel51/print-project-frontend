import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";


const AdminDashboard = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '', password: '', location: ''
  });
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [domain, setDomain] = useState('')
  const [success, setSuccess] = useState('')
  const [locations, setLocations]= useState([])


  const handleChhange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
    setErrorMsg('')
  }

  const handleCreate = (e) => {
    e.preventDefault()

    const {username,password,location} = formData

    if(username === ''){
      setErrorMsg('Invalid Username')
      return
    }
    if(password === ''){
        setErrorMsg('Invalid Password')
        return
    }
    if(location === ''){
        setErrorMsg('Invalid Location')
        return
    } 

    axios.post(`${domain}/addprintlogin`, {username: username, password: password, location: location})
      .then((res) => {
        console.log("HERE", res.data)
          if(res.data.status === 'success'){
            setErrorMsg('')
              setSuccess('New location added')
              navigate('/admindashboard')
          }
          else{
              if(res.data.status === 'fail'){
                  setLoading(false)
                  setErrorMsg(res.data.error)
                  setSuccess('')
              }
              else{
                  setLoading(false)
                  setErrorMsg('Network Error. Please try again')
                  setSuccess('')
              }
          }
      })
      
  };

  const handleEdit = (e) => {
    e.preventDefault()

    const {username,password,location} = formData

    if(username === ''){
      setErrorMsg('Invalid Username')
      return
    }
    if(password === ''){
        setErrorMsg('Invalid Password')
        return
    }
    if(location === ''){
        setErrorMsg('Invalid Location')
        return
    } 

    axios.post(`${domain}/editprintlogin`, {username: username, password: password, location: location})
      .then((res) => {
        console.log("HERE", res.data)
          if(res.data.status === 'success'){
            setErrorMsg('')
              setSuccess('Location edit successful')
              navigate('/admindashboard')
          }
          else{
              if(res.data.status === 'fail'){
                  setLoading(false)
                  setErrorMsg(res.data.error)
                  setSuccess('')
              }
              else{
                  setLoading(false)
                  setErrorMsg('Network Error. Please try again')
                  setSuccess('')
              }
          }
      })
      
  };

  const handleDelete = (e) => {
    e.preventDefault()

    const {username,password,location} = formData

    if(username === ''){
      setErrorMsg('Invalid Username')
      return
    }


    axios.post(`${domain}/deleteprintlogin`, {username: username})
      .then((res) => {
        console.log("HERE", res.data)
          if(res.data.status === 'success'){
              setSuccess('Deleted location successfully')
              setErrorMsg('')
              navigate('/admindashboard')
          }
          else{
              if(res.data.status === 'fail'){
                  setLoading(false)
                  setErrorMsg(res.data.error)
                  setSuccess('')
              }
              else{
                  setLoading(false)
                  setErrorMsg('Network Error. Please try again')
                  setSuccess('')
              }
          }
      })
      
  };

  useEffect(() => {
    if(!sessionStorage.getItem('adminToken')){
      navigate('/adminlogin')
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

    axios.get(`${domain}/getalllocationsdetails`)
    .then((res) => {
        console.log(res.data)
        if(res.data.status === 'success'){
            setLocations(res.data.data)
        }
    })

  }, [])

 
  return (
    <div className="min-h-screen w-full flex flex-row items-start pt-24 bg-[#0D1117]">
        <div className="w-1/2 flex flex-col items-center justify-center bg-[#0D1117]">
            <form className=" w-5/12 py-[2rem] mt-[3rem] flex flex-col gap-[1rem] items-center bg-[#161B22] rounded-[10px] ">
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
                <label htmlFor="location" className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px]">
                    Location
                </label>
                <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChhange}
                    className="h-[25px] w-full py-5 px-4 text-white rounded-[8px] outline-none bg-[#0D1117] border border-[#30363D] lg:text-[10px]"
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
                onClick={handleCreate}
                className=" h-[30px] w-11/12 flex justify-center items-center py-5 rounded-[8px] bg-[#2EA043] text-white font-[500] text-[18px] lg:font-[500]  lg:text-[15px] lg:h-[30px] lg:rounded-[5px] "
                >
                Add Print Location
                </button>
                <button
                onClick={handleEdit}
                className=" h-[30px] w-11/12 flex justify-center items-center py-5 rounded-[8px] bg-[#2EA043] text-white font-[500] text-[18px] lg:font-[500]  lg:text-[15px] lg:h-[30px] lg:rounded-[5px] "
                >
                Edit Print Location
                </button>
                <button
                onClick={handleDelete}
                className=" h-[30px] w-11/12 flex justify-center items-center py-5 rounded-[8px] bg-[#2EA043] text-white font-[500] text-[18px] lg:font-[500]  lg:text-[15px] lg:h-[30px] lg:rounded-[5px] "
                >
                Delete Print Location
                </button>
            </form>
            <div>
                <p className="text-red-500 ">
                {errorMsg}
                </p>
            </div>
            <div>
                <p className="text-green-500 ">
                    {success}
                </p>
            </div>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center bg-[#0D1117]">
            <div className=" w-5/12 py-[2rem] mt-[3rem] flex flex-col gap-[1rem] items-center bg-[#161B22] rounded-[10px] ">
                {
                    locations.map((location) => {
                        return(
                            <div key={location.id} className=" w-11/12 gap-[7px]  flex flex-row items-center justify-between">
                                <p className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px] ">
                                    {location.username}
                                </p>
                                <p  className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px] ">
                                    {location.location}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  );
};

export default AdminDashboard;
