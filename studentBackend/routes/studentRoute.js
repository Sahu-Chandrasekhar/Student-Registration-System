const express = require('express');
const { studentDataInsert, getAllStudent, updateStudent, studentCount, studentDelete, studentExport, getStudentById, studentFilterByEducation, studentCountByEducation } = require('../controller/studentControler');

const router = express.Router();

//studentRouters
router.post('/student_insert', studentDataInsert) //('/path', controlFunction)
router.get('/student_view', getAllStudent)
router.post('/getStudentById', getStudentById)
router.post('/student_update', updateStudent)
router.get('/studnet_count', studentCount)
router.post('/student_delete', studentDelete)
router.get('/student_export', studentExport)
router.post('/students_by_education', studentFilterByEducation)
router.post('/students_Download_by_education', studentCountByEducation)


module.exports = router;