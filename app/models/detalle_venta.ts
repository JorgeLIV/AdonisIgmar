import { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class DetalleVenta extends BaseModel {
  public static table = 'detalles_ventas';

  @column({ isPrimary: true, columnName: 'detalleID' })
  declare detalleID: number;

  @column({ columnName: 'ventaID' })
  declare ventaID: number;

  @column({ columnName: 'productoID' })
  declare productoID: number;

  @column()
  declare cantidad: number;

  @column({ columnName: 'precio_unitario', serializeAs: 'precio_unitario' })
  declare precio_unitario: number;

  @column()
  declare subtotal: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  declare deletedAt: DateTime | null;

  
  public async softDelete() {
    this.deletedAt = DateTime.local();
    await this.save();
  }
}