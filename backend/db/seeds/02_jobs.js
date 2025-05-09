
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('jobs').del()
    .then(function () {
      // Inserts seed entries
      return knex('jobs').insert([
        {
          id: '1',
          title: 'Frontend Developer',
          department: 'Engineering',
          location: 'San Francisco, CA',
          type: 'full-time',
          status: 'active',
          applicants: 12,
          postedDate: new Date(),
          description: 'We are looking for a Frontend Developer to join our team.',
          requirements: JSON.stringify(['3+ years of React experience', 'TypeScript proficiency', 'CSS/SCSS knowledge']),
          responsibilities: JSON.stringify(['Develop user interfaces', 'Collaborate with designers', 'Write clean, maintainable code']),
          salary: JSON.stringify({ min: 80000, max: 120000, currency: 'USD' })
        },
        {
          id: '2',
          title: 'Backend Developer',
          department: 'Engineering',
          location: 'Remote',
          type: 'full-time',
          status: 'active',
          applicants: 8,
          postedDate: new Date(),
          description: 'Seeking a skilled Backend Developer to build robust APIs.',
          requirements: JSON.stringify(['5+ years of Node.js experience', 'Database design skills', 'API development experience']),
          responsibilities: JSON.stringify(['Design and implement APIs', 'Optimize database queries', 'Ensure security best practices']),
          salary: JSON.stringify({ min: 90000, max: 130000, currency: 'USD' })
        },
        {
          id: '3',
          title: 'UX Designer',
          department: 'Design',
          location: 'New York, NY',
          type: 'full-time',
          status: 'active',
          applicants: 15,
          postedDate: new Date(),
          description: 'Looking for a talented UX Designer to create intuitive interfaces.',
          requirements: JSON.stringify(['3+ years of UX design experience', 'Proficiency in Figma', 'User research experience']),
          responsibilities: JSON.stringify(['Create wireframes and prototypes', 'Conduct user testing', 'Collaborate with developers']),
          salary: JSON.stringify({ min: 75000, max: 110000, currency: 'USD' })
        }
      ]);
    });
};
