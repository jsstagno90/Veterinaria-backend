import express from 'express'
import {
    perfil,
    registrar,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
} from '../controllers/veterinarioController.js'
import checkAut from '../middleware/authMiddleware.js';

const router = express.Router();

//Area Publica
router.post('/', registrar);

router.get('/confirmar/:token', confirmar);

router.post('/login', autenticar);

router.post('/olvide-password', olvidePassword);

router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)



//Area Privada
router.get('/perfil', checkAut, perfil);

export default router;