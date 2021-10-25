import chai from 'chai';
import moment from 'moment-timezone';
import { initDB, runQuery } from '../database';
import { getAttendances, getCourses, getUsers } from '../controllers';

const expect = chai.expect;
const now = '2021-10-25T12:00:00.000Z';

const seedTestDB = async () => {
    await runQuery(`INSERT INTO user VALUES ('1', 'Jhon'), ('2', 'Jenny');`);
    await runQuery(`INSERT INTO course VALUES ('15', 'Course A'), ('18', 'Course B')`);
    await runQuery(`INSERT INTO attendance VALUES 
    ('1', ${moment(now).subtract({hour: 1}).unix()}, ${moment(now).subtract({minute: 30}).unix()}, '15', '1'), 
    ('2', ${moment(now).subtract({hour: 2}).unix()}, ${moment(now).subtract({hour: 1}).unix()}, '15', '2'),
    ('3', ${moment(now).subtract({hour: 6}).unix()}, ${moment(now).subtract({hour: 4}).unix()}, '15', '2'),
    ('4', ${moment(now).subtract({hour: 3}).unix()}, ${moment(now).subtract({hour: 2, minute: 15}).unix()}, '15', '2'),
    ('5', ${moment(now).subtract({hour: 15}).unix()}, ${moment(now).subtract({hour: 11}).unix()}, '18', '1');`);
};

describe('Controller Tests', function() {
    beforeEach(async () => {
        await initDB();
        await seedTestDB();
    });

    describe('getUsers', function() {
        it('should return users as expected', async function() {
            const users = await getUsers();
            expect(users).to.be.an('array');
            expect(users).to.have.lengthOf(2);
        });
    });

    describe('getCourses', function() {
        it('should return courses as expected', async function() {
            const courses = await getCourses();
            expect(courses).to.be.an('array');
            expect(courses).to.have.lengthOf(2);
        });
    });

    describe('getAttendances', function() {
        it('should return attendances as expected', async function() {
            const attendances = await getAttendances();
            expect(attendances).to.be.an('array');
            expect(attendances).to.have.lengthOf(5);
        });
    });
});