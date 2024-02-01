import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const studentSchema = mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    email:{
        type : String,
        required: true,
        unique : true
    },
    password:{
        type : String,
        required: true
    },
    studentId:{
        type : String,
        required: true
    },
    studentDepartment:{
        type : String,
        required: true
    },
    phone:{
        type : String,
        required: true
    },
    isAdmin:{
        type : Boolean,
        required: true,
        default: false
    }
}, {
    timestamps : true
})

studentSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

studentSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

const Student = mongoose.model('Student',studentSchema)

export default Student