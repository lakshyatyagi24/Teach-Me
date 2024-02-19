import mongoose from 'mongoose'

const teacherSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true],
    },
    teacherId:{
        type : String,
        required: true,
        unique : true
    },
    teacherDepartment:{
        type : String,
        required: true
    },
    course:{
        type : String,
        required: true
    },
    price:{
        type : String,
        required: true
    },
    grade:{
        type : String,
        required: true
    },
    phone:{
        type : String,
        required: true
    }
}, {
    timestamps : true
})

/*teacherSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

teacherSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})*/

const Teacher = mongoose.model('Teacher',teacherSchema)

export default Teacher