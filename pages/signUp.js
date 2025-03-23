import React from 'react'

function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <div>
            <h3>Registration Form</h3>
            <input placeholder='email'></input>
        </div>
    )
}

export default SignUp
