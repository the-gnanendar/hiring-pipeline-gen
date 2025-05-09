
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('candidates').del()
    .then(function () {
      // Inserts seed entries
      return knex('candidates').insert([
        {
          id: '1',
          name: 'Alex Morgan',
          email: 'alex.morgan@example.com',
          position: 'Frontend Developer',
          status: 'interview',
          date: new Date(),
          initials: 'AM',
          phone: '(555) 123-4567',
          experience: 4,
          education: JSON.stringify(['B.S. Computer Science, Stanford University']),
          applicationStage: 'first_interview',
          jobId: '1'
        },
        {
          id: '2',
          name: 'Jamie Smith',
          email: 'jamie.smith@example.com',
          position: 'Backend Developer',
          status: 'reviewing',
          date: new Date(),
          initials: 'JS',
          phone: '(555) 987-6543',
          experience: 6,
          education: JSON.stringify(['M.S. Software Engineering, MIT']),
          applicationStage: 'technical_assessment',
          jobId: '2'
        },
        {
          id: '3',
          name: 'Taylor Wilson',
          email: 'taylor.wilson@example.com',
          position: 'UX Designer',
          status: 'new',
          date: new Date(),
          initials: 'TW',
          phone: '(555) 456-7890',
          experience: 3,
          education: JSON.stringify(['B.F.A. Graphic Design, RISD']),
          applicationStage: 'resume_screening',
          jobId: '3'
        }
      ]);
    });
};
