import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import {toast, Toaster} from "react-hot-toast"
import { ClipLoader  } from "react-spinners"


function LoginPage () {
    const [ID, setID] = useState("")
    const [Password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    // function sameenaayo form validation ka.
    const checkFormValidation = () => {
        if(ID == "" || Password == ""){ // xaqiiji in ID iyo Password ka ay empty yihiin
            setError(true) // Haddii ay empty yihiin State true noogu shub.
            return false  // Sidoo kale function ka waa inu false soo celiyaa
        }
        else {
            setError(false) 
            return true
        }
    }

    const navigate = useNavigate()

    const HandleWorker = (e) => {
        e.preventDefault()

        // Marka hore in laxaqiijiyo in function ka validation uu saxan yahay ina aan API ga lawicin
        if( checkFormValidation() ){ //Haddi uu function kan true soo celiyo markaas API hala run gareeyo

        setLoading(true)

        axios.post("http://localhost:7000/worker/login", {
            "id" : ID,
            "password" : Password
        }).then((response) => {
            if (response.data.error){
                toast.error("Incorrect ID or Password")  // Set the error message  
            }

            else {
                toast.success("Login Successfully!! Welcome ")  // Set success message
                setTimeout(() => {
                    navigate("/workerDashboard")
                }, 2000)
                localStorage.setItem("worker", JSON.stringify(response.data.worker))
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    setLoading(false)
    }

    return (
        <div className="w-full fixed h-screen bg-[#BEDDDF]">
            <div className="w-full h-screen flex my-40 sm:my-[110px] justify-center ">
                <div className="bg-white pt-[15px] mt-14 shadow-lg px-4 items-center w-[350px] h-[360px] rounded-[5px]">
                    <h1 className="text-xl font-semibold pt-6 text-center text-[#008081]">iDan worker login</h1>
                    <form className="mt-4">
                        {error == true ? <p className="text-red-400">All inputs are required</p>: ""}
                        <input 
                            value={ID} 
                            onChange={(event) => setID(event.target.value)} 
                            className={`w-[310px] h-[45px] p-2 focus:border-blue-500 focus:outline-none transition duration-200 mb-6 border-[#008081] rounded-md border`} 
                            type="text" 
                            placeholder="ID" 
                        />
                        <input 
                            value={Password} 
                            onChange={(event) => setPassword(event.target.value)} 
                            className={`w-[310px] p-2 mt-3 focus:border-blue-500 focus:outline-none transition duration-200 h-[45px] outline-none rounded-md border border-[#008081] `} 
                            type="password" 
                            placeholder="Password" 
                        />
                       {
                       loading === true ? <ClipLoader loading={loading} /> :
                       <button 
                            onClick={HandleWorker} 
                            className="w-[310px] h-[45px] mt-5 text-white hover:bg-[#0E0E0E] hover:text-white bg-[#008081] rounded-[5px]"
                        >
                            Submit
                        </button> 
                        }
                        <Link to="/resetPassword">
                            <h2 className="text-right text-sm mt-1 text-slate-500 hover:text-[#0e0e0e] cursor-pointer">Forgot Password?</h2>
                        </Link>
                        <Link to="/adminLogin">
                            <h1 className="text-center mt-3 hover:text-[#008081] cursor-pointer hover:underline">Access Admin Login</h1>
                        </Link>
                    </form>

                    {/* Halkan ku soo bandhig fariimaha response-ka */}
                    
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default LoginPage;
