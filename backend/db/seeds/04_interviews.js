
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('interviews').del()
    .then(function () {
      // Inserts seed entries
      return knex('interviews').insert([
        {
          id: '1',
          candidateId: '1',
          candidate: JSON.stringify({
            name: 'Alex Morgan',
            position: 'Frontend Developer',
            initials: 'AM'
          }),
          interviewers: JSON.stringify([
            { name: 'John Smith', initials: 'JS' },
            { name: 'Alice Wong', initials: 'AW' }
          ]),
          date: new Date(),
          time: '10:00 AM - 11:00 AM',
          type: 'technical',
          status: 'scheduled'
        },
        {
          id: '2',
          candidateId: '2',
          candidate: JSON.stringify({
            name: 'Jamie Smith',
            position: 'Backend Developer',
            initials: 'JS'
          }),
          interviewers: JSON.stringify([
            { name: 'Sarah Johnson', initials: 'SJ' }
          ]),
          date: new Date(),
          time: '2:00 PM - 3:00 PM',
          type: 'culture',
          status: 'scheduled'
        }
      ]);
    });
};
