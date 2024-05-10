import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// relative imports
import Print from "../components/print";
import History from "../components/history";
import { checkAuth } from "../components/utils";
import axios from "axios";
import ProfilePage from "./ProfilePage";

const Dashboard = () => {
  const navigate = useNavigate()
  const [tab, setTab] = useState(0)
  const [matric, setMatric] = useState('')
  const [credits, setCredits] = useState(0)
  const [email, setEmail] = useState('')
  const [history, setHistory] = useState([])

  const [domain, setDomain] = useState('')
  

  const toggle_tab = (id) => {
    setTab(id)
  };

  const logout = () => {
    sessionStorage.removeItem('accessToken')
    navigate('/')
  }

  useEffect(() => {
    if(!checkAuth()){
      navigate('/login')
    }
    else{

      const base = window.location.href
      let nohttp = ""
      let bare = ""
      if(base.includes('http')){
        nohttp = base.replace('http://', '')
        bare = nohttp.split('/', 1)[0]
        setDomain(`http://${bare}`)
      }
      if(base.includes('https')){
        nohttp = base.replace('https://', '')
        bare = nohttp.split('/', 1)[0]
        setDomain(`https://${bare}`)
      }

      const config = {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
        }
      }
      axios.get(`${domain}/studentinfo`, config)
      .then((res) => {
        console.log(res.data)
        if(res.data.status === "success"){
          setMatric(res.data.matric)
          setCredits(res.data.credits)
          setEmail(res.data.email)
          setHistory(res.data.history)
        }
      })

    }
  }, [])

  return (
    <main className="bg-[#0D1117] min-h-screen flex flex-col">
      <nav className=" flex relative justify-between w-11/12 mx-auto items-center h-[70px] rounded-[1rem] border-b-2 border-[#30363D]">
        <h3 className="text-white flex flex-row items-center font-[800]">
          <img src="/assets/cu-logo.png" alt="" className='h-16 w-16'/>CUPrint
        </h3>

          <div className="   w-6/12 lg:w-7/12 flex flex-row gap-[13px] lg:gap-[1rem] justify-end lg:pr-20">
            <p className={`font-[500] text-[17px] text-white lg:mr-[50%] hover:text-gray-400`}>{credits} Credits</p>
            <p onClick={() => toggle_tab(0)} className={`${tab === 0 ? "text-blue-500 hover:text-blue-500" : "text-white "}  font-[500] text-[17px] hover:text-gray-400 cursor-pointer transition-all duration-300 `}>Print</p>
            <p onClick={() => toggle_tab(1)} className={`${tab === 1 ? "text-blue-500 hover:text-blue-500" : "text-white "}  font-[500] text-[17px] hover:text-gray-400 cursor-pointer transition-all duration-300 `}>Profile</p>
            <div onClick={logout}>
              <p className="text-red-500 lg:ml-auto cursor-pointer">Logout</p>
            </div>
        </div>
      </nav>
      <section className="flex-1 flex items-center justify-center">
        {
            !tab ? <Print matric={matric} email={email} credits={credits} /> : <ProfilePage matric={matric} email={email} credits={credits} history={history}/>
        }
       
      </section>
    </main>
  );
};

export default Dashboard;
