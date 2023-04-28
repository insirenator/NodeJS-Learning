const { people } = require('../data');
const {appendFile} = require('fs');

const getPeople = (req, res) => {
    res.status(200).send({response: true, data: people});
}

const postPerson = (req, res) => {
    const {name} = req.body;

    if(!name) {
        res.status(400).json({response: false, msg: 'please provide name value'})
    } else {
        res.status(201).json({response: true, person: name});
        appendFile('./people.txt', name+'\n', () => {
            console.log('Name added : ' + name);
        })
    }
}

const updatePerson = (req, res) => {
    const {id} = req.params;
    const {name} = req.body;

    console.log(id, name);

    res.status(200).json({response: true, data: [id, name]});
}

const deletePerson = (req, res) => {
    const { id } = req.params;

    res.json({deleted: true, id: id});
}

module.exports = { getPeople, postPerson, updatePerson, deletePerson };