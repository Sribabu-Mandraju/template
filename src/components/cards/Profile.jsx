import React from "react";
import img from '../../assets/me.png'

const ProfileCard = () => {
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
        <div className="p-4 flex flex-col justify-between flex-grow bg-indigo-100">
          <div>
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Web Developer
            </div>
            <h1 className="mt-1 text-lg font-bold text-black">
              Sribabu Mandraju
            </h1>
            <p className="mt-2 text-gray-600">
              Passionate about creating interactive and scalable web
              applications. 
            </p>
          </div>
          <div className="mt-4">
            <button className="text-white bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-full w-full">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
