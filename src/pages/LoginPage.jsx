import { useState } from "react";
import {  useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    matric: '', password: ''
  });
  const [errorMsg, setErrorMsg] = useState('')

  const handleChhange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
    setErrorMsg('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const {matric,password} = formData

    if (matric.length < 3){
      setErrorMsg('Matric number must be longer than 3 characters')
      return
    } 
    if(password.length < 6){
      setErrorMsg('Passowrd too short')
      return
    }
      navigate("/dashboard");
      
  };


  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0D1117]">
      <h1 className="text-[30px] text-center text-[#E6EDF3] lg:text-[20px]  ">
        <img src="/assets/cu-logo.png" alt="" className='h-16 w-16'/>CUPrint
      </h1>
      <form className=" w-10/12 py-[2rem] mt-[3rem] flex flex-col gap-[1rem] items-center bg-[#161B22] lg:w-[20%] lg:mt-[1rem] rounded-[10px] ">
        <div className=" w-11/12 gap-[7px]  flex flex-col items-center justify-between">
          <label htmlFor="matric" className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px] ">
            Matric No
          </label>
          <input
            id="matric"
            name="matric"
            type="text"
            autoComplete="off"
            value={formData.matric}
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
        <p className="text-center mt-4 cursor-pointer text-[#E6EDF3] hover:underline lg:text-[12px]">
          Dont have an account ? <span className="text-[#2F81E9] font-bold">sign uo</span>
        </p>
      </form>
      <div>
        <p className="text-red-500 ">
          {errorMsg}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
