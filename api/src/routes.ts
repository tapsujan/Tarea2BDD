import { Elysia } from 'elysia';

const postsRoutes = new Elysia({ prefix: '/api' })
  .post('/registrar', () => 'Registrar usuario')
  .post('/bloquear', () => 'Bloquear usuario')
  .get('/informacion/:correo', () => 'Obtener informacion usuario')
  .get('/login/:correo', () => 'Login usuario')
  .post('/marcarcorreo', () => 'Marcar correo favorito')
  .delete('/desmarcarcorreo', () => 'Desmarcar correo favorito');

export default postsRoutes;
