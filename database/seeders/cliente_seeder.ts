const Database = require('@ioc:Adonis/Lucid/Database')
const { faker } = require('@faker-js/faker')

class ClienteSeeder {
  async run () {
    // Generar 10 clientes falsos
    for (let i = 0; i < 10; i++) {
      await Database.table('clientes').insert({
        nombre: faker.person.firstName() + ' ' + faker.person.lastName(),
        direccion: faker.location.streetAddress(),
        telefono: faker.phone.number('##########'), // Teléfono de 10 dígitos
        fecha_registro: faker.date.past(1),
      })
    }
  }
}

module.exports = ClienteSeeder
