import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'empleados';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('empleadoID');
      table.string('nombre', 100).notNullable();
      table.string('direccion', 200);
      table.string('telefono', 20);
      table.decimal('salario', 10, 2);
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
      table.timestamp('deleted_at', { useTz: true }).nullable(); 
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
