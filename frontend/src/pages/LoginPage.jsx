import React,{useState, useContext} from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {

  const [currState,setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const {login} = useContext(AuthContext)

  const onSubmitHandler = (event)=>{
    event.preventDefault();

    if(currState === 'Sign up' && !isDataSubmitted){
      setIsDataSubmitted(true)
      return;
    }

    login(currState === "Sign up" ? 'signup' : 'login', {fullName, email, password, bio})
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center 
    justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/*-- left --- */}
      <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]'/>
      {/*---right --- */}

      <form onSubmit={onSubmitHandler} className='w-full max-w-[380px] border border-white/20 bg-gradient-to-b from-[#1a1432]/95 to-[#0f0c24]/95 backdrop-blur-2xl text-white px-8 py-12 flex flex-col gap-6 rounded-2xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)]'>
        <h2 className='font-bold text-2xl flex justify-between items-center tracking-wide mb-3'>
          {currState}
          {isDataSubmitted && <img onClick={()=> setIsDataSubmitted(false)}src={assets.arrow_icon} alt="" className='w-5 cursor-pointer hover:scale-110 transition-transform' /> }
          </h2>

        {currState === "Sign up" && !isDataSubmitted &&(
            <input onChange={(e)=>setFullName(e.target.value)} value={fullName}
             type="text" className='w-full px-5 py-5 bg-[#0d0820]/60 border border-white/15 rounded-xl text-white placeholder-white/50
           focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:border-violet-400/60 transition-all duration-200 text-[15px]' placeholder='Full Name' required/>
        )}
          
        {!isDataSubmitted && (
          <>
          <input onChange={(e)=>setEmail(e.target.value)} value={email}
           type="email" placeholder='Email Address' required className='w-full px-5 py-5 bg-[#0d0820]/60 border border-white/15 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2
          focus:ring-violet-500/60 focus:border-violet-400/60 transition-all duration-200 text-[15px]'/>
          <input onChange={(e)=>setPassword(e.target.value)} value={password}
           type="password" placeholder='Password' required className='w-full px-5 py-5 bg-[#0d0820]/60 border border-white/15 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2
          focus:ring-violet-500/60 focus:border-violet-400/60 transition-all duration-200 text-[15px]'/>
          </>
        )}

          {currState === "Sign up" && isDataSubmitted &&(
            <textarea onChange={(event)=>setBio(event.target.value)} value={bio}
            rows={5} className='w-full px-5 py-5 bg-[#0d0820]/60 border border-white/15 rounded-xl text-white placeholder-white/50
            focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:border-violet-400/60 transition-all duration-200 resize-none text-[15px]'
           placeholder='Tell us about yourself...' required></textarea>
        )
        }

           <button type='submit' className='w-full py-4 bg-gradient-to-r from-[#a76cff] via-[#8c5fff] to-[#6f4dff] text-white rounded-xl cursor-pointer text-base font-bold tracking-wide shadow-[0_20px_46px_-20px_rgba(140,95,255,0.9)] hover:shadow-[0_24px_56px_-20px_rgba(160,108,255,1)] hover:from-[#b97aff] hover:to-[#845dff] hover:scale-[1.02] active:scale-95 transition-all duration-200 mt-4'>
           {currState === "Sign up" ? "Create Account" : "Login Now"}

        </button>

        <div className='flex items-start gap-3 text-sm text-white/60 mt-2'>
          <input type="checkbox" className='w-4 h-4 mt-0.5 accent-violet-500 cursor-pointer flex-shrink-0' />
          <p className='leading-relaxed'>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className='flex flex-col gap-2 mt-1'>
          { currState === "Sign up" ? (
            <p className='text-sm text-white/60 leading-relaxed'>Already have an account? <span onClick={()=> {setCurrState("Login"); setIsDataSubmitted(false)}}
             className='font-semibold text-violet-400 cursor-pointer hover:text-violet-300 transition-colors'>Login here</span></p>
          ):(
            <p className='text-sm text-white/60 leading-relaxed'>Create an account <span onClick={() => {setCurrState("Sign up"); setIsDataSubmitted(false)}}
            className='font-semibold text-violet-400 cursor-pointer hover:text-violet-300 transition-colors'>Click here</span></p>
          )}
        </div>

      </form>
    </div>
  )
}

export default LoginPage