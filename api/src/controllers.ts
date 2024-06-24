import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function registrarUsuario (options: {nombre: string, correo: string, clave: string, descripcion: string}) {
    try {
        const { nombre, correo, clave, descripcion } = options;
        const usuario = await prisma.user.create({
            data: {nombre, correo, clave, descripcion }
        });
        return 200;
    } catch (error) {
        console.log('Error al registrar usuario');
        return 400;
    }
};

export async function bloquearUsuario (options: {correo: string, clave: string, correo_bloquear: string}) {
    try {
        const { correo, clave, correo_bloquear } = options;
        const user = await prisma.user.findUnique({where: {correo, clave}});
        if(!user) {
            throw new NotFoundError('Usuario no existe');
        }
        const userBlocked = await prisma.user.findUnique({where: {correo: correo_bloquear}});
        if(!userBlocked) {
            throw new NotFoundError('Usuario a bloquear no existe');
        }
        const usuario = await prisma.blocked.create({
            data: { user: {connect: {id: user.id}}, nubBlocked: {
                create: {userBlock: {connect: {id: userBlocked.id}}}
                } }
        });
        return 200;
    } catch (error) {
        console.log('Error al bloquear usuario');
        return 400;
    }
};

export async function login (options: {correo: string, clave: string}) {
    try {
        const { correo, clave, correo_bloquear } = options;
        const usuario = await prisma.user.findUnique({
            where: { correo, clave }
        });
        if(!usuario) {
            throw new NotFoundError('Error de login');
        }

        return 200;
    } catch (error) {
        console.log('Error en peticion');
        return 400;
    }
};

export async function obtenerInformacion (correo: string) {
    try {
        const usuario = await prisma.user.findUnique({
            where: { correo }
        });
        if(!usuario) {
            throw new NotFoundError('Error de login');
        }
        return usuario;
    } catch (error) {
        console.log('Error en peticion');
        return 400;
    }
};

