import { Elysia, t } from '@elysiajs/core';
import { PrismaClient } from '@prisma/client';

const app = new Elysia();
const prisma = new PrismaClient();

app.post('/api/registrar', async ({ body }) => {
    const { correo, clave } = body;
    const usuario = await prisma.usuario.create({
        data: { correo, clave }
    });
    return usuario;
}, {
    body: t.Object({
        correo: t.String(),
        clave: t.String()
    })
});

app.post('/api/bloquear', async ({ body }) => {
    const { correo } = body;
    const usuario = await prisma.usuario.update({
        where: { correo },
        data: { bloqueado: true }
    });
    return usuario;
}, {
    body: t.Object({
        correo: t.String()
    })
});

app.get('/api/informacion/:correo', async ({ params }) => {
    const { correo } = params;
    const usuario = await prisma.usuario.findUnique({
        where: { correo },
        select: { correo: true, bloqueado: true }
    });
    return usuario;
});

app.post('/api/marcarcorreo', async ({ body }) => {
    const { correo, clave, id_correo_favorito } = body;
    const usuario = await prisma.usuario.findUnique({ where: { correo } });

    if (usuario && usuario.clave === clave) {
        const correoActualizado = await prisma.correo.update({
            where: { id: id_correo_favorito },
            data: { favorito: true }
        });
        return correoActualizado;
    }
    return { error: 'Autenticación fallida' };
}, {
    body: t.Object({
        correo: t.String(),
        clave: t.String(),
        id_correo_favorito: t.Int()
    })
});

app.delete('/api/desmarcarcorreo', async ({ body }) => {
    const { correo, clave, id_correo_favorito } = body;
    const usuario = await prisma.usuario.findUnique({ where: { correo } });

    if (usuario && usuario.clave === clave) {
        const correoActualizado = await prisma.correo.update({
            where: { id: id_correo_favorito },
            data: { favorito: false }
        });
        return correoActualizado;
    }
    return { error: 'Autenticación fallida' };
}, {
    body: t.Object({
        correo: t.String(),
        clave: t.String(),
        id_correo_favorito: t.Int()
    })
});

app.listen(3000, () => console.log('API corriendo en http://localhost:3000'));
