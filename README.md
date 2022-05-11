## BE Challenge

The code consist in a simple Express+SQLite API server with 4 tables generates in the test environment running `npm run test`:

### user

| Column   | Value | Description |
| -------- | :---: | ----------: |
| userID   |  INT  | Primary Key |
| userName | TEXT  | User's name |

### course

| Column     | Value |   Description |
| ---------- | :---: | ------------: |
| courseID   |  INT  |   Primary Key |
| courseName | TEXT  | Course's name |

### courseUser

| Column       | Value |          Description |
| ------------ | :---: | -------------------: |
| courseUserID |  INT  |          Primary Key |
| userID       |  INT  |   FK to `user` table |
| courseID     |  INT  | FK to `course` table |

### attendance

| Column       | Value |                          Description |
| ------------ | :---: | -----------------------------------: |
| attendanceID |  INT  |                          Primary Key |
| userID       |  INT  |                   FK to `user` table |
| courseID     |  INT  |                 FK to `course` table |
| start        |  INT  | UNIX time value for attendance start |
| end          |  INT  |   UNIX time value for attendance end |

## Objective

The objective of the challenge is to replicate the same structure of `example.json` in the API `app.get('/score/:courseID')` with its respective tests.

The response should contain all the users related to the course via `courseUser`, and their scores in minutes with a breakdown of all the attendances.

If the user doesn't have any attendance, score should be `0` and attendance breakdown should be an empty array. 

**Attendances start and end are stored in UNIX format**, the candidate should transform it to a human readable format, feel free to install any library to make the transformation.

Every attendance in the breakdown should be ascendant by the `start` value.

It should have unit tests, there is mock data available generated in the tests, feel free to use Internet or answer questions to the interviewer.
