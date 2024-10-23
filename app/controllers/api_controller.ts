import axios from 'axios';
import type { HttpContext } from '@adonisjs/core/http';

export default class ApiController {
  public async obtener({ response }: HttpContext) {
    const apiLaravel1 = 'http://192.168.1.99:8000/api/equipos/'; // ERICK
    const apiAdonis2 = 'http://192.168.1.167:3333/actores'; // OMAR
    const apiLaravel3 = 'http://192.168.1.135:8000/api/personas'; // DANI
    const apiAdonis4 = 'http://192.168.1.149:3333/categorias'; // JORGE

    
    const resultados = {
      laravel1: { status: 'error' },
      adonis2: { status: 'error' },
      laravel3: { status: 'error' },
      adonis4: { status: 'error' },
    };

    try {
      await axios.get(apiLaravel1);
      resultados.laravel1.status = 'success';
    } catch (error) {
      console.error('Error en la API de Laravel 1:', error.message);
    }

    try {
      await axios.get(apiAdonis2);
      resultados.adonis2.status = 'success';
    } catch (error) {
      console.error('Error en la API de Adonis 2:', error.message);
    }

    try {
      await axios.get(apiLaravel3);
      resultados.laravel3.status = 'success';
    } catch (error) {
      console.error('Error en la API de Laravel 3:', error.message);
    }

    try {
      await axios.get(apiAdonis4);
      resultados.adonis4.status = 'success';
    } catch (error) {
      console.error('Error en la API de Adonis 4:', error.message);
    }

    return response.json({
      status: 'completed',
      results: resultados,
    });
  }

  public async obtenerDatos({ response }: HttpContext) {
    const apiLaravel1 = 'http://192.168.1.99:8000/api/J_equipos'; // ERICK
    const apiAdonis2 = 'http://192.168.1.167:3333/actores'; // OMAR
    const apiLaravel3 = 'http://192.168.1.135:8000/api/personas'; // DANI
    const apiAdonis4 = 'http://192.168.1.149:3333/categorias'; // JORGE

    const resultados = {
      laravel1: { status: 'error', data: null },
      adonis2: { status: 'error', data: null },
      laravel3: { status: 'error', data: null },
      adonis4: { status: 'error', data: null },
    };

    try {
      const responseLaravel1 = await axios.get(apiLaravel1);
      resultados.laravel1.status = 'success';
      resultados.laravel1.data = responseLaravel1.data;
    } catch (error) {
      console.error('Error en la API de Laravel 1:', error.message);
    }

    try {
      const responseAdonis2 = await axios.get(apiAdonis2);
      resultados.adonis2.status = 'success';
      resultados.adonis2.data = responseAdonis2.data;
    } catch (error) {
      console.error('Error en la API de Adonis 2:', error.message);
    }

    try {
      const responseLaravel3 = await axios.get(apiLaravel3);
      resultados.laravel3.status = 'success';
      resultados.laravel3.data = responseLaravel3.data;
    } catch (error) {
      console.error('Error en la API de Laravel 3:', error.message);
    }

    try {
      const responseAdonis4 = await axios.get(apiAdonis4);
      resultados.adonis4.status = 'success';
      resultados.adonis4.data = responseAdonis4.data;
    } catch (error) {
      console.error('Error en la API de Adonis 4:', error.message);
    }

    return response.json({
      status: 'completed',
      results: resultados,
    });
  }
}
