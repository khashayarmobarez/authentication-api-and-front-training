
export default async function handler(req, res) {
    if(req.method !== 'GET') {
            return res.status(405).json({ message: 'Method not allowed' });
        };

    const { token } = req.cookies;
    console.log(token);
    res.json({ message: 'User data' });
}