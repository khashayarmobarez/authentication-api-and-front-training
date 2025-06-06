import { verifyToken } from '@/utils/auth';
import { redirect } from 'next/navigation';
import React from 'react';

const Dashboard = () => {
    return (
        <div>
            Dashboard
        </div>
    );
};

export default Dashboard;

export async function getServerSideProps(context) {
    const { token } = context.req.cookies;
    const secretKey = process.env.SECRET_KEY

    const result = verifyToken(token, secretKey)

    if(!result) return {
        redirect: { destination: '/login', permanent: false}
    }

    return {props: { result } }
}