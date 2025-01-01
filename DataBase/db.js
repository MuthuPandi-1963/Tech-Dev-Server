import mongoose from 'mongoose'
const ConnectDB = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("DataBase Connected SuccessFully");
    }catch(err){
        console.log(err);
        process.exit(1)
    }
}
export default ConnectDB;