const express = require('express');
const {
        getAllStudents, 
        addNewStudent,
        getStudent,
        deleteStudent,
        updateStudent,

} = require('../controllers/students');

const router = express.Router();

router.route('/')
        .get(getAllStudents)
        .post(addNewStudent);

router.route('/:id')
        .get(getStudent)
        .patch(updateStudent)
        .delete(deleteStudent);

module.exports = router;