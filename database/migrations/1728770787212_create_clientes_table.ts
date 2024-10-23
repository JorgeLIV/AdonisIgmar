import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'clientes';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('clienteID'); 
      table.string('nombre', 100).notNullable();
      table.string('direccion', 200);
      table.string('telefono', 20); // Aumenté la longitud para incluir caracteres
      table.date('fecha_registro'); 
      table.timestamp('created_at', { useTz: true }); 
      table.timestamp('updated_at', { useTz: true }); 
    });
  }

  async down() {
    this.schema.dropTable(this.tableName); 
  }
}
