import { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Empleado extends BaseModel {
  @column({ isPrimary: true, columnName: 'empleadoID' }) 
  declare empleadoID: number;

  @column()
  declare nombre: string;

  @column()
  declare direccion: string;

  @column()
  declare telefono: string;

  @column()
  declare salario: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
