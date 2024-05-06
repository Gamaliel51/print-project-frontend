import { useEffect, useState } from "react"
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'
import axios from "axios"


const CreditManager = (props) => {

    const matric = props.matric
    const email = props.email
    const credits = props.credits
    const key = process.env.FLUTTERWAVE_KEY

    const [amount, setAmount] = useState('')
    const [domain, setDomain] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const fundWallet = (event) => {
        event.preventDefault()

        if(amount === ''){
            setError('enter amount to fund')
            return
        }

        const config = {
            public_key: key,
            tx_ref: Date.now(),
            amount: amount,
            currency: 'NGN',
            payment_options: 'card,mobilemoney,ussd',
            customer: {
                email: email,
                phone_number: '',
                name: matric,
            },
            customizations: {
                title: 'CU Print',
                description: 'Fund Wallet',
                logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
            },
        };

        return useFlutterwave(config)
    }

    const withdrawFunds = async (event) => {
        event.preventDefault()

        if(amount === ''){
            setError('enter amount to withdraw')
            return
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            }
        }

        const res = await axios.post(`${domain}/withdraw`, {amount: amount}, config)
        if(res.data.status === "success"){
            setSuccess("withdrawal successful")
        }
        if(res.data.status === "fail"){
            setError(res.data.error)
        }

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
        <div className="w-full mt-14 flex flex-col items-center justify-center bg-[#0D1117]">
            <h1 className="text-[30px] text-center text-[#E6EDF3] lg:text-[20px]  ">
                Manage Credits
            </h1>
            <form className=" w-10/12 py-[2rem] mt-[3rem] flex flex-col gap-[1rem] items-center bg-[#161B22] lg:w-[20%] lg:mt-[1rem] rounded-[10px] ">
                <div className=" w-11/12 gap-[7px]  flex flex-col items-center justify-between">
                <label htmlFor="amount" className="text-[#E6EDF3] w-full font-[400] text-[15px] lg:font-[300] lg:text-[13px]">
                    Enter Amount to Fund/Withdraw
                </label>
                <input
                    id="amount"
                    name="amount"
                    type="text"
                    autoComplete="off"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-[25px] w-full py-5 px-4 text-white rounded-[8px] outline-none bg-[#0D1117] border border-[#30363D] lg:text-[15px]"
                />
                </div>
            
                <button
                onClick={(e) => fundWallet(e)({callback: (response) => {
                    console.log(response)
                    closePaymentModal()
                  }, onClose: () => {},})}
                className=" h-[30px] w-11/12 flex justify-center items-center py-5 rounded-[8px] bg-[#2EA043] text-white font-[500] text-[18px] lg:font-[500]  lg:text-[15px] lg:h-[30px] lg:rounded-[5px] "
                >
                Fund Wallet
                </button>
                <button
                onClick={withdrawFunds}
                className=" h-[30px] w-11/12 flex justify-center items-center py-5 rounded-[8px] bg-[#2EA043] text-white font-[500] text-[18px] lg:font-[500]  lg:text-[15px] lg:h-[30px] lg:rounded-[5px] "
                >
                Withdraw
                </button>
                <div>
                    <p className="text-red-500 ">
                        {error}
                    </p>
                </div>
                <div>
                    <p className="text-green-500 ">
                        {success}
                    </p>
                </div>
            </form>
        </div>
    )
}


export default CreditManager