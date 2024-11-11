import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'categorias';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('categoriaID');  
      table.string('nombre', 100).notNullable();
      table.timestamps(true, true);  
      table.timestamp('deleted_at').nullable(); 
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
