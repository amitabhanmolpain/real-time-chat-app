import React, { useRef, useEffect, useContext, useState } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'



function ChatContainer() {

  const { messages, selectedUser, setSelectedUser, sendMessage,
     getMessages } =  useContext(ChatContext)
  const { authUser, onlineUsers } =  useContext(AuthContext)

  const  scrollEnd =  useRef()
   
  const [input, setInput] = useState('');

  //Handle sending a  message 
   const handleSendMessage = async(e)=>{
     e.preventDefault();
     if(input.trim() === "") return null;
     await sendMessage({text: input.trim()});
     setInput("")
   }

   //handle sending an image 
   const handleSendImage = async(e) => {
      const file = e.target.files[0];
      if(!file || !file.type.startsWith("image/")){
        toast.error("select an image file")
        return;
      }
      console.log("Image selected:", file.name);
      const reader =  new FileReader();

      reader.onloadend = async ()=>{
        console.log("Image read, sending...");
        await sendMessage({image: reader.result})
        e.target.value =  ""
      }
      
      reader.readAsDataURL(file);
   }

   useEffect(()=>{
     if(selectedUser){
        getMessages(selectedUser._id)
     }
   },[selectedUser])


  useEffect(()=>{
    if(scrollEnd.current && messages){
        scrollEnd.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return selectedUser ? (
    <div className='h-full flex flex-col relative overflow-hidden bg-gradient-to-br from-[#0a0618]/95 via-[#120d2b]/95 to-[#1a0f3d]/95 backdrop-blur-xl'>
      {/* --header -- */}
      <div className='flex items-center gap-4 py-5 px-6 border-b border-white/10 bg-[#0d0820]/60 backdrop-blur-lg shadow-[0_12px_32px_-12px_rgba(0,0,0,0.4)]'>
        <img src={selectedUser.profilePic || assets.avatar_icon} alt="Profile" className="w-11 h-11 rounded-full ring-2 ring-violet-400/40 shadow-lg object-cover" />
        <div className='flex-1'>
          <p className='text-lg text-white font-semibold flex items-center gap-2 tracking-wide'>
            {selectedUser.fullName}
            {onlineUsers.includes(selectedUser._id) && <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]"></span>}
          </p>
          <p className='text-xs text-white/50 mt-0.5'>{onlineUsers.includes(selectedUser._id) ? 'Active now' : 'Offline'}</p>
        </div>
        <img onClick={()=> setSelectedUser(null)} src={assets.arrow_icon} alt="Back" className="md:hidden w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 hover:scale-110 transition-all"/>
        <img src={assets.search_icon} alt="Search" className="w-5 h-5 cursor-pointer opacity-60 hover:opacity-100 hover:scale-110 transition-all" />
        <img src={assets.help_icon} alt="Help" className="w-5 h-5 cursor-pointer opacity-60 hover:opacity-100 hover:scale-110 transition-all" />
      </div>
      {/* --chat area -- */}
      <div className='flex-1 flex flex-col overflow-y-auto px-6 py-6 pb-8 space-y-7 scrollbar-thin scrollbar-thumb-violet-500/50 scrollbar-track-transparent hover:scrollbar-thumb-violet-500/70'>
         {messages && messages.length > 0 && messages.map((msg,index)=> {
            if(!msg) return null;
            const isMine = msg.senderId === authUser?._id
            return (
              <div key={index} className={`flex ${isMine ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                <div className={`flex items-end gap-3.5 max-w-full ${isMine ? 'flex-row-reverse' : ''}`}>
                  <div className='shrink-0'>
                    <img src={isMine ? (authUser?.profilePic || assets.avatar_icon) : (selectedUser?.profilePic || assets.avatar_icon)} alt="" className='w-10 h-10 rounded-full object-cover ring-2 ring-white/10 shadow-lg' />
                  </div>
                  <div className={`flex flex-col gap-2.5 max-w-[460px] ${isMine ? 'items-end text-right' : 'items-start text-left'}`}>
                    {msg.image && (
                      <img src={msg.image} alt="" className={`max-w-[320px] rounded-2xl border-2 ${isMine ? 'border-violet-400/50' : 'border-emerald-400/50'} shadow-[0_20px_50px_-16px_rgba(0,0,0,0.8)] hover:scale-[1.02] transition-transform duration-200 cursor-pointer`} />
                    )}
                    {msg.text && (
                      <p className={`px-6 py-3.5 text-[15px] leading-relaxed rounded-3xl border backdrop-blur-sm ${isMine ? 'bg-gradient-to-br from-[#8c6fff]/90 via-[#7c5fff]/90 to-[#6d4fff]/90 border-[#a89aff]/30 text-white shadow-[0_18px_42px_-18px_rgba(124,95,255,0.7)]' : 'bg-gradient-to-br from-emerald-500/30 via-emerald-500/25 to-emerald-600/30 border-emerald-400/40 text-emerald-50 shadow-[0_18px_42px_-18px_rgba(16,185,129,0.5)]'}`}>
                        {msg.text}
                      </p>
                    )}
                    <span className={`text-[10px] uppercase tracking-[0.08em] font-medium ${isMine ? 'text-violet-300/70' : 'text-emerald-300/70'}`}>
                      {formatMessageTime(msg.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            )
         })}
          <div ref={scrollEnd}></div>
      </div>


        {/*--Bottom area -----*/}
         <div className='flex items-center gap-5 px-8 py-6 border-t border-white/10 bg-gradient-to-t from-[#0d0820]/95 via-[#120d2b]/95 to-[#120d2b]/80 backdrop-blur-xl shrink-0 shadow-[0_-16px_32px_-12px_rgba(0,0,0,0.4)]'>
             <div className='flex-1 flex items-center gap-4 bg-[#1f1738]/60 backdrop-blur-xl px-7 py-5 rounded-full border border-white/15 shadow-[0_20px_60px_-20px_rgba(124,95,255,0.6)] hover:border-white/25 hover:shadow-[0_24px_70px_-24px_rgba(124,95,255,0.8)] transition-all duration-300'>
               <input onChange={(e)=> setInput(e.target.value)} value={input} 
               onKeyDown={(e)=> e.key === "Enter" ? handleSendMessage(e) : null }  type="text" placeholder="Type your message..."
               className='flex-1 text-[15px] bg-transparent border-none outline-none text-white placeholder-[#bdb5e5]/70 tracking-wide' />
             <input onChange={handleSendImage} type="file" id='image' accept='image/png, image/jpeg' hidden/>
             <label htmlFor="image" className='cursor-pointer group'>
                <img src={assets.gallery_icon} alt="Attach" className="w-6 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all"/>
             </label>
           </div>
           <button onClick={handleSendMessage} type="button" className='h-[62px] w-[62px] flex items-center justify-center rounded-full bg-gradient-to-br from-[#a76cff] via-[#8c5fff] to-[#6f4dff] shadow-[0_20px_60px_-20px_rgba(140,95,255,0.9)] hover:shadow-[0_24px_70px_-24px_rgba(160,108,255,1)] hover:from-[#b97aff] hover:to-[#845dff] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400/60'>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-6 h-6 text-white translate-x-[1px]'>
                 <path fill="currentColor" d="M3.5 20.5L21 12L3.5 3.5l-.01 6.91L15 12l-11.51 1.58z" />
               </svg>
           </button>
       </div>
    </div>

  )  : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
      <img  src={assets.logo_icon} className='max-w-16' alt="" />
      <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
    </div>
  )
}

export default ChatContainer
