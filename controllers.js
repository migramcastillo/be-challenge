import { findAll } from "./database";

export async function getUsers() {
    return await findAll('SELECT * FROM user');
};

export async function getCourses() {
    return await findAll('SELECT * FROM course');
};

export async function getAttendances() {
    return await findAll('SELECT * FROM attendance');
};

export async function getUsersFromCourse(courseID) {
    return await findAll(`SELECT courseUser.courseID, user.userID, user.userName FROM courseUser INNER JOIN user ON user.userID = courseUser.userID WHERE courseID = ${courseID}`);
};

export async function createAttendance({start, end, userID, courseID}) {
    // Should store start and end in unix formats
    return true;
}

export async function getCourseScore(courseID) {
    // Should return as in example.json
    return true;
}