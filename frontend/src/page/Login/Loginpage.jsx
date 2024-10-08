import React, { useState } from 'react'
import useLogin from '../../hooks/useLogin';

const Loginpage = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const {loading, login} = useLogin()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(userName, password);
    }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300 '>
                    login
                    <span className='text-blue-500'>Chat APP</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2 text-white'>
                            Username
                        </label>
                        <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10 '
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='label'>
                            <span className='text-base label-text text-white'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter your password'
                            className='w-full input input-bordered h-10'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <a href='/signup' className='text-sm hover:underline text-white hover:text-blue-600 mt-2 inline-block'>
                        {"Dont"} have an account?
                    </a>

                    <div>
                        <button className='btn btn-block btn-sm mt-2'disabled = {loading}>
                            {loading ? <span className='loading loading-spinner'></span> : "Login"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
  )
}

export default Loginpage

// starter code for this file
// import React from 'react'

// const Loginpage = () => {
//   return (
//     <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
//             <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0'>
//                 <h1 className='text-3xl font-semibold text-center text-gray-300 '>
//                     login
//                     <span className='text-blue-500'>Chat APP</span>
//                 </h1>

//                 <form>
//                     <div>
//                         <label className='label p-2 text-white'>
//                             Username
//                         </label>
//                         <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10 '></input>
//                     </div>
//                     <div>
//                         <label className='label'>
//                             <span className='text-base label-text text-white'>Password</span>
//                         </label>
//                         <input
//                             type='password'
//                             placeholder='Enter your password'
//                             className='w-full input input-bordered h-10'
//                         />
//                     </div>

//                     <a href='#' className='text-sm hover:underline text-white hover:text-blue-600 mt-2 inline-block'>
//                         {"Dont"} have an account?
//                     </a>

//                     <div>
//                         <button className='btn btn-block btn-sm mt-2'>Login</button>
//                     </div>
//                 </form>

//             </div>
//         </div>
//   )
// }

// export default Loginpage