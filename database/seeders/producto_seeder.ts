const Database = require('@ioc:Adonis/Lucid/Database')
const { faker } = require('@faker-js/faker')

class ProductoSeeder {
  async run () {
    // Generar 10 productos falsos
    for (let i = 0; i < 10; i++) {
      await Database.table('productos').insert({
        nombre: faker.commerce.productName(),
        descripcion: faker.commerce.productDescription(),
        precio: parseFloat(faker.commerce.price()),
        stock: faker.number.int({ min: 0, max: 100 }),
        categoriaID: faker.number.int({ min: 1, max: 5 }), // Asegúrate de que las categorías existen
        fecha_ingreso: faker.date.past(1),
      })
    }
  }
}

module.exports = ProductoSeeder
