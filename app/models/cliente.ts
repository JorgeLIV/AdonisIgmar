import { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Cliente extends BaseModel {
  @column({ isPrimary: true, columnName: 'clienteID' })
  declare clienteID: number;

  @column()
  declare nombre: string;

  @column()
  declare direccion: string | null; 

  @column()
  declare telefono: string; 

  @column.date({ columnName: 'fecha_registro' })
  declare fecha_registro: DateTime | null; 

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @column.dateTime({ columnName: 'deletedAt' })
  declare deletedAt: DateTime | null; 

  
  public async softDelete() {
    this.deletedAt = DateTime.local();
    await this.save();
  }
}
