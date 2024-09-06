const Student = require('../models/studentModel');

const studentDataInsert = async (req, res) => {
  try {
    const { regdNo, image, firstName, middleName, lastName, gender, dob, category, fatherName, motherName, religion, cityVillage, state, country, dist, post, pinCode, phoneNo, alternativePhoneNo, parentNo, emailId, permanentAddress, education, branch, passYear, status, courseFee } = req.body;

    // if (!req.files || Object.keys(req.files).length === 0) {
    //   return res.status(400).json({ error: 'No Files Uploaded' })
    // }
    // const photo = req.files.image;
    // const imageBuffer = photo.data;

    const student = new Student({
      regdNo, image,
      firstName, middleName, lastName, gender, dob, category, fatherName, motherName, religion, cityVillage, state, country, dist, post, pinCode, phoneNo, alternativePhoneNo, parentNo, emailId, permanentAddress, education, branch, passYear, status, courseFee
    });
    const savedStudent = await student.save();
    // res.json(savedStudent);
    res.status(200).json({
      status: 'Success',
      data: savedStudent,
    });
    // } catch (error) {
    //   console.error('error creating student', error);
    //   res.status(500).json({ message: '' });
    // }
  } catch (error) {
    // Handle unexpected errors
    console.error('Error creating user:', error);
    res.status(500).json({
      status: 500,
      error: 'Internal Server Error',
    });
  }
}

//view
const getAllStudent = async (req, res) => {
  try {
    const studentData = await Student.find();

    if (studentData.length === 0) {
      res.status(404).json({ message: 'Data not Found' });
    } else {
      res.status(200).json({
        message: 'Success',
        data: studentData
      });
    }
  } catch (error) {
    console.error('Error featching data:', error);
    res.status(500).send('Error fetching');
  }
}


const getStudentById = async (req, res) => {
  try {
    const studentId = req.body.Id;
    const studentData = await Student.findById(studentId);

    if (studentData.length === 0) {
      res.status(404).json({ message: 'Student not Found' });
    } else {
      res.status(200).json({
        message: 'Success',
        data: studentData
      });
    }
  } catch (error) {
    console.error('Error featching data:', error);
    res.status(500).send('Error fetching');
  }
}

//update
// const studentUpdate = async (req, res) => {
// const documentId = req.params.id;
// const newfirstName = req.query.firstName;
// const newmiddleName = req.query.middleName;
// const newlastName = req.query.lastName;
// const newgender = req.query.gender;
// const newdob = req.query.dob;
// const newcategory = req.query.category;
// const newfatherName = req.query.fatherName;
// const newmotherName = req.query.motherName;
// const newreligion = req.query.religion;
// const newcityVillage = req.query.cityVillage;
// const newstate = req.query.state;
// const newcountry = req.query.country;
// const newdist = req.query.dist;
// const newpost = req.query.post;
// const newpinCode = req.query.pinCode;
// const newphoneNo = req.query.phoneNo;
// const newalternativePhoneNo = req.query.alternativePhoneNo;
// const newparentNo = req.query.parentNo;
// const newemailId = req.query.emailId;
// const newpermanentAddress = req.query.permanentAddress;
// const neweducation = req.query.education;
// const newbranch = req.query.branch;
// const newpassYear = req.query.passYear;
// const newstatus = req.query.status;
// const newcourseFee = req.query.courseFee;

//   try {
//     const result = await Student.findByIdAndUpdate(documentId, {
//       firstName: newfirstName,
//       middleName: newmiddleName,
//       lastName: newlastName,
//       gender: newgender,
//       dob: newdob,
//       category: newcategory,
//       fatherName: newfatherName,
//       motherName: newmotherName,
//       religion: newreligion,
//       cityVillage: newcityVillage,
//       state: newstate,
//       country: newcountry,
//       dist: newdist,
//       post: newpost,
//       pinCode: newpinCode,
//       phoneNo: newphoneNo,
//       alternativePhoneNo: newalternativePhoneNo,
//       parentNo: newparentNo,
//       emailId: newemailId,
//       permanentAddress: newpermanentAddress,
//       education: neweducation,
//       branch: newbranch,
//       passYear: newpassYear,
//       status: newstatus,
//       courseFee: newcourseFee
//     },
//       { new: true }
//     )
//     if (!result) {
//       res.status(404).json({ message: 'Data not found' });
//     } else {
//       res.json({ message: 'Data updated sucessfully', updatedDocument: result })
//     }
//   } catch (error) {
//     console.error('Data Updated Error', error);
//     res.status(600).send('Data Updated Error');
//   }
// }

const updateStudent = async (req, res) => {
  try {
    const { id, data } = req.body;
    const updateStudent = await Student.findByIdAndUpdate(id, data, { new: true });
    if (!updateStudent) {
      return res.status(404).json({ status: 404, message: 'user not found' })
    }
    res.status(200).json({ status: 200, message: 'Successfully', data: updateStudent })
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message })
  }
}

//count
const studentCount = async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.json({ count })
  } catch (error) {
    console.error('Error counting data', error);
    res.status(700).send('Error counting data');
  }
}

//filterstudent bach
const studentFilterByEducation = async (req, res) => {
  try {
    const edu = req.body.education;
    const studentData = await Student.find({ education: edu });
    res.status(200).json({
      message: 'student success',
      data: studentData
    })
  } catch (error) {
    console.error('Error counting data', error);
    res.status(700).send('Error counting data');
  }
}

//delete
const studentDelete = async (req, res) => {
  const documentid = req.body.Id;
  try {
    const result = await Student.findByIdAndDelete(documentid);
    if (!result) {
      res.status(404).json({ message: 'Data not found' });
    } else {
      res.json({ message: 'Data deleted successfully' });
    }
  } catch (error) {
    console.error('Data not found', error);
    res.json(500).send('Data Deleted Successfully');
  }
}

//export
const studentExport = async (req, res) => {
  try {
    const allData = await Student.find();
    if (allData.length === 0) {
      res.status(404).json({ message: 'No data found' });
      return;
    }
  } catch (error) {
    console.error('Error exporting data: ', error);
    res.status(500).send('Error exporting data');
  }
}

const studentCountByEducation = async (req, res) => {
  try {
    const allData = await Student.find();
    if (allData.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }

    const studentCount = {};

    allData.forEach(student => {
      const branch = student.branch;
      if (!studentCount.hasOwnProperty(branch)) {
        studentCount[branch] = 0;
      }
      studentCount[branch]++;
    });
    const studentCountArray = Object.entries(studentCount);
    res.status(200).json({
      message: 'success',
      data: studentCountArray
    })
  } catch (error) {
    console.error('Error exporting data: ', error);
    return res.status(500).send('Error exporting data');
  }
}

// const getAllStudentByCourse = async (req, res) => {
//   try {
//     const studentData = await Student.find({education: req.body.education});

//     if (studentData.length === 0) {
//       res.status(404).json({ message: 'Data not Found' });
//     } else {
//       res.status(200).json({
//         message: 'Success',
//         data: studentData
//       });
//     }
//   } catch (error) {
//     console.error('Error featching data:', error);
//     res.status(500).send('Error fetching');
//   }
// }


module.exports = { studentDataInsert, getAllStudent, updateStudent, studentCount, studentDelete, studentExport, getStudentById, studentFilterByEducation, studentCountByEducation };