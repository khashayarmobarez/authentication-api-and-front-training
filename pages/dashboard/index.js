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
    console.log(token)

    return {props: {} }
}