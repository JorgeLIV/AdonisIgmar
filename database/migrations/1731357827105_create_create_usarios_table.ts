import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'create_usarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 100).notNullable()
      table.string('email', 100).unique().notNullable()
      table.string('password').notNullable()
      table.integer('rol_id').unsigned().references('id').inTable('roles')
      table.enu('estado', ['activada', 'inactiva']).defaultTo('inactiva')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}