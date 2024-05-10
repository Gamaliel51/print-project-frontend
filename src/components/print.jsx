import React, { useEffect, useState } from 'react'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Print = (props) => {

  const navigate = useNavigate()

  const matric = props.matric
  const email = props.email
  const credits = props.credits

  const style1 = "h-[30px] mt-[2rem] w-11/12 flex py-5 justify-center items-center  rounded-[8px]   font-[700] text-[18px] lg:font-[500]  lg:text-[15px] lg:h-[30px] lg:rounded-[5px] bg-[#0D1117] text-gray-500"
  const style2 = "h-[30px] mt-[2rem] w-11/12 flex py-5 justify-center items-center  rounded-[8px]   font-[700] text-[18px] lg:font-[500]  lg:text-[15px] lg:h-[30px] lg:rounded-[5px] bg-[#2EA043] text-white"

  const [file, setFile] = useState(null)
  const [active, setActive] = useState(false)
  const [currentLocation, setCurrentLocation] = useState('')
  const [locations, setLocations] = useState([])
  const [domain, setDomain] = useState('')
  const [error, setError] = useState('')

  const [pageNum, setPageNum] = useState(0)
  const [cost, setCost] = useState(pageNum * 50)

  const handleChange = async (event) => {
    const newFile = event.target.files[0]
    setFile(newFile)
  }

  const setFileDetails = async () => {
    if(file === null){
      return
    }
    if(file.type === 'application/pdf'){
      const reader = new FileReader();
      reader.readAsBinaryString(file)
      reader.onloadend = () => {
        const count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
        console.log('Number of Pages:', count);
        setPageNum(count)
        setCost(count * 50)
      }
    }
    if(file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
      const formData = new FormData()
      formData.append('files', file)
      const response = await axios.post(`${domain}/getpagenum`, formData)
      const page = response.data.num
      setPageNum(page)
      setCost(page * 50)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if(cost > credits){
      setError('Insufficient funds')
      return
    }

    const config = {
      headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
      }
    }

    const formData = new FormData()
    formData.append('matric', matric)
    formData.append('location', currentLocation)
    formData.append('files', file)
    const response = await axios.post(`${domain}/printdoc/${currentLocation}`, formData, config)
    if(response.data.status === "success"){
      window.location.reload()
    }
    if(response.data.status === "fail"){
      setError(response.data.error)
      return
    }
  }

  useEffect(() => {
    setFileDetails()
  }, [file])

  useEffect(() => {
    setCurrentLocation[locations[0]]
  }, [locations])

  useEffect(() => {
    const base = window.location.href
    let nohttp = ""
    let bare = ""
    if(base.includes('http')){
      nohttp = base.replace('http://', '')
      bare = nohttp.split('/', 1)[0]
      setDomain(`http://${bare}`)
      console.log("HERE: ",  domain)
    }
    if(base.includes('https')){
      nohttp = base.replace('https://', '')
      bare = nohttp.split('/', 1)[0]
      setDomain(`https://${bare}`)
      console.log("HERE: ",  domain)
    }

    axios.get(`${domain}/getlocations`)
    .then((res) => {
      if(res.data.status === 'success'){
        console.log(res.data)
        setLocations(res.data.data)
      }
    })

  }, [])

  return (
    <div className=' text-white flex flex-col justify-center items-center  w-full '>
          <h2 className='text-[25px] text-center text-[#E6EDF3] lg:text-[20px] lg:mb-[20px] '>Welcome {matric}</h2>

          <form className=" w-10/12 py-[1rem] mt-[2rem] flex flex-col gap-[10px] lg:gap-[10px] items-center bg-[#161B22] lg:w-[20%] lg:mt-[1rem] rounded-[10px] ">
            <div className=" w-11/12 gap-[7px]  flex flex-col items-center justify-between">
              <label htmlFor="file" className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px]">
                Upload File
              </label>
              <input
                id="file"
                name="file"
                type="file"
                onChange={handleChange}
                className="h-[25px] w-full lg:text-[10px]"
              />
            </div>
            <div className=" w-11/12 gap-[7px]  flex flex-col items-center justify-between">
              <label htmlFor="user" className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px] ">
                No of Pages
              </label>
              <input
                id="user"
                name="user"
                type="text"
                autoComplete="off"
                value={pageNum}
                readOnly
                className="h-[25px] w-full py-5 px-4 text-white rounded-[8px] outline-none bg-[#0D1117] focus:bg-[#0D1117] border-b-4 border-[#30363D] lg:text-[14px]"
              />
            </div>
            <div className=" w-11/12 gap-[7px]  flex flex-col items-center justify-between">
              <label htmlFor="user" className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px] ">
                Cost
              </label>
              <input
                id="user"
                name="user"
                type="text"
                autoComplete="off"
                value={cost}
                readOnly
                className="h-[25px] w-full py-5 px-4 text-white rounded-[8px] outline-none bg-[#0D1117] focus:bg-[#0D1117] border-b-4 border-[#30363D] lg:text-[14px]"
              />
            </div>
            <div className=" w-11/12 gap-[7px]  flex flex-col items-center justify-between">
                <label htmlFor="location" className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px]">
                    Location:
                </label>
                <select name="location" id="location" value={currentLocation} onChange={(e) => setCurrentLocation(e.target.value)} className="h-[25px] w-full py-5 px-4 text-white rounded-[8px] outline-none bg-[#0D1117] border border-[#30363D] lg:text-[10px]">
                    {locations.map((location, key) => {
                        return(
                            <option key={key} id={location} value={location} className="h-full w-full text-center">{location}</option>
                        )
                    })}
                </select>
                </div>
            <button
            onClick={handleSubmit}
              className={file === null ? style1 : style2}
            >
              Submit
            </button>
            <div>
              <p className="text-red-500 ">
                {error}
              </p>
            </div>
          </form>
        </div>
  )
}

export default Print