const { serialize } = require("cookie");

async function handler(req, res) {
    if(req.method !== 'GET') return;

    const serialize = serialize('token', '', {
        path: '/',
        maxAge: -1, // Set to -1 to delete the cookie
    }) 

    res.status(200).setHeader('Set-Cookie', serialize).json({ status: 'success', message: 'Logged out successfully' });
}