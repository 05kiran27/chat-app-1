import React from 'react'
import GenderCheckBox from './GenderCheckBox'

const Signuppage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-300 '>
                Sign up
                <span className='text-blue-500'>Chat APP</span>
            </h1>

            <form>
                <div>
                    <label className='label p-2 text-white'>
                        First Name
                    </label>
                    <input type='text' placeholder='Enter first' className='w-full input input-bordered h-10 '></input>
                </div>

                <div>
                    <label className='label p-2 text-white'>
                        Last Name
                    </label>
                    <input type='text' placeholder='Enter last name' className='w-full input input-bordered h-10 '></input>
                </div>

                <div>
                    <label className='label p-2 text-white'>
                        username
                    </label>
                    <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10 '></input>
                </div>

                <div>
                    <label className='label'>
                        <span className='text-base label-text text-white'>Password</span>
                    </label>
                    <input
                        type='password'
                        placeholder='Enter your password'
                        className='w-full input input-bordered h-10'
                    />
                </div>

                <div>
                    <label className='label'>
                        <span className='text-base label-text text-white'> Confirm Password</span>
                    </label>
                    <input
                        type='password'
                        placeholder='Confirm password'
                        className='w-full input input-bordered h-10'
                    />
                </div>

                <GenderCheckBox/>

                <a href='#' className='text-sm hover:underline text-white hover:text-blue-600 mt-2 inline-block'>
                    {"Already"} have an account?
                </a>

                <div>
                    <button className='btn btn-block btn-sm mt-2'>Signup</button>
                </div>
            </form>


        </div>
    </div>
  )
}

export default Signuppage


// starter code for signup 
// import React from 'react'
// import GenderCheckBox from './GenderCheckBox'

// const Signuppage = () => {
//   return (
//     <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
//         <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//             <h1 className='text-3xl font-semibold text-center text-gray-300 '>
//                 Sign up
//                 <span className='text-blue-500'>Chat APP</span>
//             </h1>

//             <form>
//                 <div>
//                     <label className='label p-2 text-white'>
//                         First Name
//                     </label>
//                     <input type='text' placeholder='Enter first' className='w-full input input-bordered h-10 '></input>
//                 </div>

//                 <div>
//                     <label className='label p-2 text-white'>
//                         Last Name
//                     </label>
//                     <input type='text' placeholder='Enter last name' className='w-full input input-bordered h-10 '></input>
//                 </div>

//                 <div>
//                     <label className='label p-2 text-white'>
//                         username
//                     </label>
//                     <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10 '></input>
//                 </div>

//                 <div>
//                     <label className='label'>
//                         <span className='text-base label-text text-white'>Password</span>
//                     </label>
//                     <input
//                         type='password'
//                         placeholder='Enter your password'
//                         className='w-full input input-bordered h-10'
//                     />
//                 </div>

//                 <div>
//                     <label className='label'>
//                         <span className='text-base label-text text-white'> Confirm Password</span>
//                     </label>
//                     <input
//                         type='password'
//                         placeholder='Confirm password'
//                         className='w-full input input-bordered h-10'
//                     />
//                 </div>

//                 <GenderCheckBox/>

//                 <a href='#' className='text-sm hover:underline text-white hover:text-blue-600 mt-2 inline-block'>
//                     {"Already"} have an account?
//                 </a>

//                 <div>
//                     <button className='btn btn-block btn-sm mt-2'>Signup</button>
//                 </div>
//             </form>


//         </div>
//     </div>
//   )
// }

// export default Signuppage