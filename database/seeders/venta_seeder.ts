const Database = require('@ioc:Adonis/Lucid/Database')
const { faker } = require('@faker-js/faker')

class VentaSeeder {
  async run () {
    // Generar 10 ventas falsas
    for (let i = 0; i < 10; i++) {
      await Database.table('ventas').insert({
        clienteID: faker.number.int({ min: 1, max: 10 }), // Asegúrate de que los clientes existen
        empleadoID: faker.number.int({ min: 1, max: 5 }), // Asegúrate de que los empleados existen
        fecha_venta: faker.date.recent(),
        total: parseFloat(faker.commerce.price()),
      })
    }
  }
}

module.exports = VentaSeeder
