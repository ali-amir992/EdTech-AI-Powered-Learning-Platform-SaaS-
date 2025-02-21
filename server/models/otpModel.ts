import mongoose, { Schema, Document, Model } from "mongoose";
import mailSender from '@utils/mailSender'
import emailTemplate from '@utils/emailTemplate';

interface IOTP extends Document {
    email: string;
    otp: string;
    createdAt: Date;
}
const OTPSchema: Schema<IOTP> = new Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60 * 1000, //5 mins
    },

});

async function sendVerificationEmail(email : string, otp: string) {
    try {

        const mailResponse = await mailSender(email,
            "Verification Email from NotesHive",
            emailTemplate(otp))
        console.log("Email sent successfully", mailResponse.response)

    } catch (error) {
        console.log("error occured while sending mails", error)
        throw error
    }
}

OTPSchema.pre("save", async function (next) {
    console.log("New document saved to database");
    // Only send an email when a new document is created
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next()
})

const OTPModel: Model<IOTP> = mongoose.model<IOTP>("OTP", OTPSchema);
export default OTPModel;