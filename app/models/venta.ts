import { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Venta extends BaseModel {
  @column({ isPrimary: true, columnName: 'ventaID' })
  declare ventaID: number;

  @column({ columnName: 'clienteID' })
  declare clienteID: number;

  @column({ columnName: 'empleadoID' })
  declare empleadoID: number;

  @column.date({ columnName: 'fecha_venta' })
  declare fecha_venta: DateTime;

  @column()
  declare total: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @column.dateTime({ columnName: 'deleted_at' })
  declare deletedAt: DateTime | null;
}
