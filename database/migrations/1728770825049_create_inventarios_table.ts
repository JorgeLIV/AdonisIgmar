import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'inventarios';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('inventarioID');
      table.integer('productoID').unsigned().references('productoID').inTable('productos').onDelete('CASCADE');
      table.integer('cantidad').notNullable();
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
      table.timestamp('deleted_at', { useTz: true }).nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
