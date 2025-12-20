import React, { useRef, useEffect } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils'



function ChatContainer({selectedUser,setSelectedUser}) {

  const  scrollEnd =  useRef()
  const currentUserId = '680f50e4f10f3cd28382ecf9'

  useEffect(()=>{
    if(scrollEnd.current){
        scrollEnd.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedUser?._id, messagesDummyData.length])
  return selectedUser ? (
    <div className='h-full flex flex-col relative overflow-hidden bg-[#080412]/60'>
      {/* --header -- */}
      <div className='flex items-center gap-3 py-4 px-5 border-b border-gray-700'>
        <img src={assets.profile_martin} alt="Martin's profile" className="w-10 h-10 rounded-full" />
        <div className='flex-1'>
          <p className='text-lg text-white font-medium flex items-center gap-2'>
            Martin Johnson
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          </p>
        </div>
        <img onClick={()=> setSelectedUser(null)} src={assets.arrow_icon} alt="Back" className="md:hidden w-5 h-5 cursor-pointer"/>
        <img src={assets.search_icon} alt="Search" className="w-5 h-5 cursor-pointer opacity-60 hover:opacity-100 transition" />
        <img src={assets.help_icon} alt="Help Icon" className="w-5 h-5 cursor-pointer opacity-60 hover:opacity-100 transition" />
      </div>
      {/* --chat area -- */}
      <div className='flex-1 flex flex-col overflow-y-auto px-6 py-5 pb-8 space-y-6 scrollbar-thin scrollbar-thumb-[#5c48b4] scrollbar-track-transparent'>
         {messagesDummyData.map((msg,index)=> {
            const isMine = msg.senderId === currentUserId
            return (
              <div key={index} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end gap-3 max-w-full ${isMine ? 'flex-row-reverse' : ''}`}>
                  <div className='shrink-0'>
                    <img src={isMine ? assets.avatar_icon : assets.profile_martin} alt="" className='w-9 h-9 rounded-full object-cover' />
                  </div>
                  <div className={`flex flex-col gap-2 max-w-[460px] ${isMine ? 'items-end text-right' : 'items-start text-left'}`}>
                    {msg.image ? (
                      <img src={msg.image} alt="" className={`max-w-[320px] rounded-3xl border ${isMine ? 'border-violet-400/40' : 'border-emerald-400/40'} shadow-[0_16px_40px_-24px_rgba(0,0,0,0.9)]`} />
                    ) : (
                      <p className={`px-5 py-3 text-sm leading-relaxed rounded-3xl border ${isMine ? 'bg-gradient-to-r from-[#7c67ff]/80 to-[#6b4dff]/80 border-[#9d8dff]/40 text-white' : 'bg-emerald-500/25 border-emerald-400/40 text-emerald-50'}`}>
                        {msg.text}
                      </p>
                    )}
                    <span className={`text-[11px] uppercase tracking-wide ${isMine ? 'text-violet-200' : 'text-emerald-200'}`}>
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
         <div className='flex items-center gap-5 px-8 py-5 border-t border-white/10 bg-[#120d2b]/90 backdrop-blur-lg shrink-0'>
             <div className='flex-1 flex items-center gap-4 bg-[#221a46]/95 px-7 py-5 rounded-full border border-white/10 shadow-[0_26px_46px_-24px_rgba(118,90,255,0.85)]'>
               <input type="text" placeholder="Send a message"
               className='flex-1 text-lg bg-transparent border-none outline-none text-white placeholder-[#d1caef] tracking-wide' />
             <input type="file" id='image' accept='image/png, image/jpeg' hidden/>
             <label htmlFor="image" className='cursor-pointer'>
                <img src={assets.gallery_icon} alt="Attach" className="w-6 opacity-80 hover:opacity-100 transition"/>
             </label>
           </div>
             <button type="button" className='h-[60px] w-[60px] flex items-center justify-center rounded-full bg-gradient-to-br from-[#a76cff] to-[#6f4dff] shadow-[0_28px_48px_-26px_rgba(118,90,255,0.95)] hover:from-[#b97aff] hover:to-[#845dff] transition focus:outline-none focus:ring-2 focus:ring-violet-300/60'>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-6 h-6 text-white translate-x-[1px]'>
                 <path fill="currentColor" d="M3.5 20.5L21 12L3.5 3.5l-.01 6.91L15 12l-11.51 1.58z" />
               </svg>
           </button>
       </div>
    </div>

  )  : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
      <img src={assets.logo_icon} className='max-w-16' alt="" />
      <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
    </div>
  )
}

export default ChatContainer
