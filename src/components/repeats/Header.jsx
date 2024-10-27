import React from 'react'

const Header = () => {
    const storedData = localStorage.getItem("user");
    const userData = JSON.parse(storedData);
    
    

  return (
    <>
      <div className="w-full flex items-center bg-purple-100 justify-between h-[60px] fixed top-0 left-0">
        <div className="logo font-bold px-2 text-3xl "><span className="text-blue-600">The</span> <span className="text-red-600">Trio</span></div>
        <div className="flex items-center mx-2 p-1 rounded-full shadow-md  border-2">
            <div className="w-[30px] h-[30px] rounded-full bg-purple-200 flex justify-center items-center">
                <div className="text-purple-950">{userData.user.name[0]}</div>
            </div>
            <div className="px-2">{userData.user.email}</div>
        </div>
      </div>
    </>
  )
}

export default Header
