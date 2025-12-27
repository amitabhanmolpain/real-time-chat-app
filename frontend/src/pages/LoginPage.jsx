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

      <form onSubmit={onSubmitHandler} className='w-full max-w-md border-2 bg-white/8 text-white border-gray-500 px-8 py-8 flex flex-col gap-6 rounded-xl shadow-2xl'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}
          {isDataSubmitted && <img onClick={()=> setIsDataSubmitted(false)}src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' /> }
          </h2>

        {currState === "Sign up" && !isDataSubmitted &&(
            <input onChange={(e)=>setFullName(e.target.value)} value={fullName}
             type="text" className='w-full p-3 border border-gray-500 rounded-lg 
           focus:outline-none focus:ring-2 focus:ring-indigo-500/60' placeholder='Full Name' required/>
        )}
          
        {!isDataSubmitted && (
          <>
          <input onChange={(e)=>setEmail(e.target.value)} value={email}
           type="email" placeholder='Email Address' required className='w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:ring-2
          focus:ring-indigo-500/60'/>
          <input onChange={(e)=>setPassword(e.target.value)} value={password}
           type="password" placeholder='Password' required className='w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:ring-2
          focus:ring-indigo-500/60'/>
          </>
        )}

          {currState === "Sign up" && isDataSubmitted &&(
            <textarea onChange={(event)=>setBio(event.target.value)} value={bio}
            rows={4} className='w-full p-3 border border-gray-500 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-indigo-500/60'
           placeholder='provide a short bio...' required></textarea>
        )
        }

           <button type='submit' className='w-full py-4 bg-linear-to-r from-purple-400 to-violet-600 text-white rounded-lg cursor-pointer text-lg font-semibold'>
           {currState === "Sign up" ? "Create Account" : "Login Now"}

        </button>

        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className='flex flex-col gap-2'>
          { currState === "Sign up" ? (
            <p className='text-sm text-gray-600'>Already have an account? <span onClick={()=> {setCurrState("Login"); setIsDataSubmitted(false)}}
             className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>
          ):(
            <p className='text-sm text-gray-600'>Create an account <span onClick={() => {setCurrState("Sign up"); setIsDataSubmitted(false)}}
            className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>
          )}
        </div>

      </form>
    </div>
  )
}

export default LoginPage