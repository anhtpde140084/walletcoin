import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { styleGlobal } from '../../utils/styleGloba'
import useProfile from './useProfile';
import { Link } from 'react-router-dom';
const Profile = () => {

    const { profile } = useProfile();

    return (
        <div className='w-full container py-5'>
            <div className="boxHeader h-20 border text-white p-2 rounded h-16" style={{ background: styleGlobal.backgroundColor2 }}>
                <p className='p-0 m-0'> Customer Information: </p>
            </div>
            <div className="w-full mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
                <header className="px-5 py-4 bg-slate-200 border-b border-gray-100">
                    <h5 className="font-semibold text-gray-800">About account: {profile && profile.data.user.email}</h5>
                </header>
                <div className="p-3 flex">
                    <div className="flex flex-col flex-1 border p-2">
                        <div className="rowInfor flex border-b my-2">
                            <p className='w-[40%]'>Account Created</p>
                            <p>{profile && profile.data ?
                                moment.utc(profile.data.user.createdAt).local().startOf('seconds').fromNow()
                                : ''
                            }</p>
                        </div>
                        <div className="rowInfor flex border-b my-2">
                            <p className='w-[40%]'>Phone Number</p>
                            <p>{profile && profile.data ?
                                profile.data.kyc.phonenumber
                                : ''
                            }</p>
                        </div>
                        <div className="rowInfor flex border-b my-2">
                            <p className='w-[40%]'>Status Confirm Account</p>
                            {
                                profile && profile.data && profile.data.kyc.status === 1 ?
                                    <p className='bg-yellow-300 px-1 rounded'>
                                        Pending Review
                                    </p>

                                    : profile && profile.data && profile.data.kyc.status === 2 ?
                                        <p className='bg-green-300 px-1 rounded'>
                                            Approval
                                        </p>
                                        :
                                        <div className='flex'>
                                            <p className='bg-red-300 px-1 rounded'>
                                                Not KYC
                                            </p>
                                            <Link to="/kyc" className='pl-2'>
                                                Go to KYC
                                            </Link>
                                        </div>
                            }
                        </div>
                        <div className="rowInfor flex border-b my-2">
                            <p className='w-[40%]'>Other</p>
                            <p></p>
                        </div>
                    </div>
                    <div className="right_hand flex-1">
                        <p className='text-center font-semibold px-2'>Feed back: {profile && profile.data.user.email}</p>
                        <p className='text-center font-semibold'>0</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile