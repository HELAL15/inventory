
import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    // Use the connection string from environment variables
    const mongoURI = process.env.mongoURI;
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit the application if the connection fails
  }
};

export default connectToMongoDB;
