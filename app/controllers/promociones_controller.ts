import Promocion from '#models/promocion';
import type { HttpContext } from '@adonisjs/core/http';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

export default class PromocionesController {
  public async index({ response }: HttpContext) {
    try {
      const promociones = await Promocion.query().whereNull('deletedAt'); 
      return response.json(promociones);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener las promociones', error: error.message });
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const productoID = request.input('productoID');

      if (!productoID) {
        return response.status(400).json({ message: 'Se requiere un productoID' });
      }

      const promocionData = {
        descripcion: request.input('descripcion') || faker.commerce.productDescription(),
        descuento: request.input('descuento') || faker.number.int({ min: 5, max: 50 }),
        fecha_inicio: request.input('fecha_inicio') || DateTime.fromJSDate(faker.date.past()).toISODate(),
        fecha_fin: request.input('fecha_fin') || DateTime.fromJSDate(faker.date.future()).toISODate(),
        productoID: productoID,
      };

      const promocion = await Promocion.create(promocionData);
      return response.status(201).json(promocion);
    } catch (error) {
      return response.status(400).json({ message: 'Error al crear la promoción', error: error.message });
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const promocion = await Promocion.query()
        .where('promocionID', params.id)
        .whereNull('deletedAt') 
        .first();

      if (!promocion) {
        return response.status(404).json({ message: 'Promoción no encontrada' });
      }
      return response.json(promocion);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener la promoción', error: error.message });
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const promocion = await Promocion.query()
        .where('promocionID', params.id)
        .whereNull('deletedAt') 
        .first();

      if (!promocion) {
        return response.status(404).json({ message: 'Promoción no encontrada' });
      }

      promocion.merge(request.only(['descripcion', 'descuento', 'fecha_inicio', 'fecha_fin', 'productoID']));
      await promocion.save();

      return response.json(promocion);
    } catch (error) {
      return response.status(400).json({ message: 'Error al actualizar la promoción', error: error.message });
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const promocion = await Promocion.query()
        .where('promocionID', params.id)
        .whereNull('deletedAt') 
        .first();

      if (!promocion) {
        return response.status(404).json({ message: 'Promoción no encontrada' });
      }

      await promocion.softDelete();
      return response.status(200).json({ message: 'Promoción eliminada correctamente' }); 
    } catch (error) {
      return response.status(500).json({ message: 'Error al eliminar la promoción', error: error.message });
    }
  }
}
