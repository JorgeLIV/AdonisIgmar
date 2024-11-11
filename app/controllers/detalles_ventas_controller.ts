import DetalleVenta from '#models/detalle_venta';
import type { HttpContext } from '@adonisjs/core/http';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

export default class DetallesVentaController {
  public async index({ response }: HttpContext) {
    try {
      const detalles = await DetalleVenta.query().whereNull('deleted_at'); 
      return response.json(detalles);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener detalles de venta', error: error.message });
    }
  }

  public async store({ response }: HttpContext) {
    try {
      const fakeDetalleData = {
        ventaID: faker.number.int({ min: 1, max: 1 }),
        productoID: faker.number.int({ min: 1, max: 1 }),
        cantidad: faker.number.int({ min: 1, max: 5 }), 
        precio_unitario: parseFloat(faker.commerce.price()),
        subtotal: parseFloat(faker.commerce.price()), 
      };

      const detalle = new DetalleVenta();
      detalle.ventaID = fakeDetalleData.ventaID;
      detalle.productoID = fakeDetalleData.productoID;
      detalle.cantidad = fakeDetalleData.cantidad;
      detalle.precio_unitario = fakeDetalleData.precio_unitario;
      detalle.subtotal = fakeDetalleData.subtotal; 
      detalle.createdAt = DateTime.now();
      detalle.updatedAt = DateTime.now();

      await detalle.save();
      return response.status(201).json(detalle);
    } catch (error) {
      return response.status(400).json({ message: 'Error al crear el detalle de venta', error: error.message });
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const detalle = await DetalleVenta.query().where('detalleID', params.id).whereNull('deleted_at').first(); 
      if (!detalle) {
        return response.status(404).json({ message: 'Detalle no encontrado' });
      }
      return response.json(detalle);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener el detalle de venta', error: error.message });
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const detalle = await DetalleVenta.query().where('detalleID', params.id).whereNull('deleted_at').first(); 
      if (!detalle) {
        return response.status(404).json({ message: 'Detalle no encontrado' });
      }

      
      const updateData = request.only(['ventaID', 'productoID', 'cantidad', 'precio_unitario', 'subtotal']);
      detalle.merge(updateData);
      await detalle.save();
      return response.json(detalle);
    } catch (error) {
      return response.status(400).json({ message: 'Error al actualizar el detalle de venta', error: error.message });
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const detalle = await DetalleVenta.query().where('detalleID', params.id).whereNull('deleted_at').first(); 
      if (!detalle) {
        return response.status(404).json({ message: 'Detalle no encontrado' });
      }
      detalle.deletedAt = DateTime.now(); 
      await detalle.save(); 
      
      return response.status(200).json({ message: 'Detalle eliminado con éxito' }); 
    } catch (error) {
      return response.status(500).json({ message: 'Error al eliminar el detalle de venta', error: error.message });
    }
  }
}
