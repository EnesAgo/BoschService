const mongoose = require("mongoose");

require("dotenv").config()
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log("connected");
},e => {
    console.log(e)
})


const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    uuID: String,
})

const CarSchema = new mongoose.Schema({
    carID: String,
    userUUID: String,
    carUUID: String,
    startDate: Date,
    // endDate: Date,
    finished: Boolean,
    bill: Number
})

const CarPropsSchema = new mongoose.Schema({
    Title: String,
    carPropTypeTitle: String,
    bill: Number,
    carID: String,
    carUUID: String,
    carPropUUID: String
})

const CarPropTypeSchema = new mongoose.Schema({
    Title: String,
    bill: Number
})


module.exports = {
    UserSchema: mongoose.model("User", UserSchema),
    CarSchema: mongoose.model("Cars", CarSchema),
    CarPropsSchema: mongoose.model("CarProps", CarPropsSchema),
    CarPropTypeSchema: mongoose.model("CarPropType", CarPropTypeSchema),
}