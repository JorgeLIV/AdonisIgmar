const Database = require('@ioc:Adonis/Lucid/Database')
const { faker } = require('@faker-js/faker') // Importar Faker

class CategoriaSeeder {
  async run () {
    // Generar 5 categorías falsas
    for (let i = 0; i < 5; i++) {
      await Database.table('categorias').insert({
        nombre: faker.commerce.department(),
      })
    }
  }
}

module.exports = CategoriaSeeder
