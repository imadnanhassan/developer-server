import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function bootstrap() {
  const uri =
    "mongodb+srv://developer:n7VBEgRRz5dI8Gds@cluster0.exf98yb.mongodb.net/developer?retryWrites=true&w=majority&appName=Cluster0 ";
  try {
    await mongoose.connect(uri as string);
    console.log("Connected to MongoDB");
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
