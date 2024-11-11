import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'ventas';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('ventaID');
      table.integer('clienteID').unsigned().references('clienteID').inTable('clientes').onDelete('CASCADE');
      table.integer('empleadoID').unsigned().references('empleadoID').inTable('empleados').onDelete('CASCADE');
      table.date('fecha_venta').notNullable();
      table.decimal('total', 10, 2).notNullable();
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
      table.timestamp('deleted_at', { useTz: true }).nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
