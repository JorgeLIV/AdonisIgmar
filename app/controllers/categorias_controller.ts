import Categoria from '#models/categoria'
import type { HttpContext } from '@adonisjs/core/http'
import { faker } from '@faker-js/faker'

export default class CategoriasController {
  
  public async index({ response }: HttpContext) {
    const categorias = await Categoria.all()
    return response.json(categorias)
  }

  public async store({ request, response }: HttpContext) {
    const fakeCategoriaData = {
      nombre: faker.commerce.department(),
    };

    const categoriaData = { ...request.only(['nombre']), ...fakeCategoriaData };

    const categoria = await Categoria.create(categoriaData)
    return response.status(201).json(categoria)
  }

  public async show({ params, response }: HttpContext) {
    const categoria = await Categoria.find(params.id)
    return categoria ? response.json(categoria) : response.status(404).json({ message: 'Categoria no encontrada' })
  }

  public async update({ params, request, response }: HttpContext) {
    const categoria = await Categoria.find(params.id)
    if (!categoria) {
      return response.status(404).json({ message: 'Categoria no encontrada' })
    }
    categoria.merge(request.only(['nombre']))
    await categoria.save()
    return response.json(categoria)
  }

public async destroy({ params, response }: HttpContext) {
  const categoria = await Categoria.find(params.id)
  if (!categoria) {
    return response.status(404).json({ message: 'Categoria no encontrada' })
  }
  await categoria.delete()
  return response.status(200).json({ message: 'eliminado con éxito' })
}
}