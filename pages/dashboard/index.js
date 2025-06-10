import { verifyToken } from '@/utils/auth';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';

const Dashboard = ({result}) => {

    const [name, setName] = useState('');
    const [lastName, setLastname] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        const res = await fetch('/api/update-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, lastName, password }),
        });
        const data = await res.json();
        console.log(data);
    }  

    return (
        <div>
            <p>your email is {result && result.email}</p>
            <h3>complete your profile:</h3>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Lastname"
                value={lastName}
                onChange={(e) => setLastname(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={submitHandler}>Submit</button>
            <p>Note: You can only update your profile once.</p>
        </div>
    );
};

export default Dashboard;

export async function getServerSideProps(context) {
    const { token } = context.req.cookies;
    const secretKey = process.env.SECRET_KEY

    const result = verifyToken(token, secretKey)

    if(!result || result.status === 'failed') return {
        redirect: { destination: '/login', permanent: false }
    }

    return {props: { result } }
}