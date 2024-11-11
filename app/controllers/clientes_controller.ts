import Cliente from '#models/cliente';
import type { HttpContext } from '@adonisjs/core/http';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

export default class ClientesController {
  public async index({ response }: HttpContext) {
    try {
      const clientes = await Cliente.query().whereNull('deletedAt');
      return response.json(clientes);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener los clientes', error: error.message });
    }
  }

  
  public async store({ request, response }: HttpContext) {
    try {
      const fakeClienteData = {
        nombre: faker.name.fullName(),
        direccion: faker.address.streetAddress(),
        telefono: faker.phone.number(), 
        fecha_registro: DateTime.fromJSDate(faker.date.past()).toISODate(),
      };


      const clienteData = { 
        ...fakeClienteData,  
        ...request.only(['nombre', 'direccion', 'telefono', 'fecha_registro']),  
      };

      const cliente = await Cliente.create(clienteData);
      return response.status(201).json(cliente);
    } catch (error) {
      return response.status(400).json({ message: 'Error al crear el cliente', error: error.message });
    }
  }

  
  public async show({ params, response }: HttpContext) {
    try {
      const cliente = await Cliente.query().where('clienteID', params.id).whereNull('deletedAt').first();
      if (!cliente) {
        return response.status(404).json({ message: 'Cliente no encontrado' });
      }
      return response.json(cliente);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener el cliente', error: error.message });
    }
  }

  
  public async update({ params, request, response }: HttpContext) {
    try {
      const cliente = await Cliente.query().where('clienteID', params.id).whereNull('deletedAt').first();
      if (!cliente) {
        return response.status(404).json({ message: 'Cliente no encontrado' });
      }

      
      const updatedData = request.only(['nombre', 'direccion', 'telefono', 'fecha_registro']);

      
      cliente.merge(updatedData);
      await cliente.save();

      return response.json(cliente);
    } catch (error) {
      return response.status(400).json({ message: 'Error al actualizar el cliente', error: error.message });
    }
  }

  
  public async destroy({ params, response }: HttpContext) {
    try {
      const cliente = await Cliente.find(params.id);
      if (!cliente) {
        return response.status(404).json({ message: 'Cliente no encontrado' });
      }

      await cliente.softDelete(); 
      return response.status(200).json({ message: 'Cliente eliminado con éxito' }); 
    } catch (error) {
      return response.status(500).json({ message: 'Error al eliminar el cliente', error: error.message });
    }
  }
}
