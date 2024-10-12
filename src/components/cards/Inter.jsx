import React from "react";
import img from '../../assets/me.png'


const IntermediateCard = () => {
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
            
            <h1 className="mt-1 text-lg font-bold text-black">
              Sribabu Mandraju
            </h1>
            <p className="mt-2 text-gray-600">College: RGUKT</p>
            <p className="mt-1 text-gray-600">Stream: Science</p>
            <p className="mt-1 text-gray-600">Grade: 9.7</p>
            <p className="mt-1 text-gray-600">Year of Passing: 2023</p>
            
          </div>
          <div className="mt-4">
            <button className="text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-full w-full">
              View Achievements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntermediateCard;
