import { useState } from "react"
import { useNavigate } from "react-router-dom"




const LoginPage = () => {
    const navigate = useNavigate()

  const [matric, setMatric] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if(matric == ""){
      if(password === "123"){
        navigate('/dashboard')
      }
    }
  }

  return (
    <div className='min-h-screen w-full flex flex-col justify-center relative bg-[#56A3A6]'>
      <form className='h-[70vh] w-4/12 mx-auto flex flex-col rounded-2xl bg-[#26547C]'>
        <h1 className='h-fit w-full text-3xl text-center flex flex-row items-center justify-center font-semibold italic mt-8 text-[#D7FFAB]'>
          <img src="src/assets/cu-logo.png" alt="" className='h-16 w-16'/>CUPrint
        </h1>
        <div className='h-fit w-4/5 mx-auto mt-10 flex flex-row items-center justify-between'>
          <label htmlFor="matric" className='text-[#D7FFAB]'>Matric No:</label>
          <input name='matric' type="text" placeholder='Enter Matric No.' className='h-8 w-4/5 py-5 px-4 rounded-lg bg-white'/>
        </div>
        <div className='h-fit w-4/5 mx-auto mt-14 flex flex-row items-center justify-between'>
          <label htmlFor="pass" className='text-[#D7FFAB]'>Password:</label>
          <input name='pass' type="password" placeholder='Enter Password' className='h-8 w-4/5 py-5 px-4 rounded-lg bg-white'/>
        </div>
        <button type='submit' className='h-14 w-3/5 mx-auto mt-20 rounded-lg bg-[#56A3A6] hover:bg-[#458184]'>Login</button>
        <p className='text-center mt-4 cursor-pointer text-[#D7FFAB] hover:underline'>or SignUp</p>
      </form>
    </div>
  )
}

export default LoginPage