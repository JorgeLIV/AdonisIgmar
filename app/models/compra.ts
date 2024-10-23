import { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Compra extends BaseModel {
  @column({ isPrimary: true, columnName: 'compraID' })
  declare compraID: number;

  @column({ columnName: 'proveedorID' })
  declare proveedorID: number;

  @column({ columnName: 'empleadoID' })  
  declare empleadoID: number;

  @column.date({ columnName: 'fecha_compra' })
  declare fecha_compra: DateTime;

  @column()
  declare total: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
