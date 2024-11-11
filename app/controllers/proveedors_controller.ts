
import Proveedor from '#models/proveedor';
import type { HttpContext } from '@adonisjs/core/http';
import { faker } from '@faker-js/faker';

export default class ProveedoresController {
  
  // Obtener todos los proveedores
  public async index({ response }: HttpContext) {
    try {
      const proveedores = await Proveedor.query().whereNull('deletedAt'); 
      return response.json(proveedores);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener los proveedores', error: error.message });
    }
  }

  
  public async store({ request, response }: HttpContext) {
    try {
      const fakeProveedorData = {
        nombre: faker.company.name(),
        direccion: faker.address.streetAddress(),
        telefono: faker.phone.number(),
        correo: faker.internet.email(),
      };

      const proveedorData = {
        ...fakeProveedorData,
        ...request.only(['nombre', 'direccion', 'telefono', 'correo']),
      };

      const proveedor = await Proveedor.create(proveedorData);
      return response.status(201).json(proveedor);
    } catch (error) {
      return response.status(400).json({ message: 'Error al crear el proveedor', error: error.message });
    }
  }

  
  public async show({ params, response }: HttpContext) {
    try {
      const proveedor = await Proveedor.query().where('proveedorID', params.id).whereNull('deletedAt').first();
      if (!proveedor) {
        return response.status(404).json({ message: 'Proveedor no encontrado' });
      }
      return response.json(proveedor);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener el proveedor', error: error.message });
    }
  }

  
  public async update({ params, request, response }: HttpContext) {
    try {
      const proveedor = await Proveedor.query().where('proveedorID', params.id).whereNull('deletedAt').first();
      if (!proveedor) {
        return response.status(404).json({ message: 'Proveedor no encontrado' });
      }

      const updatedData = request.only(['nombre', 'direccion', 'telefono', 'correo']);
      proveedor.merge(updatedData);
      await proveedor.save();

      return response.json(proveedor);
    } catch (error) {
      return response.status(400).json({ message: 'Error al actualizar el proveedor', error: error.message });
    }
  }

  
  public async destroy({ params, response }: HttpContext) {
    try {
      const proveedor = await Proveedor.query().where('proveedorID', params.id).whereNull('deletedAt').first();
      if (!proveedor) {
        return response.status(404).json({ message: 'Proveedor no encontrado' });
      }

      await proveedor.softDelete(); 
      return response.status(200).json({ message: 'Proveedor eliminado exitosamente' });
    } catch (error) {
      return response.status(500).json({ message: 'Error al eliminar el proveedor', error: error.message });
    }
  }
}
