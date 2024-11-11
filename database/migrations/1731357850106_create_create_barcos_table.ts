import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'create_barcos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      table.integer('tablero_id').unsigned().references('id').inTable('tableros')
      table.integer('coordenada_x').notNullable()
      table.integer('coordenada_y').notNullable()
      table.enu('estado', ['activo', 'hundido']).defaultTo('activo')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}