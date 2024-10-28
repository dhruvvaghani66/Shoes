import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10; // The number of rounds for hashing, higher the number, more secure, but slower
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword;

    } catch (error) {
        console.log(error);
    }
}



export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}