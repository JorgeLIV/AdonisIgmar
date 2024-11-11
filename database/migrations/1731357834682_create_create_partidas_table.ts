import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'create_partidas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.enu('estado', ['pendiente', 'en_proceso', 'terminada']).defaultTo('pendiente')
      table.integer('jugador1_id').unsigned().references('id').inTable('usuarios')
      table.integer('jugador2_id').unsigned().nullable().references('id').inTable('usuarios')
      table.integer('ganador_id').unsigned().nullable().references('id').inTable('usuarios')
      table.timestamp('fecha_inicio').nullable()
      table.timestamp('fecha_fin').nullable()
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}