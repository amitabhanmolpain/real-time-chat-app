import React, { useContext } from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

const Sidebar = () => {

  const{getUsers, users, selectedUser, setSelectedUser,
    unseenMessages, setUnseenMessages 
  } = useContext(ChatContext)
  
  const {logout, onlineUsers} = useContext(AuthContext)
  
  const navigate = useNavigate();

  return (
    <div
      className={`bg-[#8185B2]/10 h-full px-5 py-6 rounded-r-xl 
      overflow-y-scroll text-white 
      ${selectedUser ? "max-md:hidden" : ""}`}
    >
      <div className="pb-8 px-1 pt-2">
        
        <div className="flex items-center justify-between px-1 py-1">
          <div className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-xl bg-[#1f1838]/70 border border-white/5 shadow-[0_16px_36px_-26px_rgba(118,90,255,0.7)]">
            <img src={assets.logo_icon} alt="logo" className="w-9 h-9" />
            <span className="text-2xl font-semibold tracking-wide">QuickChat</span>
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
              <p onClick={()=> logout()} className="cursor-pointer text-sm hover:text-red-400">
                Logout
              </p>
            </div>
          </div>
          
        </div>

        <div
          className="bg-[#2b2350]/80 backdrop-blur-xl 
          rounded-full flex items-center gap-4 
          py-4 px-7 shadow-[0_16px_40px_-20px_rgba(120,84,255,0.7)] border border-white/10 mt-6"
        >
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-5 h-5 opacity-80"
          />
          <input
            type="text"
            className="bg-transparent border-none outline-none 
            text-white text-base placeholder-[#c9c4e5] flex-1"
            placeholder="Search User..."
          />
        </div>
        
      </div>
      <div className='mt-14 flex flex-col gap-3.5 pr-1'>
         {userDummyData.map((user,index)=>(
            <div onClick={()=> {setSelectedUser(user)}} key={index} className={`relative flex items-center gap-4 py-3.5 px-5 rounded-2xl cursor-pointer max-sm:text-sm transition-all border border-transparent bg-[#1f1738]/40 hover:bg-[#2d2354]/60 hover:border-violet-400/40 ${selectedUser?._id === user._id ? 'bg-[#3a2d67]/80 border-violet-400/70 shadow-[0_18px_40px_-24px_rgba(140,109,255,0.9)]' : ''}`}>
                <img src={user?.profilePic || assets.avatar_icon} alt="" 
                className='w-11 h-11 rounded-full object-cover'/>
                <div className='flex flex-col leading-5'>
                    <p className='text-sm font-medium tracking-wide'>{user.fullName}</p>
                    {
                        index < 3
                        ? <span className='text-emerald-400 text-xs flex items-center gap-1'><span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>Online</span>
                        :  <span className='text-neutral-400 text-xs flex items-center gap-1'><span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-500"></span>Offline</span>
                    }
            </div>
            {index > 2 && <p className='absolute top-3 right-4 text-xs h-6 w-6 flex justify-center items-center rounded-full bg-violet-500 text-white shadow-lg'>{index}</p>}
            </div>
         ))}
      </div> 

      </div>   
  )
}

export default Sidebar
