const Database = require('@ioc:Adonis/Lucid/Database')
const { faker } = require('@faker-js/faker')

class PromocionSeeder {
  async run () {
    // Generar 5 promociones falsas
    for (let i = 0; i < 5; i++) {
      await Database.table('promociones').insert({
        productoID: faker.number.int({ min: 1, max: 10 }), // Asegúrate de que los productos existen
        descripcion: faker.lorem.sentence(),
        descuento: parseFloat(faker.commerce.price(1, 50, 2)),
        fecha_inicio: faker.date.recent(),
        fecha_fin: faker.date.soon(30),
      })
    }
  }
}

module.exports = PromocionSeeder
