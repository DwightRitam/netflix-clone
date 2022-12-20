import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm,SubmitHandler } from 'react-hook-form'
import useAuth from '../hooks/useAuth'

const login = () => {
  interface Inputs{
email:string;
password:string;
  }
  const {signIn,signUp}=useAuth()

const [login, setLogin] = useState(false)
const { register, handleSubmit,  formState: { errors } } = useForm<Inputs>();
const onSubmit: SubmitHandler<Inputs> =async ({email,password}) => {
if(login){
 
  await signIn(email, password)
}
else{
  await signUp(email, password)

}

}


  return (
    <div className="relative h-screen  flex md:h-screen md:w-screen  flex-col bg-black md:items-center md:justify-center md:bg-transparent">
    <Head>
        <title>Netflix 2.0</title>
        <link rel="icon" href="https://cdn.iconscout.com/icon/free/png-256/netflix-3628944-3030169.png" />
      </Head>

      <img
        src="https://rb.gy/p2hphi"
      
        className="-z-10 md:h-screen  md:w-screen !hidden object-cover absolute opacity-60 md:!inline"
      
      />
       <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />
      <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
>
<h1 className="text-4xl font-semibold">Sign In</h1>

        <div  className="space-y-4">
            <label className="inline-block w-full">
                <input type="email" {...register("email",{required:true})} placeholder='Email'className='input' />
                {errors.email && <span className='text-orange-300'>Please enter a valid email address</span>}
            </label>
            <label className="inline-block w-full">
            <input type="password"  placeholder='Password'className='input'
            {...register("password",{required:true, minLength:8})} />
             {errors.password && <span className='text-orange-300'>password must be of 8 characters</span>}
            </label>
        </div>
        <button
          className="w-full rounded bg-[#E50914] py-3 font-semibold"
          type="submit"
          onClick={()=>setLogin(true)}
        >
          Sign In
        </button>
        <div className="text-[gray]">
          New to Netflix?{' '}
          <button
            className="cursor-pointer text-white hover:underline"
            type="submit"
            onClick={()=>setLogin(false)}
          >
            Sign up now
          </button>
        </div>

      </form>
    </div>
  )
}

export default login
