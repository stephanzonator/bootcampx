SELECT sum(assignment_submissions.duration) as total_duration
FROM students
JOIN assignment_submissions ON assignment_submissions.student_id = students.id
WHERE name = 'Ibrahim Schimmel';