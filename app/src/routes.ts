import express from 'express';
import { registrarUsuario, bloquearUsuario, obtenerInformacion, marcarCorreoFavorito, desmarcarCorreoFavorito } from './controllers';

const router = express.Router();

router.post('/registrar', registrarUsuario);
router.post('/bloquear', bloquearUsuario);
router.get('/informacion/:correo', obtenerInformacion);
router.post('/marcarcorreo', marcarCorreoFavorito);
router.delete('/desmarcarcorreo', desmarcarCorreoFavorito);

export const routes = router;
