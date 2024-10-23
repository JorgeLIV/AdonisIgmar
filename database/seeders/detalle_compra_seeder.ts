const Database = require('@ioc:Adonis/Lucid/Database')
const { faker } = require('@faker-js/faker')

class DetalleCompraSeeder {
  async run () {
    // Generar 20 detalles de compra falsos
    for (let i = 0; i < 20; i++) {
      await Database.table('detalles_compra').insert({
        compraID: faker.number.int({ min: 1, max: 10 }), // Asegúrate de que las compras existen
        productoID: faker.number.int({ min: 1, max: 10 }), // Asegúrate de que los productos existen
        cantidad: faker.number.int({ min: 1, max: 5 }),
        precio_unitario: parseFloat(faker.commerce.price()),
        subtotal: function () {
          return this.cantidad * this.precio_unitario;
        },
      })
    }
  }
}

module.exports = DetalleCompraSeeder
