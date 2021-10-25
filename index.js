import express from 'express';
import { createAttendance, getAttendances, getCourses, getUsers } from './controllers';
import { initDB } from './database';

const app = express();

const PORT = 80;

app.listen(PORT, () => {
    initDB();
    console.log(`Running on port: ${PORT}`);
});

app.get('/user', async (req, res, next) => {
    const users = await getUsers();
    res.json({users});
});

app.get('/course', async (req, res, next) => {
    const courses = await getCourses();
    res.json({courses});
});

app.get('/attendance', async (req, res, next) => {
    const attendances = await getAttendances();
    res.json({attendances});
});

app.post('/attendance', async (req, res, next) => {
    const {start, end, userID, courseID} = req.body;

    await createAttendance({start, end, userID, courseID});
    res.statusCode(200);
});

app.get('/attendance/course/:courseID', async (req, res, next) => {
    const {courseID} = req.params;
    res.json({message: 'OK'});
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});