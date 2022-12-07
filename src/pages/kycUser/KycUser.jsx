import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { fetchData } from '../../api/useGetCountry';
import { FaBeer, FaClosedCaptioning, FaExclamationCircle, FaWindowClose } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import useKycUser, { uploadImage } from './useKycUser';
import { permissionKyc } from './../../utils/permission';
import { styleGlobal } from '../../utils/styleGloba';
import { Link } from 'react-router-dom';

const KycUser = () => {

    const [countryState, setCountryState] = useState({
        loading: false,
        countries: [],
        errorMessage: "",
    });

    const { doSubmit, alert, alertColor, permission, issSendData } = useKycUser();

    const handleSubmit = () => {
        const card_front = imgCardFront.url;
        const card_back = imgCardBack.url;
        const image_face = avatar.url;
        const image_ssn = imgSSN.url;
        const image_drive = imgLicense.url;
        const ein_image = imgEIN.url;
        const image_passport = imgPassport.url;
        const codeFront = imgCardFront.public_id;
        const codeBack = imgCardBack.public_id;
        const codeFace = avatar.public_id;
        const codeLicense = imgLicense.public_id;
        const codePassport = imgPassport.public_id;
        const codeSSN = imgSSN.public_id;
        const codeEIN = imgEIN.public_id;
        const fullname = fullName;
        const phonenumber = phoneNumber;
        const card_id = cardNumber;
        const ssn_id = ssn;
        const ein_id = ein;
        const _user = localStorage.getItem("_user");
        const user_id = JSON.parse(_user).user_id;
        const birthday = dateOfBirth;
        const country = selectedCountry;
        // card_front,
        //     card_back,
        //     image_face,
        //     image_ssn,
        //     image_drive,
        //     ein_image,
        //     image_passport,
        //     codeFront,
        //     codeBack,
        //     codeFace,
        //     codeLicense,
        //     codePassport,
        //     codeSSN,
        //     codeEIN,
        //     fullname,
        //     phonenumber,
        //     card_id,
        //     ssn_id,
        //     ein_id,

        doSubmit({
            card_front,
            card_back,
            image_face,
            image_ssn,
            image_drive,
            ein_image,
            image_passport,
            codeFront,
            codeBack,
            codeFace,
            codeLicense,
            codePassport,
            codeSSN,
            codeEIN,
            fullname,
            phonenumber,
            card_id,
            ssn_id,
            ein_id,
            user_id,
            address,
            birthday,
            country
        });
    }

    useEffect(() => {
        fetchData(countryState, setCountryState);
    }, []);

    const { loading, errorMessage, countries } = countryState;

    const [selectedCountry, setSelectedCountry] = useState('');

    const [fullName, setFullName] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [ssn, setSSN] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [ein, setEIN] = useState('');
    const [avatar, setAvatar] = useState({
        url: '',
        public_id: ''
    });

    const [imgCardFront, setImgCardFront] = useState({
        url: '',
        public_id: ''
    });
    const [imgCardBack, setImgCardBack] = useState({
        url: '',
        public_id: ''
    });
    const [imgLicense, setImgLicense] = useState({
        url: '',
        public_id: ''
    });
    const [imgPassport, setImgPassport] = useState({
        url: '',
        public_id: ''
    });
    const [imgSSN, setImgSSN] = useState({
        url: '',
        public_id: ''
    });
    const [imgEIN, setImgEIN] = useState({
        url: '',
        public_id: ''
    });

    const uploadImageFront = e => {
        const files = e.target.files[0];
        uploadImage(files, setImgCardFront)
    }

    const uploadImageBack = e => {
        const files = e.target.files[0];
        uploadImage(files, setImgCardBack)
    }

    const uploadImageLicenseDriver = e => {
        const files = e.target.files[0];
        uploadImage(files, setImgLicense)
    }

    const uploadPassport = e => {
        const files = e.target.files[0];
        uploadImage(files, setImgPassport)
    }

    const uploadSSN = e => {
        const files = e.target.files[0];
        uploadImage(files, setImgSSN)
    }

    const uploadEIN = e => {
        const files = e.target.files[0];
        uploadImage(files, setImgEIN)
    }
    const uploadImageAvatar = e => {
        const files = e.target.files[0];
        uploadImage(files, setAvatar)
    }

    const _handleVerify = () => {
        const urlFront = imgCardFront.url;
        const urlBack = imgCardBack.url;
        const urlLicense = imgLicense.url;
        const urlPassport = imgPassport.url;
        const urlSSN = imgSSN.url;
        const urlEIN = imgEIN.url;
        const idImageFront = imgCardFront.public_id;
        const idImageBack = imgCardBack.public_id;
        const idImageLicense = imgLicense.public_id;
        const idImagePassport = imgPassport.public_id;
        const idImageSSN = imgSSN.public_id;
        const idImageEIN = imgEIN.public_id;
    }

    const handleChangeName = e => {
        setFullName(e.target.value);
    }
    const handlePhoneNumber = e => {
        setphoneNumber(e.target.value);
    }
    const handleCardNumber = e => {
        setCardNumber(e.target.value);
    }
    const handleDateOfBirth = e => {
        setDateOfBirth(e.target.value);
    }
    const handleAddress = e => {
        setAddress(e.target.value);
    }
    const handleSSNNumber = e => {
        setSSN(e.target.value);
    }
    const handleEIN = e => {
        setEIN(e.target.value);
    }

    if (issSendData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="p-4 rounded shadow-lg ring ring-indigo-600/50">
                    <div className="flex flex-col items-center space-y-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h1 className="text-4xl font-bold">Thank You !</h1>
                        <p>Thank you for your submit! We will respond to you as soon as possible.</p>
                        <Link to='/home'
                            className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" strokeWidth="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                            </svg>
                            <span className="text-sm font-medium">
                                Home
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            {
                permission === permissionKyc.nonKyc ? (
                    <section className='flex justify-center'>
                        <div className="bg-white shadow h-full pb-20 mx-5 my-20 sm:w-full lg:mx-auto w-4/6" style={{ width: '60%' }}>
                            <div className="boxHeader h-20 border text-white p-2 rounded h-16" style={{ background: styleGlobal.backgroundColor2 }}>
                                <p className='p-0 m-0'>  Identity Detail</p>
                            </div>
                            {
                                alert ? (
                                    <div className="notificat flex justify-center">
                                        {alertColor === 'red' ? (<p className={`text-center bg-red-500 p-[1px] min-w-[25%] rounded`}>{alert}</p>)
                                            : <p className={`text-center bg-green-500 p-[1px] min-w-[25%] rounded`}>{alert}</p>}
                                    </div>
                                ) : null
                            }
                            {/* Main box */}
                            <div className="flex justify-start items-center pl-5 mt-3">
                                <span className="text-left">
                                    Select country/flag
                                </span>
                            </div>
                            <div className='pl-5'>
                                <select
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                    className="border rounded-sm xs:w-full w-[250px] mt-2"
                                >
                                    <option defaultValue="">--Select Country--</option>
                                    <option value="United State">United State</option>
                                    <option value="VietNam">Viet Nam</option>
                                    {countries.filter((el) => !el.name.common.includes('America') && !el.name.common.includes('United State') && !el.name.common.includes('Vietnam')).map((item) => {
                                        return (
                                            <option key={uuidv4()} value={item.name.common}>
                                                {item.name.common}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            {
                                selectedCountry && selectedCountry !== '' ? (
                                    <div className="flex justify-start items-center pl-5 mt-5">
                                        <FaExclamationCircle color='red' />
                                        <p className="text-left pl-2 m-0">
                                            Please upload your identify
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex justify-start items-center pl-5 mt-2">
                                        <FaExclamationCircle color='red' />
                                        <p className="text-left pl-2 m-0">
                                            Please choose your country
                                        </p>
                                    </div>
                                )
                            }
                            {/* Box */}

                            <div className="ml-5 border-t mt-3">

                            </div>
                            {
                                selectedCountry && selectedCountry !== '' ? (
                                    <>
                                        <div className="enterInfor flex-wrap flex flex-w mt-3">
                                            <div className="leftBox">
                                                <div className="flex flex-col pl-5 my-2">
                                                    <span className="text-left">
                                                        Full name
                                                    </span>
                                                    <input className='border rounded w-[250px] mt-2' onChange={handleChangeName} />
                                                </div>

                                                <div className="flex flex-col pl-5 my-2">
                                                    <span className="text-left p-0">
                                                        Phone Number
                                                    </span>
                                                    <input className='border rounded xs:w-full w-[250px] mt-2' onChange={handlePhoneNumber} />
                                                </div>

                                                <div className="flex flex-col pl-5 my-2">
                                                    <span className="text-left p-0">
                                                        Identify Card Number
                                                    </span>
                                                    <input className='border rounded xs:w-full w-[250px] mt-2' onChange={handleCardNumber} />
                                                </div>

                                                <div className="flex flex-col pl-5 my-2">
                                                    <span className="text-left">
                                                        Date Of Birth
                                                    </span>
                                                    <input className='border rounded w-[250px] mt-2' type="date" onChange={handleDateOfBirth} />
                                                </div>
                                            </div>
                                            {/* right box */}
                                            <div className="rightBox">
                                                <div className="flex flex-col pl-5 my-2">
                                                    <span className="text-left">
                                                        Address
                                                    </span>
                                                    <input className='border rounded w-[250px] mt-2' onChange={handleAddress} />
                                                </div>
                                                {
                                                    selectedCountry && (selectedCountry.includes('America') || selectedCountry.includes('United State')) ? (
                                                        <>
                                                            <div className="flex flex-col pl-5 my-2">
                                                                <span className="text-left p-0">
                                                                    SSN Number
                                                                </span>
                                                                <input className='border rounded xs:w-full w-[250px] mt-2' onChange={handleSSNNumber} />
                                                            </div>

                                                            <div className="flex flex-col pl-5 my-2">
                                                                <span className="text-left p-0">
                                                                    Employer Identification Number
                                                                </span>
                                                                <input className='border rounded xs:w-full w-[250px] mt-2' onChange={handleEIN} />
                                                            </div>
                                                        </>
                                                    ) : null
                                                }
                                            </div>
                                            <div className="avatar">
                                                <div className="my-2 mx-3 max-w-xs sm:w-xs rounded-lg">
                                                    <div className="m-4">
                                                        <label className="inline-block mb-2 text-gray-500">Photo Face of Person</label>
                                                        <div className="flex items-center justify-center w-full">
                                                            <label
                                                                className="flex flex-col w-32 h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                                <div className={`flex flex-col items-center justify-center w-full h-full ${avatar.url !== '' ? 'pt-0 relative' : 'pt-7'}`}>
                                                                    {
                                                                        avatar.url !== '' ?
                                                                            (
                                                                                <>
                                                                                    <AiOutlineClose className='absolute top-1 right-1' />
                                                                                    <img className='object-cover w-32 h-32' src={avatar.url} />
                                                                                </>
                                                                            )
                                                                            : (
                                                                                <>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                                                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                                                    </svg>
                                                                                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                                                        Attach a image</p>
                                                                                </>
                                                                            )
                                                                    }
                                                                </div>
                                                                <input type="file" className="opacity-0" onChange={uploadImageAvatar} />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* form kyc */}

                                        <div className="flex justify-center flex-wrap mt-8">
                                            {
                                                selectedCountry && selectedCountry !== '' ? (
                                                    <>
                                                        <div className="my-2 mx-3 max-w-xs sm:w-xs rounded-lg shadow-xl bg-gray-50">
                                                            <div className="m-4">
                                                                <label className="inline-block mb-2 text-gray-500">Identity Card Front</label>
                                                                <div className="flex items-center justify-center w-full">
                                                                    <label
                                                                        className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                                        <div className={`flex flex-col items-center justify-center w-full h-full ${imgCardFront.url !== '' ? 'pt-0 relative' : 'pt-7'}`}>
                                                                            {
                                                                                imgCardFront.url !== '' ?
                                                                                    (
                                                                                        <>
                                                                                            <AiOutlineClose className='absolute top-1 right-1' />
                                                                                            <img className='object-cover w-full h-full' src={imgCardFront.url} />
                                                                                        </>
                                                                                    )
                                                                                    : (
                                                                                        <>
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                                                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                                                            </svg>
                                                                                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                                                                Attach a image</p>
                                                                                        </>
                                                                                    )
                                                                            }
                                                                        </div>
                                                                        <input type="file" className="opacity-0" onChange={uploadImageFront} />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="my-2 mx-3 max-w-xs sm:w-xs rounded-lg shadow-xl bg-gray-50">
                                                            <div className="m-4">
                                                                <label className="inline-block mb-2 text-gray-500">Identity Card Back</label>
                                                                <div className="flex items-center justify-center w-full">
                                                                    <label
                                                                        className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                                        <div className={`flex flex-col items-center justify-center w-full h-full ${imgCardBack.url !== '' ? 'pt-0' : 'pt-7'}`}>
                                                                            {
                                                                                imgCardBack.url !== '' ?
                                                                                    (
                                                                                        <>
                                                                                            <img className='object-cover w-full h-full' src={imgCardBack.url} />
                                                                                        </>
                                                                                    )
                                                                                    : (
                                                                                        <>
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                                                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                                                            </svg>
                                                                                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                                                                Attach a image</p>
                                                                                        </>
                                                                                    )
                                                                            }
                                                                        </div>
                                                                        <input type="file" className="opacity-0" onChange={uploadImageBack} />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="my-2 mx-3 max-w-xs sm:w-xs rounded-lg shadow-xl bg-gray-50">
                                                            <div className="m-4">
                                                                <label className="inline-block mb-2 text-gray-500">License Photo</label>
                                                                <div className="flex items-center justify-center w-full">
                                                                    <label
                                                                        className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                                        <div className={`flex flex-col items-center justify-center w-full h-full ${imgLicense.url !== '' ? 'pt-0' : 'pt-7'}`}>
                                                                            {
                                                                                imgLicense.url !== '' ?
                                                                                    (
                                                                                        <>
                                                                                            <img className='object-cover w-full h-full' src={imgLicense.url} />
                                                                                        </>
                                                                                    )
                                                                                    : (
                                                                                        <>
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                                                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                                                            </svg>
                                                                                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                                                                Attach a image</p>
                                                                                        </>
                                                                                    )
                                                                            }
                                                                        </div>
                                                                        <input type="file" className="opacity-0" onChange={uploadImageLicenseDriver} />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : null
                                            }
                                        </div>
                                        <div className="flex justify-center flex-wrap mt-8">

                                            {
                                                selectedCountry && (selectedCountry.includes('America') || selectedCountry.includes('United State')) ? (
                                                    <>
                                                        <div className="my-2 mx-3 max-w-xs sm:w-xs rounded-lg shadow-xl bg-gray-50">
                                                            <div className="m-4">
                                                                <label className="inline-block mb-2 text-gray-500">Passport Photo</label>
                                                                <div className="flex items-center justify-center w-full">
                                                                    <label
                                                                        className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                                        <div className={`flex flex-col items-center justify-center w-full h-full ${imgPassport.url !== '' ? 'pt-0' : 'pt-7'}`}>
                                                                            {
                                                                                imgPassport.url !== '' ?
                                                                                    (
                                                                                        <>
                                                                                            <img className='object-cover w-full h-full' src={imgPassport.url} />
                                                                                        </>
                                                                                    )
                                                                                    : (
                                                                                        <>
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                                                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                                                            </svg>
                                                                                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                                                                Attach a image</p>
                                                                                        </>
                                                                                    )
                                                                            }
                                                                        </div>
                                                                        <input type="file" className="opacity-0" onChange={uploadPassport} />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="my-2 mx-3 max-w-xs sm:w-xs rounded-lg shadow-xl bg-gray-50">
                                                            <div className="m-4">
                                                                <label className="inline-block mb-2 text-gray-500">SSN Photos</label>
                                                                <div className="flex items-center justify-center w-full">
                                                                    <label
                                                                        className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                                        <div className={`flex flex-col items-center justify-center w-full h-full ${imgSSN.url !== '' ? 'pt-0' : 'pt-7'}`}>
                                                                            {
                                                                                imgSSN.url !== '' ?
                                                                                    (
                                                                                        <>
                                                                                            <img className='object-cover w-full h-full' src={imgSSN.url} />
                                                                                        </>
                                                                                    )
                                                                                    : (
                                                                                        <>
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                                                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                                                            </svg>
                                                                                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                                                                Attach a image</p>
                                                                                        </>
                                                                                    )
                                                                            }
                                                                        </div>
                                                                        <input type="file" className="opacity-0" onChange={uploadSSN} />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="my-2 mx-3 max-w-xs sm:w-xs rounded-lg shadow-xl bg-gray-50">
                                                            <div className="m-4">
                                                                <label className="inline-block mb-2 text-gray-500">EIN</label>
                                                                <div className="flex items-center justify-center w-full">
                                                                    <label
                                                                        className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                                        <div className={`flex flex-col items-center justify-center w-full h-full ${imgEIN.url !== '' ? 'pt-0' : 'pt-7'}`}>
                                                                            {
                                                                                imgEIN.url !== '' ?
                                                                                    (
                                                                                        <>
                                                                                            <img className='object-cover w-full h-full' src={imgEIN.url} />
                                                                                        </>
                                                                                    )
                                                                                    : (
                                                                                        <>
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                                                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                                                            </svg>
                                                                                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                                                                Attach a image</p>
                                                                                        </>
                                                                                    )
                                                                            }
                                                                        </div>
                                                                        <input type="file" className="opacity-0" onChange={uploadEIN} />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : null
                                            }
                                        </div>
                                    </>
                                ) : null
                            }
                            {
                                selectedCountry && selectedCountry !== '' ? (
                                    <div className='text-center mt-5'>
                                        <button className=' bg-purleCommon hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleSubmit}>Send Information</button>
                                    </div>
                                ) : null
                            }
                        </div>
                    </section >
                ) : (
                    <>
                        <section className='flex justify-center'>
                            <div className="bg-white shadow h-full pb-20 mx-5 my-20 sm:w-full lg:mx-auto w-4/6" style={{ width: '60%' }}>
                                <div className="w-11/12 lg:w-2/6 mx-auto py-20">
                                    <div className="bg-gray-200 dark:bg-gray-700 h-1 flex items-center justify-between">
                                        <div className="w-1/3 bg-indigo-700 h-1 flex items-center">
                                            <div className="bg-indigo-700 h-6 w-6 rounded-full shadow flex items-center justify-center">
                                                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/thin_with_steps-svg1.svg" alt="check" />
                                            </div>
                                        </div>
                                        <div className="w-1/3 flex justify-between bg-indigo-700 h-1 items-center relative">
                                            <div className="absolute right-0 -mr-2">
                                                <div className="relative bg-white dark:bg-gray-800 shadow-lg px-2 py-1 rounded mt-16 -mr-12">
                                                    <svg className="absolute top-0 -mt-1 w-full right-0 left-0 text-white dark:text-gray-800" width="16px" height="8px" viewBox="0 0 16 8" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                            <g id="Progress-Bars" transform="translate(-322.000000, -198.000000)" fill="currentColor">
                                                                <g id="Group-4" transform="translate(310.000000, 198.000000)">
                                                                    <polygon id="Triangle" points="20 0 28 8 12 8"></polygon>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="bg-indigo-700 h-6 w-6 rounded-full shadow flex items-center justify-center -ml-2">
                                                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/thin_with_steps-svg1.svg" alt="check" />
                                            </div>
                                            {
                                                permission === permissionKyc.approve ? (
                                                    <div className="bg-white dark:bg-gray-700 h-6 w-6 rounded-full shadow flex items-center justify-center -mr-3 relative">
                                                        <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/thin_with_steps-svg1.svg" alt="check" />
                                                    </div>
                                                ) : (
                                                    <div className="bg-white dark:bg-gray-700 h-6 w-6 rounded-full shadow flex items-center justify-center -mr-3 relative">
                                                        <div className="h-3 w-3 bg-indigo-700 rounded-full"></div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className="w-1/3 flex justify-end">
                                            {
                                                permission === permissionKyc.approve ? (
                                                    <div className="bg-indigo-700 h-6 w-6 rounded-full shadow flex items-center justify-center -ml-2">
                                                        <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/thin_with_steps-svg1.svg" alt="check" />
                                                    </div>
                                                ) : (
                                                    <div className="bg-white dark:bg-gray-700 h-6 w-6 rounded-full shadow"></div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <p className='text-center text-purleCommon font-semibold'>{permission === permissionKyc.approve ? 'Your account have been appoval' : 'Your submission is pending approval!'}</p>
                            </div>
                        </section>
                    </>
                )
            }
        </>
    )
}

export default KycUser
