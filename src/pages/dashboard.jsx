import { useState } from "react";
import { Link } from "react-router-dom";

// relative imports
import Print from "../components/print";
import History from "../components/history";

const Dashboard = () => {
  const [showHamburger, setShowHamburger] = useState(false);
  const [tab, setTab] = useState(0)

  const toggle_tab = (id) => {
    setTab(id)
  };
  return (
    <main className="bg-[#0D1117] min-h-screen flex flex-col">
      <nav className=" flex relative justify-between w-11/12 mx-auto items-center h-[70px] rounded-[1rem] border-b-2 border-[#30363D]">
        <h3 className="text-white flex flex-row items-center font-[800]">
          <img src="/assets/cu-logo.png" alt="" className='h-16 w-16'/>CUPrint
        </h3>

        {/* <div className=" lg:hidden ">
          {showHamburger ? (
            <img src={Cancel} alt="cancel" onClick={toggle_hamburger} />
          ) : (
            <img src={Hamburger} alt="cancel" onClick={toggle_hamburger} />
          )}
        </div> */}

          <div className="   w-6/12 lg:w-7/12 flex gap-[13px] lg:gap-[1rem] items-center ">

                <p onClick={() => toggle_tab(0)} className={`${tab === 0 ? "text-blue-500 hover:text-blue-500" : "text-white "}  font-[500] text-[17px] hover:text-gray-400 cursor-pointer transition-all duration-300 `}>Print</p>
                <p onClick={() => toggle_tab(1)} className={`${tab === 1 ? "text-blue-500 hover:text-blue-500" : "text-white "}  font-[500] text-[17px] hover:text-gray-400 cursor-pointer transition-all duration-300 `}>History</p>
                <Link to="/login">
                  <p className="text-red-500 lg:ml-auto cursor-pointer">Logout</p>
                </Link>
        </div>
      </nav>
      <section className="flex-1  flex items-center justify-center">
        {
            !tab ? <Print /> : <History />
        }
       
      </section>
    </main>
  );
};

export default Dashboard;
