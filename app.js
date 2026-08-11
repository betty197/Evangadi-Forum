const express = require('express');
const app = express();
const port = 5500;
 
const userRout = require('./routes/routUser');
app.use('/api/users', userRout);

const questionRout = require('./routes/routQuestion');
app.use('/api/questions', questionRout);

const answerRout = require('./routes/routAnswer');
app.use('/api/answers', answerRout);

app.listen(port, () => {
    console.log(`listening on ${port}`);
})

app.get('/', (req, res) => {
    res.send('Hey betty');
})