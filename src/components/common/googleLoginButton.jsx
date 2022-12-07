import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import Axios from 'axios';

const GoogleLoginButton = () => {

    const login = useGoogleLogin({
        onSuccess: async codeResponse => {
            try {
                const data = await Axios.get('https://www.googleapis.com/oauth2/v3/userinfo',
                    { headers: { "Authorization": `Bearer ${codeResponse.access_token}` } }
                )
            } catch (error) {

            }
        },
    });
    return (
        <button onClick={() => login()} className="flex w-full justify-center items-center bg-transparent hover:bg-blue-500 text-gray-700 font-semibold hover:text-blue py-2 px-4 border border-blue-500 hover:border-transparent rounded" href="/users/googleauth" role="button">
            <img width="20px" className='mr-2' alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
            Login with Google
        </button>
    )
}

export default GoogleLoginButton
