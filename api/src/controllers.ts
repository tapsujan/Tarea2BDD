import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();

export const registrarUsuario = async (req: express.Request, res: express.Response) => {
    const { correo, clave } = req.body;
    try {
        const usuario = await prisma.usuario.create({
            data: { correo, clave },
        });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

export const bloquearUsuario = async (req: express.Request, res: express.Response) => {
    const { correo } = req.body;
    try {
        const usuario = await prisma.usuario.update({
            where: { correo },
            data: { bloqueado: true },
        });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al bloquear usuario' });
    }
};

export const obtenerInformacion = async (req: express.Request, res: express.Response) => {
    const { correo } = req.params;
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { correo },
            select: { correo: true, bloqueado: true, favoritos: true },
        });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener información del usuario' });
    }
};

export const login = async (req: express.Request, res: express.Response) => {
    const { correo, clave } = req.params;
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { correo, clave },
            select: { correo: true, clave: true },
        });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error en el login del usuario' });
    }
};

export const marcarCorreoFavorito = async (req: express.Request, res: express.Response) => {
    const { correo, id_correo_favorito } = req.body;
    try {
        const usuario = await prisma.usuario.update({
            where: { correo },
            data: { favoritos: { connect: { id: id_correo_favorito } } },
        });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al marcar correo como favorito' });
    }
};

export const desmarcarCorreoFavorito = async (req: express.Request, res: express.Response) => {
    const { correo, id_correo_favorito } = req.body;
    try {
        const usuario = await prisma.usuario.update({
            where: { correo },
            data: { favoritos: { disconnect: { id: id_correo_favorito } } },
        });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al desmarcar correo como favorito' });
    }
};
