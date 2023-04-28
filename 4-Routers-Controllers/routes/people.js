const express = require('express');
const { getPeople, postPerson, updatePerson, deletePerson} = require('../controllers/people');
const router = express.Router()

router.get('/', getPeople);

router.post('/', postPerson);

router.put('/:id', updatePerson);

router.delete('/:id', deletePerson);

module.exports = router;