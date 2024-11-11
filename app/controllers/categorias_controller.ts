import Categoria from '#models/categoria';
import type { HttpContext } from '@adonisjs/core/http';
import { faker } from '@faker-js/faker';

export default class CategoriasController {
  public async index({ response }: HttpContext) {
    try {
      const categorias = await Categoria.query().whereNull('deletedAt'); 
      return response.json(categorias);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener las categorías', error: error.message });
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const nombre = request.input('nombre') || faker.commerce.department();
      
      const categoriaData = {
        nombre, 
      };

      const categoria = await Categoria.create(categoriaData); 
      return response.status(201).json(categoria);
    } catch (error) {
      return response.status(400).json({ message: 'Error al crear la categoría', error: error.message });
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const categoria = await Categoria.query().where('categoriaID', params.id).whereNull('deletedAt').first();
      if (!categoria) {
        return response.status(404).json({ message: 'Categoría no encontrada' });
      }
      return response.json(categoria);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener la categoría', error: error.message });
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const categoria = await Categoria.query().where('categoriaID', params.id).whereNull('deletedAt').first();
      if (!categoria) {
        return response.status(404).json({ message: 'Categoría no encontrada' });
      }

      const updatedData = request.only(['nombre']); 

      if (updatedData.nombre) {
        categoria.nombre = updatedData.nombre;
      }

      await categoria.save();
      return response.json(categoria);
    } catch (error) {
      return response.status(400).json({ message: 'Error al actualizar la categoría', error: error.message });
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const categoria = await Categoria.find(params.id);
      if (!categoria) {
        return response.status(404).json({ message: 'Categoría no encontrada' });
      }
      await categoria.softDelete();
      return response.status(200).json({ message: 'Categoría eliminada con éxito' });
    } catch (error) {
      return response.status(500).json({ message: 'Error al eliminar la categoría', error: error.message });
    }
  }
}
