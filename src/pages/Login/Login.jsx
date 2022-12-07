import React from 'react';
import PropTypes from 'prop-types';
import GoogleLoginButton from '../../components/common/googleLoginButton';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { login } from './useLogin';
import { useState } from 'react';
import { validateEmail } from './../../utils/rules/commonValidate';
import { styleGlobal } from '../../utils/styleGloba';

const Login = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const validateForm = (data) => {
        if (data.email === '' || data.password === '') {
            setError('Please enter your email and password');
            return false;
        } else if (!validateEmail(data.email)) {
            setError('Email is invalid!')
            return false;
        }
        setError('');
        return true;
    }

    const onSubmit = async data => {
        if (validateForm(data)) {
            const isLogin = await login(data, setError);
            if (isLogin.success && !error) {
                navigate('/')
            }
        }
    }

    return (
        <div className="container h-[600px] flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-[20rem] space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-purple-900">Sign in to your account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or if you don't have account already,
                        <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500"> Sign Up</Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div className='my-2'>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" required {...register("email")} name="email" type="email" autoComplete="email" className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div className='my-2'>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" required {...register("password")} name="password" type="password" autoComplete="current-password" className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>
                    <div className="errorMsg">
                        <span className='text-red-500 text-[14px] text-center'>{error}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative flex w-full justify-center self-center rounded-md border border-transparen py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" style={{ background: styleGlobal.backgroundColor2, margin: '0 auto' }}>
                            Sign in
                        </button>
                    </div>
                </form>
                <div className='w-full'>
                    <GoogleLoginButton />
                </div>
            </div>
        </div>
    );
};

export default Login;