const Student = require('../models/Student');

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).json({msg: 'All Student!', students: students});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const addNewStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json({msg: 'Student Added!', student: student});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const getStudent = async (req, res) => {
    try {
        const stuID = req.params.id;
        const student = await Student.findOne({_id: stuID});

        if (!student) {
            return res.status(404).json({msg:`No student with id : ${stuID}`});
        }

        return res.status(200).json({msg:'Found Student!', student: student});

    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const deleteStudent = async (req, res) => {
    try {
        const stuID = req.params.id;
        const student = await Student.findOneAndDelete({_id: stuID});

        if (!student) {
            return res.status(404).json({msg: `No student with id: ${stuID}`});
        }
        return res.status(200).json({msg:'Student Deleted!', student: student});

    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const updateStudent = async (req, res) => {
    try {
        const stuID = req.params.id;
        const student = await Student.findOneAndUpdate({_id: stuID}, req.body, {
            new: true,
            runValidators: true,
        });

        if (!student) {
            return res.status(404).json({msg: `No student with id : ${stuID}`});
        }
        return res.status(200).json({msg: 'Student Updated!', student: student});

    } catch (error) {
        res.status(500).json({msg: error});
    }
}

module.exports = {
    getAllStudents,
    addNewStudent,
    getStudent,
    deleteStudent,
    updateStudent,
};