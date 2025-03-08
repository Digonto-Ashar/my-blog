import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    index: true, // Add index
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  }
});

// Add compound index (optional)
userSchema.index({ username: 1 }, { unique: true, collation: { 
  locale: 'en', 
  strength: 2 // Case-insensitive
}});
export default mongoose.model("User", userSchema);
