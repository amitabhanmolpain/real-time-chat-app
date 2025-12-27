import React, { useContext , useState, useEffect} from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

const Sidebar = () => {

  const{getUsers, users, selectedUser, setSelectedUser,
    unseenMessages, setUnseenMessages 
  } = useContext(ChatContext);
  
  const {logout, onlineUsers} = useContext(AuthContext)
  const [input, setInput] = useState(false)
  
  const navigate = useNavigate();

  const filteredUsers = input ? users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase())) : users;

  useEffect(()=>{
    getUsers();

  },[onlineUsers])

  return (
    <div
      className={`bg-[#8185B2]/10 h-full px-5 py-6 rounded-r-xl 
      overflow-y-scroll text-white 
      ${selectedUser ? "max-md:hidden" : ""}`}
    >
      <div className="pb-8 px-1 pt-2">
        
        <div className="flex items-center justify-between px-1 py-1">
          <div className="flex items-center gap-3 pl-2 pr-3 py-2 rounded-xl bg-gradient-to-r from-[#1f1838]/80 to-[#2a1f48]/80 border border-white/10 shadow-[0_18px_40px_-24px_rgba(140,95,255,0.8)] backdrop-blur-sm">
            <img src={assets.logo_icon} alt="logo" className="w-9 h-9" />
            <span className="text-2xl font-bold tracking-wide bg-gradient-to-r from-violet-300 to-purple-200 bg-clip-text text-transparent">QuickChat</span>
          </div>

          <div className="relative group">
            <img
              src={assets.menu_icon}
              alt="menu"
              className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 hover:scale-110 transition-all"
            />
            <div className="absolute top-full right-0 z-10 w-36 p-4 rounded-xl mt-2
              bg-[#1f1838]/95 backdrop-blur-xl border border-white/20 text-gray-100 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.8)] hidden group-hover:block">
              <p
                onClick={() => navigate('/profile')}
                className="cursor-pointer text-sm py-2 hover:text-violet-400 transition-colors font-medium"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-white/10" />
              <p onClick={()=> logout()} className="cursor-pointer text-sm py-2 hover:text-red-400 transition-colors font-medium">
                Logout
              </p>
            </div>
          </div>
          
        </div>

        <div
          className="bg-[#1f1738]/60 backdrop-blur-xl 
          rounded-full flex items-center gap-4 
          py-4 px-7 shadow-[0_18px_46px_-18px_rgba(140,95,255,0.7)] border border-white/15 hover:border-white/25 hover:shadow-[0_22px_56px_-20px_rgba(140,95,255,0.9)] transition-all duration-300 mt-6"
        >
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-5 h-5 opacity-70"
          />
          <input
           onChange={(e)=>setInput(e.target.value)} type="text"
            className="bg-transparent border-none outline-none 
            text-white text-[15px] placeholder-[#bdb5e5]/60 flex-1 tracking-wide"
            placeholder="Search users..."
          />
        </div>
        
      </div>
      <div className='mt-14 flex flex-col gap-3 pr-1'>
         {filteredUsers.map((user,index)=>(
            <div onClick={()=> {setSelectedUser(user); setUnseenMessages(prev => ({...prev, [user._id]:0}))}} 
            key={index} className={`group relative flex items-center gap-4 py-4 px-5 rounded-2xl cursor-pointer max-sm:text-sm transition-all duration-200 border border-transparent bg-[#1a1432]/50 hover:bg-[#2a2050]/70 hover:border-violet-400/50 hover:shadow-[0_16px_36px_-20px_rgba(140,109,255,0.6)] hover:scale-[1.02] ${selectedUser?._id === user._id ? 'bg-gradient-to-r from-[#3a2d67]/90 to-[#2f2456]/90 border-violet-400/70 shadow-[0_20px_46px_-22px_rgba(160,109,255,0.9)] scale-[1.02]' : ''}`}>
                <img src={user?.profilePic || assets.avatar_icon} alt="" 
                className='w-12 h-12 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-violet-400/40 transition-all shadow-md'/>
                <div className='flex flex-col leading-5'>
                    <p className='text-[15px] font-semibold tracking-wide'>{user.fullName}</p>
                    {
                        onlineUsers.includes(user._id)
                        ? <span className='text-emerald-400 text-xs flex items-center gap-1.5 mt-1 font-medium'><span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.6)]"></span>Online</span>
                        :  <span className='text-neutral-400 text-xs flex items-center gap-1.5 mt-1 font-medium'><span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-500"></span>Offline</span>
                    }
            </div>
            {unseenMessages[user._id] > 0  && <p className='absolute top-3 right-4 text-xs h-6 w-6 flex justify-center items-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-[0_8px_20px_-8px_rgba(139,92,246,0.8)] font-semibold animate-pulse'>{unseenMessages[user._id]}</p>}
            </div>
         ))}
      </div> 

      </div>   
  )
}

export default Sidebar
