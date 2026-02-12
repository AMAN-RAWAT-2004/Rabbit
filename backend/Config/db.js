const mongoose=require('mongoose')

const connectDB=async ()=>{

    try{
        await mongoose.connect(process.env.DATABASE)
        console.log('MONGODB  CONNECTED SUCCESSFULLY')
    }
    catch(err){
        console.log('MONGODB CONNECTION FAILED',err)
        process.exit(1)
    }
}


module.exports =connectDB