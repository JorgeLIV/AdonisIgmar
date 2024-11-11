import Compra from '#models/compra';
import type { HttpContext } from '@adonisjs/core/http';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

export default class ComprasController {
  public async index({ response }: HttpContext) {
    try {
      const compras = await Compra.query().whereNull('deleted_at'); 
      return response.json(compras);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener las compras', error: error.message });
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const fakeCompraData = {
        proveedorID: faker.number.int({ min: 1, max: 1 }),
        empleadoID: faker.number.int({ min: 1, max: 1 }),
        fecha_compra: DateTime.fromJSDate(faker.date.recent()),
        total: parseFloat(faker.commerce.price()),
      };

      const compraData = {
        ...request.only(['proveedorID', 'empleadoID', 'fecha_compra', 'total']),
        ...fakeCompraData,
      };

      const compra = await Compra.create(compraData);
      return response.status(201).json(compra);
    } catch (error) {
      return response.status(400).json({ message: 'Error al crear la compra', error: error.message });
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const compra = await Compra.query().where('compraID', params.id).whereNull('deleted_at').first(); 
      if (!compra) {
        return response.status(404).json({ message: 'Compra no encontrada' });
      }
      return response.json(compra);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener la compra', error: error.message });
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const compra = await Compra.query().where('compraID', params.id).whereNull('deleted_at').first(); 
      if (!compra) {
        return response.status(404).json({ message: 'Compra no encontrada' });
      }

      const updatedData = request.only(['proveedorID', 'empleadoID', 'fecha_compra', 'total']);
      if (updatedData.fecha_compra) {
        updatedData.fecha_compra = DateTime.fromISO(updatedData.fecha_compra);
      }

      compra.merge(updatedData);
      await compra.save();

      return response.json(compra);
    } catch (error) {
      return response.status(400).json({ message: 'Error al actualizar la compra', error: error.message });
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const compra = await Compra.query().where('compraID', params.id).whereNull('deleted_at').first(); 
      if (!compra) {
        return response.status(404).json({ message: 'Compra no encontrada' });
      }
      await compra.softDelete(); 
      return response.status(200).json({ message: 'Compra eliminada con éxito' }); 
    } catch (error) {
      return response.status(500).json({ message: 'Error al eliminar la compra', error: error.message });
    }
  }
  
}
