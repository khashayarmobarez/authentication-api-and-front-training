const { hash } = require("bcryptjs")

const hashPasswords = async (password) => {
    const hashedPassword = await hash(password, 10)
    return hashedPassword;
}


export { hashPasswords }