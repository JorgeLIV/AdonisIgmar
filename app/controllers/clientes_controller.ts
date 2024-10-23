import Cliente from '#models/cliente';
import type { HttpContext } from '@adonisjs/core/http';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

export default class ClientesController {
  // Obtener todos los clientes
  public async index({ response }: HttpContext) {
    try {
      const clientes = await Cliente.all();
      return response.json(clientes);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener los clientes', error: error.message });
    }
  }

  // Crear un nuevo cliente
  public async store({ request, response }: HttpContext) {
    try {
      // Generar datos falsos usando Faker
      const fakeClienteData = {
        nombre: faker.name.fullName(),
        direccion: faker.address.streetAddress(),
        telefono: faker.phone.number(), // Número de teléfono en cualquier formato
        fecha_registro: DateTime.fromJSDate(faker.date.past()).toISODate(),
      };

      // Obtener los datos enviados en la solicitud, y usar los datos falsos si no se envían
      const clienteData = { 
        ...fakeClienteData,  // Faker data
        ...request.only(['nombre', 'direccion', 'telefono', 'fecha_registro']),  // Datos de la solicitud
      };

      // Crear el cliente en la base de datos
      const cliente = await Cliente.create(clienteData);
      return response.status(201).json(cliente);
    } catch (error) {
      return response.status(400).json({ message: 'Error al crear el cliente', error: error.message });
    }
  }

  // Mostrar un cliente por ID
  public async show({ params, response }: HttpContext) {
    try {
      const cliente = await Cliente.find(params.id);
      if (!cliente) {
        return response.status(404).json({ message: 'Cliente no encontrado' });
      }
      return response.json(cliente);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener el cliente', error: error.message });
    }
  }

  // Actualizar un cliente por ID
  public async update({ params, request, response }: HttpContext) {
    try {
      const cliente = await Cliente.find(params.id);
      if (!cliente) {
        return response.status(404).json({ message: 'Cliente no encontrado' });
      }

      // Obtener los datos enviados en la solicitud
      const updatedData = request.only(['nombre', 'direccion', 'telefono', 'fecha_registro']);

      // Actualizar los datos del cliente
      cliente.merge(updatedData);
      await cliente.save();

      return response.json(cliente);
    } catch (error) {
      return response.status(400).json({ message: 'Error al actualizar el cliente', error: error.message });
    }
  }

  // Eliminar un cliente por ID
  public async destroy({ params, response }: HttpContext) {
    try {
      const cliente = await Cliente.find(params.id);
      if (!cliente) {
        return response.status(404).json({ message: 'Cliente no encontrado' });
      }
      await cliente.delete();
      return response.status(204).json(null); // No content
    } catch (error) {
      return response.status(500).json({ message: 'Error al eliminar el cliente', error: error.message });
    }
  }
}
