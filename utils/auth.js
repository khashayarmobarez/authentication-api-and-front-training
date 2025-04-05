const { hash } = require("bcryptjs")

const hashPasswords = async (password) => {
    const hashedPassword = await hash(password, 10)
    return hashedPassword;
}

const verifyPassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword)
    return isMatch;
}


export { hashPasswords, verifyPassword }