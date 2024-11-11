import Producto from '#models/producto';
import type { HttpContext } from '@adonisjs/core/http';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

export default class ProductosController {
  public async index({ response }: HttpContext) {
    try {
      const productos = await Producto.query().whereNull('deleted_at'); 
      return response.json(productos);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const fakeProductoData = {
        nombre: faker.commerce.productName(),
        stock: faker.number.int({ min: 1, max: 100 }),
        precio: parseFloat(faker.commerce.price()),
        descripcion: faker.commerce.productDescription(),
        fechaIngreso: DateTime.fromJSDate(faker.date.recent()),
      };

      const productoData = {
        ...request.only(['nombre', 'stock', 'precio', 'descripcion', 'fechaIngreso']),
        ...fakeProductoData,
        deletedAt: null,
      };

      const producto = await Producto.create(productoData);
      return response.status(201).json(producto);
    } catch (error) {
      return response.status(400).json({ message: 'Error al crear el producto', error: error.message });
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const producto = await Producto.query().where('productoID', params.id).whereNull('deleted_at').first();
      if (!producto) {
        return response.status(404).json({ message: 'Producto no encontrado' });
      }
      return response.json(producto);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const producto = await Producto.query().where('productoID', params.id).whereNull('deleted_at').first();
      if (!producto) {
        return response.status(404).json({ message: 'Producto no encontrado' });
      }
      const updatedData = request.only(['nombre', 'stock', 'precio', 'descripcion', 'fechaIngreso']);

      if (updatedData.fechaIngreso) {
        updatedData.fechaIngreso = DateTime.fromISO(updatedData.fechaIngreso);
      }

      producto.merge(updatedData);
      await producto.save();

      return response.json(producto);
    } catch (error) {
      return response.status(400).json({ message: 'Error al actualizar el producto', error: error.message });
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const producto = await Producto.find(params.id);
      if (!producto) {
        return response.status(404).json({ message: 'Producto no encontrado' });
      }
      
      await producto.softDelete();
      
     
      return response.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
      return response.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
  }
}
