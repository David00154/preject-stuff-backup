import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'deliveries'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('courier_id')
        .unsigned()
        .references('id')
        .inTable('couriers')
        .onDelete('CASCADE')

      table.boolean('is_started').defaultTo(false)
      table.boolean('is_complete').defaultTo(false)

      table.json('origin').nullable()
      table.json('destination').nullable()

      table.string('destination_name').nullable()
      table.json('courier_location').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
