## Objective
The code consist in a simple Express+SQLite API server with 4 tables generates in the test environment running npm run test:

user table with columns userID, userName.
course table with columns courseID, courseName.
courserUser table with columns courseUserID, userID, courseID.
attendance table with columns attendanceID, courseID, userID, start, end.
The objective of the challenge is to replicate the same structure of example.json in the API app.get('/score/:courseID') with its respective tests.

The response should contain all the users related to the course via courseUser, and their scores in minutes with a breakdown of all the attendances. If the user doesn't have any attendance, score should be 0 and attendance breakdown should be an empty array. Attaendances start and end are stored in UNIX format, the candidate should transform it to a human readable format.

There is mock data available generated in the tests, feel free to ask questions to the interviewer.