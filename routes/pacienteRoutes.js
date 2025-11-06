    import express from 'express'
    const router = express.Router()
    import {
        agregarPaciente,
        obtenerPacientes,
        obtenerPaciente,
        actualizarPaciente,
        eliminarPaciente,
    } from '../controllers/pacienteController.js';
    import checkAut from '../middleware/authMiddleware.js';

    router.route('/')
        .post(checkAut, agregarPaciente)
        .get(checkAut, obtenerPacientes);

    router
        .route('/:id')
        .get( checkAut,   obtenerPaciente)
        .put(checkAut, actualizarPaciente)
        .delete(checkAut, eliminarPaciente)
    export default router;  