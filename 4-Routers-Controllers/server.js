const express = require('express');
const people = require('./routes/people.js');
const auth = require('./routes/auth.js');

const app = express();
app.use(express.static('./public'));
//Parse Form Data
app.use(express.urlencoded({extended: false}));
// Parse JSON Data
app.use(express.json());

app.use('/api/people', people);
app.use('/login', auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Listening at Port ${PORT}...`);
});