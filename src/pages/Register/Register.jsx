import React from 'react'
import GoogleLoginButton from '../../components/common/googleLoginButton'
import { styleGlobal } from '../../utils/styleGloba'
import { Link } from 'react-router-dom';
import useRegister from './useRegister';
import { useForm } from 'react-hook-form';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { doSubmit, error } = useRegister();

    register.
    return (
        <div className="container h-[600px] flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 borde">
            <div className="w-full max-w-md space-y-8 max-w-[20rem]">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-purple-900">Sign up new account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or if you have account already,
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500"> Sign In</Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(doSubmit)}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div className='my-2'>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" required {...register("email")} name="email" type="email" className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div className='my-2'>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" required {...register("password")} name="password" type="password" className="relative rounded block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
                        </div>
                        <div className='my-2'>
                            <label htmlFor="password" className="sr-only">Confirm Password</label>
                            <input id="confirm-password" required {...register("confirm-password")} name="confirmPassword" type="password" autoComplete="current-password" className="relative rounded block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Confirm Password" />
                        </div>
                        <div className='my-2'>
                            <input id="referral-code" name="referralCode" required {...register("referral-code")} type="text" className="relative rounded block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Referral Code (Optional)" />
                        </div>
                    </div>

                    <div cl>
                        <button type="submit" className="group relative flex w-full justify-center self-center rounded-md border border-transparen py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" style={{ background: styleGlobal.backgroundColor2, margin: '0 auto' }}>
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className='w-full'>
                    <GoogleLoginButton />
                </div>
            </div>
        </div>
    )
}

export default Register