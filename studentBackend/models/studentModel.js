const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    regdNo: { type: String, required: true, unique: true },
    image: { type: String, required: false},
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    category: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    religion: { type: String, required: true },
    cityVillage: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    dist: { type: String, required: true },
    post: { type: String, required: true },
    pinCode: { type: Number, required: true },
    phoneNo: { type: Number, required: true },
    alternativePhoneNo: { type: Number, required: true },
    parentNo: { type: Number, required: true },
    emailId: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    education: { type: String, required: true },
    branch: { type: String, required: true },
    passYear: { type: String, required: true },
    status: { type: String, required: true },
    courseFee: { type: String, required: true }
},{versionKey: false});
studentSchema.index({regdNo: 1}, {unique: true})

const Student = mongoose.model('studentData', studentSchema);
module.exports = Student;
