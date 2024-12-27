import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";
import { BsQrCode } from "react-icons/bs";
import { FaFileDownload } from "react-icons/fa";
import WorkerSideBar from "../Components/WorkerSideBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {jsPDF} from 'jspdf'
import QRCode from "react-qr-code"

function ApprovedScan() {
  const params = useParams()
  const [Request, setRequest] = useState({})
  const [Name, setName] = useState("")
  const [Title, setTitle] = useState("")
  const [RequestedDate, setRequestedDate] = useState("")
  const [ApprovedDate, setApprovedDate] = useState("")
  const [Destination, setDestination] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [Duration, setDuration] = useState("")
  const [Status, setStatus] = useState({})
  
  const id = localStorage.getItem("worker")
  
  const admin = localStorage.getItem('admin'); // admin is key in local storage NOte meelwalbana admin ka dhig 
  const HandleGetRequests = () => {
    axios.get(`http://localhost:7000/request/${params.id}`).then((response) => {
      setRequest(response.data)
      setName(response.data.fullName)
      setTitle(response.data.title)
      setRequestedDate(response.data.requestedAt)
      setStatus(response.data.status)
      setApprovedDate(response.data.approvedAt)
      setDestination(response.data.destination)
      setStartDate(response.data.startDate)
      setEndDate(response.data.endDate)
      calculateDuration(response.data.startDate, response.data.endDate); // Calculate duration when data is fetched

    }).catch((error) => {
        console.log(error)
        alert("Error in getting requests")
    })
}
const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = Math.floor((end - start) / (1000 * 3600 * 24)); // Difference in days
  setRequest((prevState) => ({ ...prevState, duration })); // Update the duration in state
};
const generatePDF = () => {
  const doc = new jsPDF();
  //  const qr = new QRious({
  //   value: 'https://example.com', // You can replace this with any link or data
  //   size: 100, // Size of the QR code
  // });
  const headerFooterColor = "#008081";
  const whiteColor = "#ffffff";
   // Draw header
   doc.setFillColor(headerFooterColor);
   doc.rect(0, 0, doc.internal.pageSize.width, 20, 'F'); // Header rectangle

   // Title in the header
   doc.setFontSize(18);
   doc.setTextColor(255, 255, 255); // White text color
   doc.text("Worker Request Report", 72, 15,); // Title of the PDF

   // Draw footer
   doc.setFillColor(headerFooterColor);
   doc.rect(0, doc.internal.pageSize.height - 20, doc.internal.pageSize.width, 20, 'F'); // Footer rectangle

   // Footer text (page number)
   doc.setFontSize(12);
   doc.setTextColor(whiteColor);
  //  doc.text("Page 1", doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);

   // Set the content font style
   doc.setFontSize(12);
   doc.setTextColor(0, 0, 0); // Black text for content

   // Add information in a professional format

   // Status: Approved
   doc.text(`Status: ${Status}`, 90, 30);
   doc.setTextColor(0, 128, 128); // Change color for status to match the header

   // From
   doc.setTextColor(0, 0, 0); // Back to black text for labels
   doc.text(`From: ${JSON.parse(admin).name}`, 10, 50);

   // To
   doc.text(`To: ${Name}`, 10, 60);

   // Title
   doc.text(`Title: ${Title}`, 10, 70);

   // Requested Date
   doc.text(`Requested Date: ${new Date (RequestedDate).toLocaleDateString()}`, 10, 80);

   // Approved Date
   doc.text(`Approved Date: ${new Date (ApprovedDate).toLocaleDateString()}`, 10, 90);

   // Destination
   doc.text(`Destination: ${Destination}`, 10, 100);

   // Start Date
   doc.text(`Start Date: ${new Date (startDate).toLocaleDateString()}`, 10, 110);

   // End Date
   doc.text(`End Date: ${new Date (endDate).toLocaleDateString()}`, 10, 120);

   // Duration
   doc.text(`Duration: ${Duration} days`, 10, 130);

   // Letter Body
   doc.setFontSize(12); // Smaller font for the body text
   doc.text(`Dear ${Name}, `, 10, 140);
   const lines = [
     `I am pleased to inform you that your request for permission to conduct the permission request",
    "has been ${Status}. This approval is granted under the terms and conditions set forth",
    "in your application submitted on ${RequestedDate}",
    "Best wishes for your endeavor. `
];

doc.text(lines, 10, 150);
  //  doc.text(`I am pleased to inform you that your request for permission to conduct the permission request`,
  //   `has been ${Status}. This approval is granted under the terms and conditions set forth in your application`,
  // `submitted on ${new Date (RequestedDate).toLocaleDateString()} Best wishes for your endeavor`, 10, 150);

   // Closing
   doc.text("Sincerely,", 10, 180);
   doc.text(`${JSON.parse(admin).name}`, 10, 190);
   doc.text(`${JSON.parse(admin).title}`, 10, 200);

   
   // Save the PDF
   doc.save("worker_request_report.pdf");

};

