import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'clientes';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('clienteID'); 
      table.string('nombre', 100).notNullable();
      table.string('direccion', 200);
      table.string('telefono', 20); 
      table.date('fecha_registro'); 
      table.timestamp('created_at', { useTz: true }); 
      table.timestamp('updated_at', { useTz: true }); 
      table.timestamp('deletedAt', { useTz: true }).nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName); 
  }
}
