import { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Producto extends BaseModel {
  @column({ isPrimary: true, columnName: 'productoID' }) 
  declare productoID: number;

  @column()
  declare nombre: string;

  @column()
  declare descripcion: string;

  @column()
  declare precio: number;

  @column()
  declare stock: number;

  @column()
  declare categoriaId: number;

  @column.date()
  declare fechaIngreso: DateTime;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
