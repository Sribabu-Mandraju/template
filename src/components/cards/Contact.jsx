import React from "react";
import img from '../../assets/me.png'


const ContactInfoCard = () => {
  return (
    <div className="max-w-xs w-72 h-96 mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="w-full flex items-center h-[130px] justify-center">
          <img
              className="w-[100px] h-[100px] "
              src={img}
              alt="Student Profile"
            />
        </div>    
        <div className="p-4 flex flex-col justify-between flex-grow bg-purple-100">
          <div>
           
            <h1 className="mt-1 text-lg font-bold text-purple-800">
              Sribabu Mandraju
            </h1>
            <p className="mt-2 text-gray-600">Phone: +91 63037 38847</p>
            <p className="mt-1 text-gray-600">Email: sribabumandraju@gmail.com </p>
            <p className="mt-1 text-gray-600">Address: Eluru (dist) </p>
            
          </div>
          <div className="mt-4">
            <button className="text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-full w-full">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCard;
