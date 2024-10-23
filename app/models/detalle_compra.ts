import { BaseModel, column } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';

export default class DetalleCompra extends BaseModel {
  public static table = 'detalles_compras'; 

  @column({ isPrimary: true, columnName: 'detalleID' }) 
  declare detalleID: number;

  @column({ columnName: 'compraID' })
  declare compraID: number;

  @column({ columnName: 'productoID' })
  declare productoID: number;

  @column()
  declare cantidad: number; 

  @column()
  declare precio_unitario: number;

  @column()
  declare subtotal: number; 

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime; 

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime; 
}
