import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function Login() {

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

    const LoginHandler = async () => {
        try {
            const res = await fetch('/api/auth/login', {
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
            } else {
            console.error('Login failed:', data.message);
            alert(data.message || 'Login failed');
            }
        } catch (error) {
          console.error('Error during login:', error);
          alert('An error occurred during login');
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
            onClick={LoginHandler}
            >
                login
            </button>
        </div>
    )
}

export default Login
