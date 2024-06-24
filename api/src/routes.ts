import { Elysia } from 'elysia';
import { registrarUsuario, bloquearUsuario, login, obtenerInformacion } from './controllers.ts'

const postsRoutes = new Elysia({ prefix: '/api' })
  .post('/registrar', ({body}) => registrarUsuario(body))
  .post('/bloquear', ({body}) => bloquearUsuario(body))
  .get('/informacion/:correo', ({params: {correo}}) => obtenerInformacion(correo))
  .post('/login', ({body}) => login(body))
  .post('/marcarcorreo', () => 'Marcar correo favorito')
  .delete('/desmarcarcorreo', () => 'Desmarcar correo favorito');

export default postsRoutes;
