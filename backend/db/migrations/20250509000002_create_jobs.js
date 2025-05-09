
exports.up = function(knex) {
  return knex.schema.createTable('jobs', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('title').notNullable();
    table.string('department').notNullable();
    table.string('location').notNullable();
    table.enum('type', ['full-time', 'part-time', 'contract', 'remote']).notNullable();
    table.enum('status', ['draft', 'active', 'closed', 'on-hold']).notNullable();
    table.integer('applicants').defaultTo(0);
    table.date('postedDate');
    table.text('description');
    table.json('requirements');
    table.json('responsibilities');
    table.json('salary');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('jobs');
};