useEffect(() => {
    HandleGetRequests();
},[])
  return (
    <div className="w-full bg-fixed overflow-hidden h-screen bg-[#DADADA] ">
      {/* <WorkerSideBar /> */}
      <div className="w-full ml-0 sm:ml-[19%] px-[15px]  sm:mt-4 mt-20 sm:px-[20px] py-[10px] sm:h-[550px]  absolute  sm:w-[800px] bg-[#F2F2F2] rounded-xl sm:shadow-md">
        <div className="mt-2">
          <div className=" text-center">
            {/* <FaUserTie className="text-3xl sm:text-4xl" /> */}
            <h1 className="text-lg sm:text-xl font-semibold"> Permission Request</h1>
            <h1 className="text-lg sm:text-lg ">Status:  &nbsp; 
              <span
                  className={`font-semibold ${ Request.status === "Approved" ? "text-green-500" : "text-red-500" }`} >{Request.status} 
              </span> </h1>
          </div>
          
          <div className="flex  sm:flex-row mt-3 gap-5 sm:gap-10">
            <ul className="font-semibold leading-[26px]">
              <li>From</li>
              {/* <li>Title</li> */}
              <li>To</li>
              <li>Title:</li>
              <li>Requested Date</li>
              <li>Approved Date</li>
              <li>Destination</li>
              <li>Start Date</li>
              <li>End Date</li>
              <li>Duration</li>
              {/* <li>Subject:</li> */}
            </ul>
            <ul className="sm:ml-[-30px] leading-[26px]">
              <li>:</li>
              <li>:</li>
              <li>:</li>
              <li>:</li>
              <li>:</li>
              <li>:</li>
              <li>:</li>
              <li>:</li>
              {/* <li>:</li> */}
              <li>:</li>
            </ul>
            <ul className="leading-[26px]">
              <li>{JSON.parse(admin).name}</li> 
              {/* <li>CEO</li>  */}
              <li>{Request.fullName}</li>
              <li>{Request.title}</li>
              <li>{new Date (Request.requestedAt).toLocaleDateString()}</li>  
              <li>{new Date (Request.approvedAt).toLocaleDateString()}</li>
              <li>{Request.destination}</li>
              <li>{new Date (Request.startDate).toLocaleDateString()}</li>  
              <li>{new Date (Request.endDate).toLocaleDateString()}</li>               
              <li>{Request.duration} days</li>
              {/* <li>July 1, 2023</li>
              <li>10 Days</li> */}
              {/* <li>
                Permission Request <span className="font-semibold">Accepted</span>
              </li> */}
            </ul>
          </div>
          <p className="mt-3 text-sm sm:text-base">
            Dear {Request.fullName},
            <br />
            I am pleased to inform you that your request for permission to conduct persmission request has been <span className="font-semibold">{Request.status}</span>. This approval is granted under the terms and conditions set forth in your application submitted on {new Date (Request.requestedAt).toLocaleDateString()}.
            <br />
            Best wishes for your endeavor.
          </p>
          <div className="flex mt-[10px]  sm:flex-row items-center justify-between ">
            <p className="text-sm sm:text-base">
              Sincerely, <br />
              {JSON.parse(admin).name} <br />
              {JSON.parse(admin).title}
            </p>
            <Link to="/workerDashboard">
              <FaArrowLeft className="text-2xl sm:text-3xl ml-[-100px] mt-10 text-deepBlue hover:text-skyBlue" />
            </Link>
          </div>
          {
            Request.status === "Approved" && (

              <div className="absolute items-center  sm:block sm:ml-0  sm:mt-0 mt-[80px] right-4 sm:right-8 top-24  ">
                <div onClick={generatePDF} className="flex gap-2 sm:mr-10 sm:mt-0    items-center">
                  <FaFileDownload   className="text-[35px] mb-8 sm:mb-0 ml-4 sm:ml-0 sm:text-[22px]" />
                  <h1 className=" sm:text-sm hidden sm:flex  font-semibold">Download File</h1>
                </div>
                {/* <BsQrCode values={`https://www.google.com`}  className="text-7xl sm:text-8xl sm:mt-5 mt-6   sm:ml-3" /> */}
                {/* Display the QR code */}
                <QRCode className="mt-[-100px] sm:mt-[-50px] w-[100px] sm:w-[120px]" value={`http://localhost:5173/workerMessageView/${params.id}`} />

              </div>
          )
        }
        </div>
      </div>
    </div>
  );
}

export default ApprovedScan;