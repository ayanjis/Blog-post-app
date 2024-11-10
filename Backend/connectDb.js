import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
    console.log('Database connection SUCCESSFULLY!')
  } catch (error) {
    console.log('Database connection FAILL!', error)
  }
}