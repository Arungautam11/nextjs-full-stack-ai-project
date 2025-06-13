import mongoose, {Schema, model, models} from "mongoose";
import bcrypt from "bcryptjs";


// define data types for the user model
export interface IUser {
    email: string;
    password: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

// create the user model
const userSchema = new Schema<IUser>(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

// create pre hooks for the user model
userSchema.pre("save", async function (next) {
    if  (this.isModified("password")){
        // bcrypt the password before saving, take 10 rounds
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})


const User = models?.User || model<IUser>("User", userSchema);

// export the user for next use
export default User;