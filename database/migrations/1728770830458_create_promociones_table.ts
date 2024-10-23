import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'promociones';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('promocionID');
      table.string('descripcion', 255).notNullable();
      table.date('fecha_inicio').notNullable();
      table.date('fecha_fin').notNullable();
      table.integer('productoID').unsigned().references('productoID').inTable('productos').onDelete('CASCADE');
      table.decimal('descuento', 5, 2).notNullable();
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
