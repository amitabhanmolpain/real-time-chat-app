import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'

const RightSidebar = ({ selectedUser }) => {
  if (!selectedUser) return null;

  return (
    <div className={`bg-[#0f0c24]/90 text-white w-full h-full flex flex-col ${selectedUser ? "max-md:hidden" : ""}`}>
      <div className='flex-1 overflow-y-auto px-10 pt-14 pb-16 space-y-10 scrollbar-thin scrollbar-thumb-[#5c48b4] scrollbar-track-transparent'>
        <div className='flex flex-col items-center gap-3 text-center text-sm text-white/80'>
          <img
            src={selectedUser.profilePic || assets.avatar_icon}
            alt=""
            className="w-24 h-24 rounded-full object-cover shadow-[0_18px_40px_-22px_rgba(0,0,0,0.7)]"
          />

          <h1 className="text-xl font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            {selectedUser.fullName}
          </h1>

          <p className="text-xs text-white/60 max-w-[220px] leading-relaxed">{selectedUser.bio}</p>
        </div>

        <div className='space-y-4'>
          <div className='flex items-center gap-3'>
            <h2 className='text-xs font-semibold uppercase tracking-[0.4em] text-white/60'>Media</h2>
            <span className='flex-1 h-px bg-white/10'></span>
          </div>
          <div className="grid grid-cols-2 gap-4 max-h-[240px] overflow-y-auto pr-1">
            {imagesDummyData.map((url,index)=>(
              <button key={index} onClick={()=> window.open(url)} className='group cursor-pointer rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-violet-400/60 transition'>
                <img src={url} alt="" className='w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200'/>  
              </button> 
            ))}
          </div>
        </div>
      </div>
      <div className='px-10 pb-10 pt-6 border-t border-white/5 bg-[#0d0820]/85 shadow-[0_-18px_36px_-28px_rgba(118,90,255,0.8)]'>
        <button className='w-full bg-gradient-to-r
        from-[#a56bff] to-[#6f4dff] text-white border border-white/10
        text-sm font-semibold py-4 rounded-full cursor-pointer hover:from-[#b97aff] hover:to-[#7e5cff] transition-all shadow-[0_22px_44px_-22px_rgba(118,90,255,0.9)] flex items-center justify-center gap-3 tracking-wide'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-4 h-4'><path fill='currentColor' d='M13 3a1 1 0 0 1 1 1v4h-2V5H6v14h6v-3h2v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h8zm3.293 5.293l1.414 1.414L16.414 11H21v2h-4.586l1.293 1.293l-1.414 1.414L14 12l2.293-3.707z'/></svg>
          Logout
        </button>
      </div>
    </div>


    
    
  );
};

export default RightSidebar;
