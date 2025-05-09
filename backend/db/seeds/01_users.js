
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          password: 'admin123', // In production, this would be hashed
          role: 'admin',
          avatar: 'AU',
        },
        {
          id: '2',
          name: 'Recruiter User',
          email: 'recruiter@example.com',
          password: 'recruiter123', // In production, this would be hashed
          role: 'recruiter',
          avatar: 'RU',
          department: 'HR',
        },
        {
          id: '3',
          name: 'Manager User',
          email: 'manager@example.com',
          password: 'manager123', // In production, this would be hashed
          role: 'hiring_manager',
          avatar: 'MU',
          department: 'Engineering',
        },
        {
          id: '4',
          name: 'Viewer User',
          email: 'viewer@example.com',
          password: 'viewer123', // In production, this would be hashed
          role: 'viewer',
          avatar: 'VU',
        },
      ]);
    });
};
