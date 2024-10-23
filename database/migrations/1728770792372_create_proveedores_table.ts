import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ProveedoresSchema extends BaseSchema {
  protected tableName = 'proveedores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('proveedorID') 
      table.string('nombre', 100).notNullable() 
      table.string('direccion', 200)
      table.string('telefono', 20) 
      table.string('correo', 100) 
      table.timestamp('created_at', { useTz: true }) 
      table.timestamp('updated_at', { useTz: true }) 
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
