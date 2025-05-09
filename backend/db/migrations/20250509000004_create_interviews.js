
exports.up = function(knex) {
  return knex.schema.createTable('interviews', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('candidateId').references('id').inTable('candidates').onDelete('CASCADE');
    table.json('candidate').notNullable();
    table.json('interviewers').notNullable();
    table.date('date').notNullable();
    table.string('time').notNullable();
    table.enum('type', ['technical', 'culture', 'screening', 'final']).notNullable();
    table.text('notes');
    table.enum('status', ['scheduled', 'completed', 'cancelled']).defaultTo('scheduled');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('interviews');
};
