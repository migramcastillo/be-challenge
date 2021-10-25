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

export async function createAttendance({start, end, userID, courseID}) {
    // Should store start and end in unix formats
    return true;
}