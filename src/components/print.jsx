import React, { useEffect, useState } from 'react'

const Print = () => {
    const [printData, setPrintData] = useState({
        user: "", file: ''
    })
    const [active, setActive] = useState(false)
    const handleChhange = (e) => {
        const {name, value} = e.target
        setPrintData({...printData, [name]: value})

       
      }

      const handleSubmit = (e) => {
        e.preventDefault()
    
        const {user} = printData
    
        if (user.length < 3) return
       
        //   navigate("/dashboard");
          
      };

      useEffect(() => {
        if(printData.user && printData.file){
            setActive(true)
        }
      }, [printData])

  return (
    <div className=' text-white flex flex-col justify-center items-center  w-full '>
            <h2 className='text-[25px] text-center text-[#E6EDF3] lg:text-[20px] lg:mb-[20px] '>Upload Your Credentials</h2>

          <form className=" w-10/12 py-[1rem] mt-[2rem] flex flex-col gap-[10px] lg:gap-[10px] items-center bg-[#161B22] lg:w-[20%] lg:mt-[1rem] rounded-[10px] ">
        <div className=" w-11/12 gap-[7px]  flex flex-col items-center justify-between">
          <label htmlFor="user" className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px] ">
            User ID
          </label>
          <input
            id="user"
            name="user"
            type="text"
            autoComplete="off"
            value={printData.matric}
            onChange={handleChhange}
            className="h-[25px] w-full py-5 px-4 text-white rounded-[8px] outline-none bg-[#0D1117] focus:bg-[#0D1117] border-b-4 border-[#30363D] lg:text-[14px]"
          />
        </div>
        <div className=" w-11/12 gap-[7px]  flex flex-col items-center justify-between">
          <label htmlFor="file" className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px]">
            Upload File
          </label>
          <input
            id="file"
            name="file"
            type="file"
            value={printData.password}
            onChange={handleChhange}
            className="h-[25px] w-full   lg:text-[10px]"
          />
        </div>
       
        <button
        
        onClick={handleSubmit}
          className= {`h-[30px] mt-[2rem] w-11/12 flex py-5 justify-center items-center  rounded-[8px]   font-[700] text-[18px] lg:font-[500]  lg:text-[15px] lg:h-[30px] lg:rounded-[5px] ${active ? "bg-[#2EA043] text-white" : "bg-[#0D1117] text-gray-500" } `}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Print