import Empleado from '#models/empleado';
import type { HttpContext } from '@adonisjs/core/http';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

export default class EmpleadosController {
  
  public async index({ response }: HttpContext) {
    try {
      const empleados = await Empleado.query().whereNull('deleted_at'); 
      return response.json(empleados);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener empleados', error: error.message });
    }
  }

  
  public async store({ request, response }: HttpContext) {
    try {
     
      const datosEmpleado = {
        nombre: request.input('nombre') || faker.name.fullName(),
        direccion: request.input('direccion') || faker.address.streetAddress(),
        telefono: request.input('telefono') || `${faker.phone.number().slice(0, 10)}`,
        salario: request.input('salario') || faker.number.int({ min: 1, max: 10000 }),
      };

      const empleado = await Empleado.create(datosEmpleado);
      return response.status(201).json(empleado);
    } catch (error) {
      return response.status(400).json({ message: 'Error al crear el empleado', error: error.message });
    }
  }

  
  public async show({ params, response }: HttpContext) {
    try {
      const empleado = await Empleado.query().where('empleadoID', params.id).whereNull('deleted_at').first();
      return empleado
        ? response.json(empleado)
        : response.status(404).json({ message: 'Empleado no encontrado' });
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener el empleado', error: error.message });
    }
  }

  
  public async update({ params, request, response }: HttpContext) {
    try {
      const empleado = await Empleado.query().where('empleadoID', params.id).whereNull('deleted_at').first();
      if (!empleado) {
        return response.status(404).json({ message: 'Empleado no encontrado' });
      }

      const updatedData = request.only(['nombre', 'direccion', 'telefono', 'salario']);
      if (Object.keys(updatedData).length === 0) {
        return response.status(400).json({ message: 'No se enviaron datos para actualizar' });
      }

      empleado.merge(updatedData);
      await empleado.save();

      return response.json(empleado);
    } catch (error) {
      return response.status(500).json({ message: 'Error al actualizar el empleado', error: error.message });
    }
  }

  
  public async destroy({ params, response }: HttpContext) {
    try {
      const empleado = await Empleado.query().where('empleadoID', params.id).whereNull('deleted_at').first();
      if (!empleado) {
        return response.status(404).json({ message: 'Empleado no encontrado' });
      }

      
      empleado.deletedAt = DateTime.local(); 
      await empleado.save();

      return response.status(200).json({ message: 'Empleado eliminado con éxito' });
    } catch (error) {
      return response.status(500).json({ message: 'Error al eliminar el empleado', error: error.message });
    }
  }
}
