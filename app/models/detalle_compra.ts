import { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm';

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

  @column.dateTime({ autoCreate: false, autoUpdate: false }) 
  declare deletedAt: DateTime | null; 

  
  public async softDelete() {
    this.deletedAt = DateTime.local(); 
    await this.save();
  }
}
