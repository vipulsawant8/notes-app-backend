import { Schema, model } from "mongoose";

const otpSchema = new Schema({
    
    email: {
        type: String,
        require: true,
        lowercase: true,
        trim: true
    },
    otp: {
        type: String,
        require: true
    },
    expiresAt: {
        type: Date,
        require: true
    },
    verified: {
        type: Boolean,
        require: false,
        default: false
    },
    verifiedAt: {
        type: Date,
        require: false,
        default: null
    },
    attempts: {
        type: Number,
        require: false,
        default: 0
    },
    // used: {
    //     type: Boolean,
    //     default: false
    // }
}, {
    timestamps: true
});

const Otp = model("Otp", otpSchema);

export default Otp;