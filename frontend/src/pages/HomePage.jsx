import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(false);

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div
        className={`backdrop-blur-xl bg-white/5 border border-gray-600 rounded-3xl 
        overflow-hidden w-full max-w-7xl h-[85vh] grid relative transition-all duration-300
        ${selectedUser 
          ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' 
          : 'md:grid-cols-[1fr_2fr]'
        }`}
      >
        <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <ChatContainer  selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
        <RightSidebar  selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      </div>
    </div>
  )
}

export default HomePage;
