import { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Categoria extends BaseModel {
  @column({ isPrimary: true, columnName: 'categoriaID' }) 
  declare categoriaID: number;

  @column()
  declare nombre: string;

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
