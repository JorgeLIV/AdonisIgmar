/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import jwt from 'jsonwebtoken'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

import AuthController from '#controllers/auth_controller'
import CategoriaControlador from '#controllers/categorias_controller'
import ClienteControlador from '#controllers/clientes_controller'
import CompraControlador from '#controllers/compras_controller'
import DetalleCompraControlador from '#controllers/detalles_compras_controller'
import DetalleVentaControlador from '#controllers/detalles_ventas_controller'
import EmpleadoControlador from '#controllers/empleados_controller'
import InventarioControlador from '#controllers/inventarios_controller'
import ProductoControlador from '#controllers/productos_controller'
import PromocionesControlador from '#controllers/promociones_controller'
import ProveedoresControlador from '#controllers/proveedors_controller'
import VentasControlador from '#controllers/ventas_controller'
import ApiController from '#controllers/api_controller';




router.post('/registrar', [AuthController, 'register'])
router.post('/login', [AuthController, 'login']) 


router.get('/verificarDatos', [ApiController, 'obtenerDatos']);
router.get('/verificar', [ApiController, 'obtener']);




// Rutas para categorías
//embono
router.get('/categorias', [CategoriaControlador, 'index']).use(middleware.auth());
router.post('/categorias', [CategoriaControlador, 'store']).use(middleware.auth());
router.get('/categorias/:id', [CategoriaControlador, 'show']).use(middleware.auth());
router.put('/categorias/:id', [CategoriaControlador, 'update']).use(middleware.auth());
router.delete('/categorias/:id', [CategoriaControlador, 'destroy']).use(middleware.auth());

// Rutas para clientes
//embono

// Rutas para clientes
router.get('/clientes', [ClienteControlador, 'index']).use(middleware.auth());
router.post('/clientes', [ClienteControlador, 'store']).use(middleware.auth());
router.get('/clientes/:id', [ClienteControlador, 'show']).use(middleware.auth());
router.put('/clientes/:id', [ClienteControlador, 'update']).use(middleware.auth());
router.delete('/clientes/:id', [ClienteControlador, 'destroy']).use(middleware.auth());

// Rutas para compras
//embono
router.get('/compras', [CompraControlador, 'index']).use(middleware.auth());
router.post('/compras', [CompraControlador, 'store']).use(middleware.auth());
router.get('/compras/:id', [CompraControlador, 'show']).use(middleware.auth());
router.put('/compras/:id', [CompraControlador, 'update']).use(middleware.auth());
router.delete('/compras/:id', [CompraControlador, 'destroy']).use(middleware.auth());

// Rutas para detalles de compra
//embono
router.get('/detalles-compras', [DetalleCompraControlador, 'index']).use(middleware.auth());
router.post('/detalles-compras', [DetalleCompraControlador, 'store']).use(middleware.auth());
router.get('/detalles-compras/:id', [DetalleCompraControlador, 'show']).use(middleware.auth());
router.put('/detalles-compras/:id', [DetalleCompraControlador, 'update']).use(middleware.auth());
router.delete('/detalles-compras/:id', [DetalleCompraControlador, 'destroy']).use(middleware.auth());

// Rutas para detalles de venta
//embono
router.get('/detalles-ventas', [DetalleVentaControlador, 'index']).use(middleware.auth());
router.post('/detalles-ventas', [DetalleVentaControlador, 'store']).use(middleware.auth());
router.get('/detalles-ventas/:id', [DetalleVentaControlador, 'show']).use(middleware.auth());
router.put('/detalles-ventas/:id', [DetalleVentaControlador, 'update']).use(middleware.auth());
router.delete('/detalles-ventas/:id', [DetalleVentaControlador, 'destroy']).use(middleware.auth());

// Rutas para empleados
router.get('/empleados', [EmpleadoControlador, 'index']).use(middleware.auth());
router.post('/empleados', [EmpleadoControlador, 'store']).use(middleware.auth());
router.get('/empleados/:id', [EmpleadoControlador, 'show']).use(middleware.auth());
router.put('/empleados/:id', [EmpleadoControlador, 'update']).use(middleware.auth());
router.delete('/empleados/:id', [EmpleadoControlador, 'destroy']).use(middleware.auth());

// Rutas para inventarios
router.get('/inventarios', [InventarioControlador, 'index']).use(middleware.auth());
router.post('/inventarios', [InventarioControlador, 'store']).use(middleware.auth());
router.get('/inventarios/:id', [InventarioControlador, 'show']).use(middleware.auth());
router.put('/inventarios/:id', [InventarioControlador, 'update']).use(middleware.auth());
router.delete('/inventarios/:id', [InventarioControlador, 'destroy']).use(middleware.auth());

// Rutas para productos
router.get('/productos', [ProductoControlador, 'index']).use(middleware.auth());
router.post('/productos', [ProductoControlador, 'store']).use(middleware.auth());
router.get('/productos/:id', [ProductoControlador, 'show']).use(middleware.auth());
router.put('/productos/:id', [ProductoControlador, 'update']).use(middleware.auth());
router.delete('/productos/:id', [ProductoControlador, 'destroy']).use(middleware.auth());

// Rutas para promociones
router.get('/promociones', [PromocionesControlador, 'index']).use(middleware.auth());
router.post('/promociones', [PromocionesControlador, 'store']).use(middleware.auth());
router.get('/promociones/:id', [PromocionesControlador, 'show']).use(middleware.auth());
router.put('/promociones/:id', [PromocionesControlador, 'update']).use(middleware.auth());
router.delete('/promociones/:id', [PromocionesControlador, 'destroy']).use(middleware.auth());

// Rutas para proveedores
router.get('/proveedores', [ProveedoresControlador, 'index']).use(middleware.auth());
router.post('/proveedores', [ProveedoresControlador, 'store']).use(middleware.auth());
router.get('/proveedores/:id', [ProveedoresControlador, 'show']).use(middleware.auth());
router.put('/proveedores/:id', [ProveedoresControlador, 'update']).use(middleware.auth());
router.delete('/proveedores/:id', [ProveedoresControlador, 'destroy']).use(middleware.auth());


// Rutas para proveedores
router.get('/ventas', [VentasControlador, 'index']).use(middleware.auth());
router.post('/ventas', [VentasControlador, 'store']).use(middleware.auth());
router.get('/ventas/:id', [VentasControlador, 'show']).use(middleware.auth());
router.put('/ventas/:id', [VentasControlador, 'update']).use(middleware.auth());
router.delete('/ventas/:id', [VentasControlador, 'destroy']).use(middleware.auth());



router.post('/verify-token', async ({ request, response }) => {
  const token = request.input('token')
  console.log('JWT_SECRET:', process.env.JWT_SECRET)
  try {
    const secret = process.env.JWT_SECRET
    if (!secret) {
      return response.status(500).json({ error: 'JWT_SECRET is not defined' })
    }
    const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] })
    return response.json({
      message: 'Token válido',
      user: decoded, 
    })
  } catch (error) {
    return response.status(401).json({ error: 'Token inválido o expirado' })
  }
})