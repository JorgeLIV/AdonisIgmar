import Inventario from '#models/inventario';
import type { HttpContext } from '@adonisjs/core/http';

export default class InventariosController {
  public async index({ response }: HttpContext) {
    try {
      const inventarios = await Inventario.query().whereNull('deletedAt');
      return response.json(inventarios);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener los inventarios', error: error.message });
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const productoID = request.input('productoID') || null;
      const cantidad = request.input('cantidad') || 1;
      const inventarioData = {
        productoID: productoID,
        cantidad: cantidad,
      };

      const inventario = await Inventario.create(inventarioData);
      return response.status(201).json(inventario);
    } catch (error) {
      return response.status(400).json({ message: 'Error al crear el inventario', error: error.message });
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const inventario = await Inventario.query()
        .where('inventarioID', params.id)
        .whereNull('deletedAt') 
        .first();

      if (!inventario) {
        return response.status(404).json({ message: 'Inventario no encontrado' });
      }
      return response.json(inventario);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener el inventario', error: error.message });
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const inventario = await Inventario.query()
        .where('inventarioID', params.id)
        .whereNull('deletedAt') 
        .first();

      if (!inventario) {
        return response.status(404).json({ message: 'Inventario no encontrado' });
      }

      
      const productoID = request.input('productoID') || null;
      const cantidad = request.input('cantidad') || null;
      inventario.merge({ productoID, cantidad });
      await inventario.save();

      return response.json(inventario);
    } catch (error) {
      return response.status(400).json({ message: 'Error al actualizar el inventario', error: error.message });
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const inventario = await Inventario.query()
        .where('inventarioID', params.id)
        .whereNull('deletedAt') 
        .first();

      if (!inventario) {
        return response.status(404).json({ message: 'Inventario no encontrado' });
      }

      await inventario.softDelete(); 
      return response.status(200).json({ message: 'Eliminado con éxito' });
    } catch (error) {
      return response.status(500).json({ message: 'Error al eliminar el inventario', error: error.message });
    }
  }
}
