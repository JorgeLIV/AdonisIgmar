import Empleado from '#models/empleado';
import type { HttpContext } from '@adonisjs/core/http';
import { faker } from '@faker-js/faker';

export default class EmpleadosController {
  // Método para obtener todos los empleados
  public async index({ response }: HttpContext) {
    try {
      const empleados = await Empleado.all();
      return response.json(empleados);
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener empleados', error: error.message });
    }
  }

  // Método para crear un empleado nuevo
  public async store({ request, response }: HttpContext) {
    try {
      // Prioridad a los datos del request, usando Faker como respaldo en caso de que falten campos
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

  // Método para mostrar un empleado por ID
  public async show({ params, response }: HttpContext) {
    try {
      const empleado = await Empleado.find(params.id);
      return empleado
        ? response.json(empleado)
        : response.status(404).json({ message: 'Empleado no encontrado' });
    } catch (error) {
      return response.status(500).json({ message: 'Error al obtener el empleado', error: error.message });
    }
  }

  
  public async update({ params, request, response }: HttpContext) {
    try {
      const empleado = await Empleado.findOrFail(params.id);
      const updatedData = request.only(['nombre', 'direccion', 'telefono', 'salario']);  
      if (Object.keys(updatedData).length === 0) {
        return response.status(400).json({ message: 'No se enviaron datos para actualizar' });
      }

      empleado.merge(updatedData);
      await empleado.save();

      return response.json(empleado);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: 'Empleado no encontrado', error: error.message });
      }
      return response.status(500).json({ message: 'Error al actualizar el empleado', error: error.message });
    }
  }


  public async destroy({ params, response }: HttpContext) {
    try {
      const empleado = await Empleado.find(params.id);
      if (!empleado) {
        return response.status(404).json({ message: 'Empleado no encontrado' });
      }
      await empleado.delete();
      return response.status(204).json({ message: 'eliminado con éxito' });
    } catch (error) {
      return response.status(500).json({ message: 'Error al eliminar el empleado', error: error.message });
    }
  }
}
