import express, { Request, Response, Express } from 'express';
import { PrismaClient } from '@prisma/client';

const app: Express = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('/api/registrar', async (req: Request, res: Response) => {
    const { nombre, correo, clave, descripcion } = req.body;
    try {
        const user = await prisma.user.create({
            data: { nombre, correo, clave, descripcion },
        });
        res.status(200).json({ estado: 200, mensaje: 'Usuario registrado correctamente', user });
    } catch (error) {
        res.status(400).json({ estado: 400, mensaje: 'Error al registrar usuario', error });
    }
});

app.post('/api/bloquear', async (req: Request, res: Response) => {
    const { correo, clave, correo_bloquear } = req.body;
    try {
        const user = await prisma.user.update({
            where: { correo: correo_bloquear },
            data: { bloqueado: true },
        });
        res.status(200).json({ estado: 200, mensaje: 'Usuario bloqueado correctamente', user });
    } catch (error) {
        res.status(400).json({ estado: 400, mensaje: 'Error al bloquear usuario', error });
    }
});

app.get('/api/informacion/:correo', async (req: Request, res: Response) => {
    const { correo } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { correo },
        });
        res.status(200).json({ estado: 200, user });
    } catch (error) {
        res.status(400).json({ estado: 400, mensaje: 'Error al obtener información del usuario', error });
    }
});

app.post('/api/marcarcorreo', async (req: Request, res: Response) => {
    const { correo, clave, id_correo_favorito } = req.body;
    try {
        const favorite = await prisma.favorite.create({
            data: { userCorreo: correo, correoId: id_correo_favorito },
        });
        res.status(200).json({ estado: 200, mensaje: 'Correo marcado como favorito correctamente', favorite });
    } catch (error) {
        res.status(400).json({ estado: 400, mensaje: 'Error al marcar correo como favorito', error });
    }
});

app.delete('/api/desmarcarcorreo', async (req: Request, res: Response) => {
    const { correo, clave, id_correo_favorito } = req.body;
    try {
        const favorite = await prisma.favorite.delete({
            where: { userCorreo_correoId: { userCorreo: correo, correoId: id_correo_favorito } },
        });
        res.status(200).json({ estado: 200, mensaje: 'Correo desmarcado como favorito correctamente', favorite });
    } catch (error) {
        res.status(400).json({ estado: 400, mensaje: 'Error al desmarcar correo como favorito', error });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
