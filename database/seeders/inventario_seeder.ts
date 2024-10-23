const Database = require('@ioc:Adonis/Lucid/Database')
const { faker } = require('@faker-js/faker')

class InventarioSeeder {
  async run () {
    // Generar 10 registros de inventario falsos
    for (let i = 0; i < 10; i++) {
      await Database.table('inventarios').insert({
        productoID: faker.number.int({ min: 1, max: 10 }), // Asegúrate de que los productos existen
        cantidad: faker.number.int({ min: 1, max: 100 }),
        fecha_actualizacion: faker.date.recent(),
      })
    }
  }
}

module.exports = InventarioSeeder
