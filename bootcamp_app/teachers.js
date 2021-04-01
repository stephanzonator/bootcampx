//psql -h localhost -p 5432 -U vagrant bootcampx

const queryFunction = (param1) => {
  const { Pool } = require('pg');

  const pool = new Pool({
    user: 'vagrant',
    password: '123',
    host: 'localhost',
    database: 'bootcampx'
  });

  const queryString = `  
  SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
  FROM teachers
  JOIN assistance_requests ON teacher_id = teachers.id
  JOIN students ON student_id = students.id
  JOIN cohorts ON cohort_id = cohorts.id
  WHERE cohorts.name LIKE $1
  ORDER BY teacher;
  `;

  pool.query(queryString, param1)
  .then(res => {
    // console.log(res.rows);
    res.rows.forEach(user => {
      console.log(`${user.teacher} helped the ${user.cohort} cohort`);
    })
  })
  .catch(err => console.error('query error', err.stack));

};

const cohortName = process.argv[2];
// Store all potentially malicious values in an array. 
const values = [`%${cohortName}%`];
queryFunction(values);