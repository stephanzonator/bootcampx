//psql -h localhost -p 5432 -U vagrant bootcampx

const queryFunction = (param1, param2) => {
  const { Pool } = require('pg');

  const pool = new Pool({
    user: 'vagrant',
    password: '123',
    host: 'localhost',
    database: 'bootcampx'
  });

  pool.query(`
  SELECT students.id, students.name as student, cohorts.name as cohort
  FROM students
  JOIN cohorts ON students.cohort_id = cohorts.id
  WHERE cohorts.name LIKE '${param1}%'
  LIMIT ${param2};
  `)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.student} has an id of ${user.id} and was in the ${user.cohort} cohort`);
    })
  })
  .catch(err => console.error('query error', err.stack));

};

queryFunction(process.argv[2], process.argv[3]);
