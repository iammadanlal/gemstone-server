const mongoose = require('mongoose');
const brcypt = require('bcrypt');
const { isEmail, isNumeric } = require('validator');

const userSchema = new mongoose.Schema({
    name: { type: String },
    phone_number: { 
        type: String,
        required: [true, 'Please enter mobile number'],
        unique: true,
        validate: [isNumeric, 'Please enter only numbers']
    },
    email:{
        type: String,
        required: [true,'Please enter an email'],
        unique: true,
        lowercase: true,
        validate:[isEmail,"Please enter a valid email"]
    },
    password:{
        type: String,
        required: [true,'Please enter a password'],
        minlength: [8,'Minimum length is 8 characters']
    },
    token: { type: String }
});


//Hashing password
userSchema.pre('save', async function(next){
    const salt = await brcypt.genSalt();
    this.password = await brcypt.hash(this.password, salt);
    next();
});

//Static method to login user
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth = await brcypt.compare(password,user.password);
        if(auth){
            return user;
        }
       throw Error('Incorrect Password');
    }
    throw Error('Incorrect email');
}


const User = mongoose.model('User', userSchema);
module.exports = User;