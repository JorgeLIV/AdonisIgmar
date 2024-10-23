import { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class Proveedor extends BaseModel {
  public static table = 'proveedores';

  @column({ isPrimary: true, columnName: 'proveedorID' })
  declare proveedorID: number;

  @column()
  declare nombre: string;

  @column()
  declare direccion: string;

  @column()
  declare telefono: string;

  @column()
  declare correo: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
