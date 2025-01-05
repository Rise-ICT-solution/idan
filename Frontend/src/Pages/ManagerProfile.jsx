import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiShutDownLine } from "react-icons/ri";

function ManagerProfile() {
  const navigate = useNavigate();
  const [manager, setManager] = useState(null);

  // Load manager data from localStorage
  useEffect(() => {
    const managerData = JSON.parse(localStorage.getItem("admin"));
    if (!managerData) {
      navigate("/managerLogin"); // Redirect to login page if manager is not logged in
    } else {
      setManager(managerData);
    }
  }, [navigate]);

  const LogOut = () => {
    localStorage.clear();
    navigate("/managerLogin"); // Redirect to login page after logout
  };

  return (
    <div className="w-full h-screen bg-[#F0F4F8] flex justify-center items-center">
      <div className="bg-white shadow-lg px-6 py-8 w-[360px] h-[420px] rounded-lg flex flex-col items-center transition-transform duration-300 transform hover:scale-105">
        {manager && (
          <>
            {/* Profile picture and background circle */}
            <div className="w-[70px] h-[70px] rounded-full bg-[#008081] flex justify-center items-center mb-4">
              <FaUser className="text-white text-[35px]" />
            </div>
            {/* Manager Info */}
            <h1 className="text-[20px] font-semibold text-[#333] mb-2">{manager.name}</h1>
            <h2 className="text-[16px] text-[#666]">
              <span className="font-semibold">ID:</span> {manager.id}
            </h2>
            <h3 className="text-[16px] text-[#666] mb-4">
              <span className="font-semibold">Title:</span> {manager.title}
            </h3>

            {/* Log Out Button */}
            <button
              onClick={LogOut}
              className="w-[120px] flex items-center justify-center gap-2 px-4 py-2 mt-5 text-white bg-[#008081] hover:bg-[#005f5f] rounded-[5px] transition-colors duration-200"
            >
              Log Out <RiShutDownLine className="w-[20px] h-[20px]" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ManagerProfile;
