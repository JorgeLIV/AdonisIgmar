import { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Promocion extends BaseModel {
  public static table = 'promociones';

  @column({ isPrimary: true, columnName: 'promocionID' })
  declare promocionID: number;

  @column({ columnName: 'productoID' }) 
  declare productoID: number;

  @column()
  declare descripcion: string;

  @column()
  declare descuento: number;
  @column.date()
  declare fecha_inicio: DateTime;

  @column.date()
  declare fecha_fin: DateTime;

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
