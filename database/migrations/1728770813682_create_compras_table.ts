import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'compras';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('compraID');
      table.integer('proveedorID').unsigned().references('proveedorID').inTable('proveedores').onDelete('CASCADE');
      table.integer('empleadoID').unsigned().references('empleadoID').inTable('empleados').onDelete('CASCADE');
      table.date('fecha_compra').notNullable();
      table.decimal('total', 10, 2).notNullable();
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
      table.timestamp('deleted_at', { useTz: true }).nullable(); 
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
