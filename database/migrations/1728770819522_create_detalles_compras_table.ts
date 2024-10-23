import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'detalles_compras'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('detalleID')
      table.integer('compraID').unsigned().references('compraID').inTable('compras').onDelete('CASCADE')
      table.integer('productoID').unsigned().references('productoID').inTable('productos').onDelete('CASCADE')
      table.integer('cantidad').notNullable()
      table.decimal('precio_unitario', 10, 2).notNullable()
      table.decimal('subtotal', 10, 2).notNullable() 
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
