import { Schema, model } from "mongoose";

const otpSchema = new Schema({
    
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    otp: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: {
            expires: 0
        }
    },
    verified: {
        type: Boolean,
        required: false,
        default: false
    },
    verifiedAt: {
        type: Date,
        required: false,
        default: null
    },
    verifyAttempts: {
        type: Number,
        required: false,
        default: 0
    },
    lockUntil: {
        type: Date
    },
    resendAttemps:{
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

const Otp = model("Otp", otpSchema);

export default Otp;