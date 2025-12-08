import React from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-[#8185B2]/10 h-full px-5 py-6 rounded-r-xl 
      overflow-y-scroll text-white 
      ${selectedUser ? "max-md:hidden" : ""}`}
    >
      <div className="pb-5 space-y-5">
        
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2.5">
            <img src={assets.logo_icon} alt="logo" className="w-9 h-9" />
            <span className="text-lg font-semibold">QuickChat</span>
          </div>

          <div className="relative group">
            <img
              src={assets.menu_icon}
              alt="menu"
              className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100 transition"
            />
            <div className="absolute top-full right-0 z-10 w-32 p-4 rounded-md 
              bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
              <p
                onClick={() => navigate('/profile')}
                className="cursor-pointer text-sm hover:text-indigo-400"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p className="cursor-pointer text-sm hover:text-red-400">
                Logout
              </p>
            </div>
          </div>
        </div>

        <div
          className="bg-[#282142]/80 backdrop-blur-md 
          rounded-full flex items-center gap-3 
          py-3 px-5 shadow-inner border border-white/10"
        >
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-4 h-4 opacity-70"
          />
          <input
            type="text"
            className="bg-transparent border-none outline-none 
            text-white text-sm placeholder-[#b1b1b1] flex-1"
            placeholder="Search User..."
          />
        </div>
      </div>
      <div className='flex flex-col gap-2 mt-5'>
         {userDummyData.map((user,index)=>(
            <div onClick={()=> {setSelectedUser(user)}} key={index} className={`relative flex items-center gap-3 py-3 px-4 rounded-lg cursor-pointer max-sm:text-sm hover:bg-[#282142]/30 transition-colors ${selectedUser?._id === user._id ? 'bg-[#282142]/50' : ''}`}>
                <img src={user?.profilePic || assets.avatar_icon} alt="" 
                className='w-10 h-10 rounded-full object-cover'/>
                <div className='flex flex-col leading-5'>
                    <p className='text-sm font-medium'>{user.fullName}</p>
                    {
                        index < 3
                        ? <span className='text-green-400 text-xs'>Online</span>
                        :  <span className='text-neutral-400 text-xs'>Offline</span>
                    }
            </div>
            {index > 2 && <p className='absolute top-3 right-3 text-xs h-5 w-5 
            flex justify-center items-center rounded-full bg-violet-500/50'>{index}</p>}
            </div>
         ))}
      </div> 

      </div>   
  )
}

export default Sidebar
