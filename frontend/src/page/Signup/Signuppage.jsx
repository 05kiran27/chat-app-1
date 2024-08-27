import React, { useState } from 'react';
import GenderCheckBox from './GenderCheckBox';
import useSignup from '../../hooks/useSignup';

const Signuppage = () => {
    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        userName: '', // Ensure this matches backend requirements
        password: '',
        confirmPassword: '',
        gender: ''
    });

    const { loading, signup } = useSignup();

    const handleCheckboxChange = (gender) => {
        setInputs((prevInputs) => ({ ...prevInputs, gender }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(inputs); // Pass all inputs to the signup function
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sign up <span className='text-blue-500'>Chat APP</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2 text-white'>First Name</label>
                        <input
                            type='text'
                            name='firstName' // Name attribute for correct state update
                            placeholder='Enter first name'
                            className='w-full input input-bordered h-10'
                            value={inputs.firstName}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className='label p-2 text-white'>Last Name</label>
                        <input
                            type='text'
                            name='lastName' // Name attribute for correct state update
                            placeholder='Enter last name'
                            className='w-full input input-bordered h-10'
                            value={inputs.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className='label p-2 text-white'>Username</label>
                        <input
                            type='text'
                            name='userName' // Corrected from 'username' to 'userName'
                            placeholder='Enter username'
                            className='w-full input input-bordered h-10'
                            value={inputs.userName}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text text-white'>Password</span>
                        </label>
                        <input
                            type='password'
                            name='password' // Name attribute for correct state update
                            placeholder='Enter your password'
                            className='w-full input input-bordered h-10'
                            value={inputs.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text text-white'>Confirm Password</span>
                        </label>
                        <input
                            type='password'
                            name='confirmPassword' // Name attribute for correct state update
                            placeholder='Confirm password'
                            className='w-full input input-bordered h-10'
                            value={inputs.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <GenderCheckBox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

                    <a href='/login' className='text-sm hover:underline text-white hover:text-blue-600 mt-2 inline-block'>
                        Already have an account?
                    </a>

                    <div>
                        <button type='submit' className='btn btn-block btn-sm mt-2' disabled={loading}>
                            {loading ? 'Signing up...' : 'Signup'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signuppage;
