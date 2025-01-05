import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {toast, Toaster} from "react-hot-toast"

function ManagerLoginPage () {
    const [ID, setID] = useState("")
    const [Password, setPassword] = useState("")
    const [responseMessage, setResponseMessage] = useState("")  // State cusub si loo kaydiyo fariinta response-ka
    const [messageType, setMessageType] = useState("")  // State cusub si loo kala saaro guul iyo qalad
    const [IDError, setIDError] = useState(false)  // State cusub si loo muujiyo qalad ID-ga
    const [passwordError, setPasswordError] = useState(false)  // State cusub si loo muujiyo qalad password-ka
    
    const navigate = useNavigate()

    const HandleAdmin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:7000/admin/login",{
            "id": ID,
            "password": Password
        }).then((response) => {
            if (response.data.error) {
                setMessageType("error")  // Set message type to "error"
                setResponseMessage("Incorrect ID or Password")  // Set the error message
                setIDError(true)  // Mark ID as incorrect
                setPasswordError(true)  // Mark password as incorrect
            }
            else if (response.data.empty) {
                setMessageType("error")  // Set message type to "error"
                setResponseMessage("ID and Password are required")  // Set the error message
                setIDError(true)  // Mark ID as empty
                setPasswordError(true)  // Mark password as empty
            }
            else {
                setMessageType("success")  // Set message type to "success"
                setResponseMessage("Login Successfully!! Welcome ")  // Set success message
                setIDError(false)  // Reset ID error
                setPasswordError(false)  // Reset password error
                setTimeout(() => {
                    navigate("/managerDashboard");
                }, 2000);
                localStorage.setItem("admin", JSON.stringify(response.data.admin)); // Store admin in local storage
            }
        }).catch((error) => {
            console.log(error);
            setMessageType("error")  // Set message type to "error"
            setResponseMessage("Error in Login")  // Set error message
        });        
    }

   

    return (
        <div className="w-full h-screen bg-[#BEDDDF] fixed">
            <div className="w-full h-screen flex my-40 sm:my-20 justify-center">
                <div className="bg-white pt-[15px] shadow-lg px-4 w-[350px] h-[370px] rounded-[5px]">
                    <h1 className="text-[30px] text-center font-semibold text-[#0E0E0E]"> Sign in </h1>
                    <p className="text-gray-600 text-center px-[40px] text-[14px] pr-[20px]">Log in with your <span className="font-semibold text-black">Admin ID and password</span> to access the management dashboard.</p>
                    <form className="mt-4">
                        <label className="text-[15px]">Admin ID</label>
                        <input 
                            value={ID} 
                            onChange={(event) => setID(event.target.value)} 
                            className={`w-[310px] px-1 h-[40px] outline-none mb-2 rounded-[5px] border-2 border-[#008081] ${IDError ? 'border-red-500' : ''}`} 
                            type="text" 
                        />
                        <label className="text-[15px]">Admin Password</label>
                        <input 
                            value={Password} 
                            onChange={(event) => setPassword(event.target.value)} 
                            className={`w-[310px] px-1 h-[40px] outline-none rounded-[5px] border-2 border-[#008081] ${passwordError ? 'border-red-500' : ''}`} 
                            type="password" 
                        />
                        <button 
                            onClick={HandleAdmin} 
                            className="w-[310px] h-[35px] mt-7 text-white hover:bg-[#0E0E0E] hover:text-white bg-[#008081] rounded-[5px]"
                        >
                            Submit
                        </button>
                    </form>

                    {/* Halkan ku soo bandhig fariimaha response-ka */}
                    {responseMessage && (
                        <div className="mt-4 text-center">
                            <p className={`font-semibold ${messageType === "success" ? "text-green-500" : "text-red-500"}`}>
                                {responseMessage}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default ManagerLoginPage;
