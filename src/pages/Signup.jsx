import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"



const SignupPage = () => {

    const navigate = useNavigate()

    const [matric, setMatric] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [email, setEmail] = useState('')

    const [domain, setDomain] = useState('')

    const [errorMsg, setErrorMsg] = useState('')
    const matricPattern = /2[0-9]c[abcdefgh]02[0-9][0-9][0-9][0-9]/i

    const loginnav = () => {
        navigate('/login')
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if(password !== password2){
            setErrorMsg("Passwords do not match")
            return
        }
        if(!email.includes('@stu.cu.edu.ng')){
            setErrorMsg("Email is not CU student email")
            return
        }
        if(!matricPattern.test(matric)){
            setErrorMsg("Matric Invalid")
            return
        }

        setErrorMsg('')
        axios.post(`http://localhost:8000/auth/signup`, {username: matric, password: password, email: email})
        .then((response) => {
            if(response.data.status === "success"){
                navigate('/login')
                return
            }
            if(response.data.status === "fail"){
                setErrorMsg(response.data.error)
                return
            }
        })

    }

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
    }, [])

    return(
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0D1117]">
            <h1 className="text-[30px] text-center text-[#E6EDF3] lg:text-[20px]  ">
                <img src="/assets/cu-logo.png" alt="" className='h-16 w-16'/>Sign Up
            </h1>
            <form className=" w-10/12 py-[2rem] mt-[3rem] flex flex-col gap-[1rem] items-center bg-[#161B22] lg:w-[25%] lg:mt-[1rem] rounded-[10px] ">
                <div className=" w-11/12 gap-[7px]  flex flex-col items-center justify-between">
                <label htmlFor="matric" className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px] ">
                    Matric No
                </label>
                <input
                    id="matric"
                    name="matric"
                    type="text"
                    autoComplete="off"
                    value={matric}
                    onChange={(e) => setMatric(e.target.value)}
                    className="h-[25px] w-full py-5 px-4 text-white rounded-[8px] outline-none bg-[#0D1117] focus:bg-[#0D1117] border border-[#30363D] lg:text-[14px]"
                />
                </div>
                <div className=" w-11/12 gap-[7px]  flex flex-col items-center justify-between">
                <label htmlFor="matric" className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px] ">
                    Email
                </label>
                <input
                    id="matric"
                    name="matric"
                    type="text"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-[25px] w-full py-5 px-4 text-white rounded-[8px] outline-none bg-[#0D1117] border border-[#30363D] lg:text-[10px]"
                />
                </div>
                <div className=" w-11/12 gap-[7px]  flex flex-col items-center justify-between">
                <label htmlFor="password" className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px]">
                    Confirm Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    className="h-[25px] w-full py-5 px-4 text-white rounded-[8px] outline-none bg-[#0D1117] border border-[#30363D] lg:text-[10px]"
                />
                </div>
            
                <button
                onClick={handleSubmit}
                className=" h-[30px] w-11/12 flex justify-center items-center py-5 rounded-[8px] bg-[#2EA043] text-white font-[500] text-[18px] lg:font-[500]  lg:text-[15px] lg:h-[30px] lg:rounded-[5px] "
                >
                Sign Up
                </button>
                <p onClick={loginnav} className="text-center mt-4 cursor-pointer text-[#E6EDF3] hover:underline lg:text-[12px]">
                    <span className="text-[#2F81E9] font-bold">Back to login</span>
                </p>
            </form>
            <div>
                <p className="text-red-500 ">
                {errorMsg}
                </p>
            </div>
        </div>
    )
}


export default SignupPage