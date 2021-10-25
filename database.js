import sqlite3 from 'sqlite3';
import fs from 'fs';

const fsPromise = fs.promises;

const sqliteVerbose = sqlite3.verbose();

const DB_FILE = "db.sqlite";
const TEST_DB_FILE = "dbtest.sqlite";

let dbInstance;

const resetTestFile = async () => {
    try {
        await fsPromise.rm('./dbtest.sqlite');
    } catch(err) {
        console.error(err);
    }
}

export async function initDB () {

    let file = DB_FILE;

    if (process.env.NODE_ENV === 'test') {
        await resetTestFile();
        file = TEST_DB_FILE;
    }

    return new Promise((resolve, reject) => {
        dbInstance = new sqliteVerbose.Database(file, (err) => {
            if (err) {
              console.error(err.message)
              reject(err);
            } else {
                console.log('Connected to the SQLite database.')
                dbInstance.exec(`CREATE TABLE IF NOT EXISTS user (
                    userID INTEGER PRIMARY KEY AUTOINCREMENT,
                    userName TEXT
                    ); 
                    CREATE TABLE IF NOT EXISTS course (
                    courseID INTEGER PRIMARY KEY AUTOINCREMENT,
                    courseName TEXT
                    );
                    CREATE TABLE IF NOT EXISTS attendance (
                    attendanceID INTEGER PRIMARY KEY AUTOINCREMENT,
                    start INTEGER,
                    end INTEGER,
                    courseID INTEGER,
                    userID INTEGER,
                    FOREIGN KEY(courseID) REFERENCES course(courseID),
                    FOREIGN KEY(userID) REFERENCES user(userID)
                    );`,
                (err) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }

                    resolve(dbInstance);
                });  
            }
        });
    });
}

export function runQuery (query) {
    return new Promise((resolve, reject) => {
        dbInstance.exec(query, (err, row) => {
            if (err) {
                reject(err);
            }

            resolve();
        })
    });
}

export function findOne (query) {
    return new Promise((resolve, reject) => {
        dbInstance.get(query, (err, row) => {
            if (err) {
                reject(err);
            }

            resolve(row);
        })
    });
}

export function findAll (query) {
    return new Promise((resolve, reject) => {
        dbInstance.all(query, (err, rows) => {
            if (err) {
                reject(err);
            }

            resolve(rows);
        })
    });
}