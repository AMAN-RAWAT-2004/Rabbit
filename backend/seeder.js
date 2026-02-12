const mongoose=require('mongoose')
const dotenv=require('dotenv')
const Product=require('./Models/product')
const User=require('./Models/user')
const Cart=require('./Models/Cart')
const products=require('./data/products')

dotenv.config()

mongoose.connect(process.env.DATABASE)


const seedData=async()=>{
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        const createUser=await User.create({
            name:'Admin User',
            email:'admin@example.com',
            password:'123456',
            role:'admin'
        })

        const userID=createUser._id;

        const sampleProducts=products.map((product)=>{
            return{...product,user:userID}
        })

        await Product.insertMany(sampleProducts)
        console.log('Product data seeded successfully')
        process.exit()
        
    } catch (error) {
        console.error('Error seeding the data',error)
        process.exit(1)
        
    }
}

seedData()