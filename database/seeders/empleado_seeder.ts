const Database = require('@ioc:Adonis/Lucid/Database')
const { faker } = require('@faker-js/faker')

class EmpleadoSeeder {
  async run () {
    // Generar 5 empleados falsos
    for (let i = 0; i < 5; i++) {
      await Database.table('empleados').insert({
        nombre: faker.person.firstName() + ' ' + faker.person.lastName(),
        direccion: faker.location.streetAddress(),
        telefono: faker.phone.number('##########'),
        salario: parseFloat(faker.finance.amount(1000, 5000, 2)),
      })
    }
  }
}

module.exports = EmpleadoSeeder
