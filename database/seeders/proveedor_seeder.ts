const Database = require('@ioc:Adonis/Lucid/Database')
const { faker } = require('@faker-js/faker')

class ProveedorSeeder {
  async run () {
    // Generar 5 proveedores falsos
    for (let i = 0; i < 5; i++) {
      await Database.table('proveedores').insert({
        nombre: faker.company.name(),
        direccion: faker.location.streetAddress(),
        telefono: faker.phone.number('##########'),
        correo: faker.internet.email(),
      })
    }
  }
}

module.exports = ProveedorSeeder
