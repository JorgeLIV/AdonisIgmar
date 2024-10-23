import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'detalles_ventas';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('detalleID'); 
      table.integer('ventaID').unsigned().references('ventaID').inTable('ventas').onDelete('CASCADE'); // Relation to the sales table
      table.integer('productoID').unsigned().references('productoID').inTable('productos').onDelete('CASCADE'); // Relation to the products table
      table.integer('cantidad').notNullable(); 
      table.decimal('precio_unitario', 10, 2).notNullable(); 
      table.decimal('subtotal', 10, 2).notNullable().defaultTo(0);
      table.timestamp('created_at', { useTz: true }); 
      table.timestamp('updated_at', { useTz: true }); 
    });
  }

  async down() {
    this.schema.dropTable(this.tableName); 
  }
}
