const Database = require('@ioc:Adonis/Lucid/Database')
const { faker } = require('@faker-js/faker')

class CompraSeeder {
  async run () {
    // Generar 10 compras falsas
    for (let i = 0; i < 10; i++) {
      await Database.table('compras').insert({
        proveedorID: faker.number.int({ min: 1, max: 5 }), // Asegúrate de que los proveedores existen
        empleadoID: faker.number.int({ min: 1, max: 5 }), // Asegúrate de que los empleados existen
        fecha_compra: faker.date.recent(),
        total: parseFloat(faker.commerce.price()),
      })
    }
  }
}

module.exports = CompraSeeder
