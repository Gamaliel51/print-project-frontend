import { useState } from "react"
import CreditManager from "../components/CreditManager"
import ProfileInfo from "../components/ProfileInfo"
import History from "../components/history"



const ProfilePage = (props) => {

    const matric = props.matric
    const email = props.email
    const credits = props.credits
    const history = props.history

    const style1 = "h-fit w-2/5 cursor-pointer hover:bg-gray-700 text-white bg-[#151b24]"
    const style2 = "h-fit w-2/5 cursor-pointer hover:bg-gray-700 text-white bg-gray-700"

    const [current, setCurrent] = useState(0)

    const renderCurrent = (num) => {
        if(num === 0){
            return <ProfileInfo/>
        }
        else if(num === 1){
            return <CreditManager  matric={matric} email={email} credits={credits}/>
        }
        else if(num === 2){
            return <History matric={matric} history={history}/>
        }
    }

    return(
        <main className="bg-[#0D1117] min-h-screen w-full mt-10 flex flex-col">
            <section className="w-full flex flex-col items-center">
                <div className="h-fit w-8/12 flex flex-row items-end border-b-2 border-solid border-white bg-red-500">
                    <div onClick={() => setCurrent(0)} className={current === 0 ? style2 : style1}>
                        Profile Info
                    </div>
                    <div onClick={() => setCurrent(1)} className={current === 1 ? style2 : style1}>
                        Fund/Withdraw Credits
                    </div>
                    <div onClick={() => setCurrent(2)} className={current === 2 ? style2 : style1}>
                        History
                    </div>
                </div>
                <div className="w-full">
                    {renderCurrent(current)}
                </div>
            </section>
        </main>
    )
}

export default ProfilePage