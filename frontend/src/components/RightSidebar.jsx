import React, { useContext,useState,useEffect } from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const RightSidebar = () => {
  
  const {selectedUser, messages} = useContext(ChatContext)
  const {logout, onlineUsers} = useContext(AuthContext) 
  const [msgImages, setMsgImages] = useState([])

  //Get all the  images from the messages and set them to state 
  useEffect(()=>{
    setMsgImages(
      messages.filter(msg => msg.image).map(msg=>msg.image)
    )
  },[messages])


  return selectedUser && (
    <div className={`bg-gradient-to-b from-[#0d0820]/95 via-[#120d2b]/95 to-[#0f0c24]/95 backdrop-blur-xl text-white w-full h-full flex flex-col border-l border-white/5 ${selectedUser ? "max-md:hidden" : ""}`}>
      <div className='flex-1 overflow-y-auto px-10 pt-16 pb-16 space-y-12 scrollbar-thin scrollbar-thumb-violet-500/50 scrollbar-track-transparent hover:scrollbar-thumb-violet-500/70'>
        <div className='flex flex-col items-center gap-4 text-center text-sm text-white/80'>
          <div className='relative'>
            <img
              src={selectedUser.profilePic || assets.avatar_icon}
              alt=""
              className="w-28 h-28 rounded-full object-cover shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8)] ring-4 ring-white/10"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-green-400 ring-4 ring-[#0d0820] animate-pulse shadow-[0_0_12px_rgba(74,222,128,0.8)]"></span>
            )}
          </div>

          <h1 className="text-2xl font-bold tracking-wide mt-2">
            {selectedUser.fullName}
          </h1>

          {onlineUsers.includes(selectedUser._id) ? (
            <p className="text-sm text-white/60 max-w-[240px] leading-relaxed">{selectedUser.bio || 'No bio available'}</p>
          ) : (
            <p className="text-sm text-white/40 max-w-[240px] leading-relaxed flex items-center gap-2 justify-center"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>Offline</p>
          )}
        </div>

        <div className='space-y-5'>
          <div className='flex items-center gap-3'>
            <h2 className='text-xs font-bold uppercase tracking-[0.3em] text-white/60'>Shared Media</h2>
            <span className='flex-1 h-px bg-gradient-to-r from-white/20 to-transparent'></span>
          </div>
          <div className="grid grid-cols-2 gap-3 max-h-[240px] overflow-y-auto pr-1">
            {msgImages.map((url,index)=>(
              <button key={index} onClick={()=> window.open(url)} className='group cursor-pointer rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-violet-400/70 hover:shadow-[0_12px_28px_-12px_rgba(140,95,255,0.7)] transition-all duration-200'>
                <img src={url} alt="" className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'/>  
              </button> 
            ))}
          </div>
        </div>
      </div>
      <div className='px-10 pb-10 pt-6 border-t border-white/10 bg-[#0a0618]/90 backdrop-blur-lg shadow-[0_-20px_40px_-24px_rgba(140,95,255,0.6)]'>
        <button onClick={()=> logout()} className='w-full bg-gradient-to-br
        from-[#a76cff] via-[#8c5fff] to-[#6f4dff] text-white border border-white/15
        text-sm font-bold py-4 rounded-full cursor-pointer hover:from-[#b97aff] hover:to-[#7e5cff] hover:shadow-[0_24px_50px_-20px_rgba(140,95,255,1)] hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_20px_46px_-20px_rgba(140,95,255,0.9)] flex items-center justify-center gap-3 tracking-wide'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-4 h-4'><path fill='currentColor' d='M13 3a1 1 0 0 1 1 1v4h-2V5H6v14h6v-3h2v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h8zm3.293 5.293l1.414 1.414L16.414 11H21v2h-4.586l1.293 1.293l-1.414 1.414L14 12l2.293-3.707z'/></svg>
          Logout
        </button>
      </div>
    </div>


    
    
  );
};

export default RightSidebar;
