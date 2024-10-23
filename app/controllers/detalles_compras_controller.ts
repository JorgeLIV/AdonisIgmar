import DetalleCompra from '#models/detalle_compra';
import { HttpContext } from '@adonisjs/core/http';
import { faker } from '@faker-js/faker';

export default class DetallesComprasController {
  public async index({ response }: HttpContext) {
    try {
      const detallesCompras = await DetalleCompra.all();
      return response.json(detallesCompras);
    } catch (error) {
      return response.status(500).json({
        message: 'Error al obtener los detalles de compras',
        error: error.message,
      });
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const compraID = request.input('compraID');
      const productoID = request.input('productoID');

      if (!compraID || !productoID) {
        return response.status(400).json({
          message: 'compraID o productoID faltantes en la solicitud',
        });
      }
      const fakeDetalleData = {
        cantidad: faker.number.int({ min: 1, max: 100 }),
        precio_unitario: parseFloat(faker.commerce.price()),
        subtotal: parseFloat(faker.commerce.price()),
        compraID, 
        productoID,
      };

      // Creamos el registro en la base de datos
      const detalleCompra = await DetalleCompra.create(fakeDetalleData);
      return response.status(201).json(detalleCompra);
    } catch (error) {
      return response.status(400).json({
        message: 'Error al crear el detalle de compra',
        error: error.message,
      });
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const detalleCompra = await DetalleCompra.find(params.id);
      if (!detalleCompra) {
        return response.status(404).json({
          message: 'Detalle de compra no encontrado',
        });
      }
      return response.json(detalleCompra);
    } catch (error) {
      return response.status(500).json({
        message: 'Error al obtener el detalle de compra',
        error: error.message,
      });
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const detalleCompra = await DetalleCompra.find(params.id);
      if (!detalleCompra) {
        return response.status(404).json({
          message: 'Detalle de compra no encontrado',
        });
      }

      detalleCompra.merge(
        request.only(['cantidad', 'precio_unitario', 'subtotal', 'compraID', 'productoID'])
      );
      await detalleCompra.save();
      return response.json(detalleCompra);
    } catch (error) {
      return response.status(400).json({
        message: 'Error al actualizar el detalle de compra',
        error: error.message,
      });
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const detalleCompra = await DetalleCompra.find(params.id);
      if (!detalleCompra) {
        return response.status(404).json({
          message: 'Detalle de compra no encontrado',
        });
      }
      await detalleCompra.delete();
      return response.status(204).json({ message: 'eliminado con éxito' })
    } catch (error) {
      return response.status(500).json({
        message: 'Error al eliminar el detalle de compra',
        error: error.message,
      });
    }
  }
}
