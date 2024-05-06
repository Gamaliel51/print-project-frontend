import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllBanks } from "./utils"


const ProfileInfo = () => {

    const navigate = useNavigate()
    const banks = getAllBanks()

    const [matric, setMatric] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [account, setAccount] = useState('')
    const [bank, setBank] = useState('')
    const [domain, setDomain] = useState('')

    const [inputState, setInputState] = useState(true)
    const [errorMsg, setErrorMsg] = useState('')

    const matricPattern = /2[0-9]c[abcdefgh]02[0-9][0-9][0-9][0-9]/i

    const changeInputState = (e) => {
        e.preventDefault()
        setInputState(!inputState)
        return
    }

    const logout = () => {
        sessionStorage.removeItem('accessToken')
        navigate('/')
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

        const config = {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            }
        }

        setErrorMsg('')
        axios.post(`${domain}/auth/update`, {username: matric, password: password, email: email, account: account, bank: bank}, config)
        .then((response) => {
            if(response.data.status === "success"){
                logout()
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
              setEmail(res.data.email)
              setAccount(res.data.account)
              setBank(res.data.bank)
            }
            else{
                setErrorMsg(res.data.error)
            }
          })
    }, [])

    return(
        <div className="h-fit w-full flex flex-col items-center justify-center bg-[#0D1117]">
            <form onSubmit={handleSubmit} className="w-2/6 py-[2rem] mt-[3rem] flex flex-col gap-[1rem] items-center bg-[#161B22] rounded-[10px] ">
                <div className="w-full flex flex-row justify-evenly">
                    <div className=" w-2/5 gap-[7px]  flex flex-col items-center justify-between">
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
                            readOnly={inputState}
                            className="h-[25px] w-full py-5 px-4 text-white rounded-[8px] outline-none bg-[#0D1117] focus:bg-[#0D1117] border border-[#30363D] lg:text-[14px]"
                        />
                    </div>
                    <div className=" w-2/5 gap-[7px]  flex flex-col items-center justify-between">
                        <label htmlFor="email" className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px] ">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            readOnly={inputState}
                            className="h-[25px] w-full py-5 px-4 text-white rounded-[8px] outline-none bg-[#0D1117] focus:bg-[#0D1117] border border-[#30363D] lg:text-[14px]"
                        />
                    </div>
                </div>

                <div className="w-full flex flex-row justify-evenly">
                    <div className=" w-2/5 gap-[7px]  flex flex-col items-center justify-between">
                        <label htmlFor="account" className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px] ">
                            Account:
                        </label>
                        <input
                            id="account"
                            name="account"
                            type="text"
                            autoComplete="off"
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                            readOnly={inputState}
                            className="h-[25px] w-full py-5 px-4 text-white rounded-[8px] outline-none bg-[#0D1117] focus:bg-[#0D1117] border border-[#30363D] lg:text-[14px]"
                        />
                    </div>
                    <div className=" w-2/5 gap-[7px]  flex flex-col items-center justify-between">
                        <label htmlFor="bank" className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px] ">
                            Bank
                        </label>
                        <select
                        id="bank"
                        name="bank"
                        value={bank}
                        disabled={inputState}
                        onChange={(e) => setBank(e.target.value)}
                        className="h-[25px] w-full py-5 px-4 text-white rounded-[8px] outline-none bg-[#0D1117] focus:bg-[#0D1117] border border-[#30363D] lg:text-[14px]"
                        >
                            {banks.map((bank2) => {
                                return(
                                    <option id={bank2.id} value={bank2.code} className="h-full w-full text-center" selected={bank === bank2.code}>{bank2.name}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>

                <div className="w-full flex flex-row justify-evenly">
                    <div className=" w-2/5 gap-[7px]  flex flex-col items-center justify-between">
                        <label htmlFor="password" className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px] ">
                            New Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            readOnly={inputState}
                            className="h-[25px] w-full py-5 px-4 text-white rounded-[8px] outline-none bg-[#0D1117] focus:bg-[#0D1117] border border-[#30363D] lg:text-[14px]"
                        />
                    </div>
                    <div className=" w-2/5 gap-[7px]  flex flex-col items-center justify-between">
                        <label htmlFor="pass2" className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px] ">
                            Confirm Password
                        </label>
                        <input
                            id="pass2"
                            name="pass2"
                            type="password"
                            autoComplete="off"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            readOnly={inputState}
                            className="h-[25px] w-full py-5 px-4 text-white rounded-[8px] outline-none bg-[#0D1117] focus:bg-[#0D1117] border border-[#30363D] lg:text-[14px]"
                        />
                    </div>
                </div>
                <div className="w-full mt-12 flex flex-row justify-evenly">
                    <button
                    onClick={(e) => changeInputState(e)}
                    className=" h-[30px] w-2/5 flex justify-center items-center py-5 bg-[#2EA043] text-white font-[500] text-[15px] rounded-[5px] "
                    >
                    {inputState ? `Edit` : `Disable Edit`}
                    </button>
                    <button
                    type="submit"
                    className=" h-[30px] w-2/5 flex justify-center items-center py-5 bg-[#2EA043] text-white font-[500] text-[15px] rounded-[5px] "
                    >
                    Update
                    </button>
                </div>
            </form>
            <div>
                <p className="text-red-500 ">
                {errorMsg}
                </p>
            </div>
        </div>
    )
}


export default ProfileInfo