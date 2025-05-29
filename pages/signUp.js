import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function SignUp() {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetch('/api/user')
        .then((res) => res.json())
        .then((data) => {
            if(data.status === 'success') {
                // router.replace('/dashboard');
                // the below button is better because it stop any error accuring
                window.location.href = "/dashboard"
            } else {
                console.log('User not logged in');
            }
        })
    }
    ,[])

    const signUpHandler = async () => {
        const res = await fetch('/api/auth/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await res.json();
        if(data.status === 'success') {
            router.push('/login');
        }
    }

    return (
        <div>
            <h3>Registration Form</h3>
            <input 
                placeholder='email'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                placeholder='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
            onClick={signUpHandler}
            >
                Sign up
            </button>
        </div>
    )
}

export default SignUp
