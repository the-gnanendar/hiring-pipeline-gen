
exports.up = function(knex) {
  return knex.schema.createTable('candidates', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('position').notNullable();
    table.enum('status', ['new', 'reviewing', 'interview', 'offer', 'rejected']).notNullable();
    table.date('date').defaultTo(knex.fn.now());
    table.string('initials');
    table.string('resume');
    table.string('phone');
    table.integer('experience');
    table.json('education');
    table.string('applicationStage');
    table.uuid('jobId').references('id').inTable('jobs').onDelete('SET NULL');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('candidates');
};
