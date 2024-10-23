import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'productos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('productoID')
      table.string('nombre', 100).notNullable()
      table.text('descripcion')
      table.decimal('precio', 10, 2).notNullable()
      table.integer('stock').notNullable()
      table.integer('categoriaID').unsigned().references('categoriaID').inTable('categorias').onDelete('CASCADE')
      table.date('fecha_ingreso')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}