const express = require('express');
const app = express();
const port = 5500;
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRout = require('./routes/routUser');
app.use('/api/users', userRout);

const questionRout = require('./routes/routQuestion');
app.use('/api/questions', questionRout);

const answerRout = require('./routes/routAnswer');
app.use('/api/answers', answerRout);

const dbConnection = require('./db/dbConfig');

async function start(){
    try{
        const [result] = await dbConnection.promise().execute("select 'test'")
        app.listen(port, () => {
            console.log("database connection established")
            console.log(`listening on ${port}`)
        })
    }
    catch (error){
        console.log(error.message)
    }
}
start();
