import Venta from '#models/venta';
import type { HttpContext } from '@adonisjs/core/http';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

export default class VentasController {
  public async index({ response }: HttpContext) {
    try {
      const ventas = await Venta.query().orderBy('ventaID', 'desc').whereNull('deleted_at'); 
      return response.json(ventas);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener las ventas', error: error.message });
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const fakeVentaData = {
        clienteID: faker.number.int({ min: 1, max: 1 }), 
        empleadoID: faker.number.int({ min: 1, max: 1 }),
        fecha_venta: DateTime.now(),
        total: parseFloat(faker.commerce.price()), 
      };

      let ventaData = {
        ...fakeVentaData,
        ...request.only(['clienteID', 'empleadoID', 'total']), 
      };


      ventaData.fecha_venta = DateTime.now(); 

      const venta = await Venta.create(ventaData);
      return response.status(201).json(venta);
    } catch (error) {
      console.log('Error en la creación de la venta:', error);
      return response.status(400).json({ message: 'Error al crear la venta', error: error.message });
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const venta = await Venta.query().where('ventaID', params.id).whereNull('deleted_at').first(); 
      if (!venta) {
        return response.status(404).json({ message: 'Venta no encontrada' });
      }
      return response.json(venta);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener la venta', error: error.message });
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const venta = await Venta.query().where('ventaID', params.id).whereNull('deleted_at').first(); 
      if (!venta) {
        return response.status(404).json({ message: 'Venta no encontrada' });
      }

      const updatedData = request.only(['clienteID', 'empleadoID', 'fecha_venta', 'total']);
      console.log('Datos para actualizar:', updatedData); 

      
      if (updatedData.fecha_venta) {
        venta.fecha_venta = DateTime.fromISO(updatedData.fecha_venta);
      }

      if (updatedData.total !== undefined) {
        venta.total = parseFloat(updatedData.total);
      }

      venta.merge(updatedData);
      await venta.save();

      return response.json(venta);
    } catch (error) {
      console.log('Error al actualizar la venta:', error);
      return response.status(400).json({ message: 'Error al actualizar la venta', error: error.message });
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const venta = await Venta.query().where('ventaID', params.id).whereNull('deleted_at').first(); 
      if (!venta) {
        return response.status(404).json({ message: 'Venta no encontrada' });
      }
  
      
      venta.deletedAt = DateTime.now(); 
      await venta.save(); 
      
      
      return response.status(200).json({ message: 'Venta eliminada con éxito' }); 
    } catch (error) {
      return response.status(500).json({ message: 'Error al eliminar la venta', error: error.message });
    }
  }
}
