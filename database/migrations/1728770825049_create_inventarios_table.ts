import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'inventarios';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('inventarioID'); 
      table.integer('productoID').unsigned().references('productoID').inTable('productos').onDelete('CASCADE'); // Asegúrate de que este sea el nombre correcto
      table.integer('cantidad').notNullable();
      table.timestamp('created_at', { useTz: true }); 
      table.timestamp('updated_at', { useTz: true }); 
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
