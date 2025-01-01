import bcryptjs from 'bcryptjs'
const EncryptPassword =async (password)=>{
    return await bcryptjs.hash(password,10)
}

const VerifyPassword = async (password,DBpassword)=>{
    return await bcryptjs.compare(password,DBpassword)
}

export {EncryptPassword, VerifyPassword }