import jwt from 'jsonwebtoken';
import Veterinario from '../models/Veterinario.js';

const checkAut = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.veterinario = await Veterinario.findById(decoded.id).select(
                "-password -token -confirmado"
            );

            return next(); // ✅ continúa si todo está bien
        } catch (error) {
            const e = new Error('El token no es válido');
            return res.status(403).json({ msg: e.message }); // ✅ se detiene aquí
        }
    }

    if (!token) {
        const error = new Error('El token no es válido o es inexistente');
        return res.status(403).json({ msg: error.message }); // ✅ se detiene aquí también
    }
};

export default checkAut;


