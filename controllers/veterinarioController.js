import Veterinario from "../models/veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";

const registrar = async (req, res) => {

    const { email , nombre} = req.body


    // Prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne({ email })


    if (existeUsuario) {
        const error = new Error('Usuario ya registrado!')
        return res.status(400).json({ msg: error.message })
    }
    try {
        //guardar nuevo veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save()

        //ENVIAR EMAIL
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        })

        res.json(veterinarioGuardado)
    } catch (error) {
        console.log(error)
    }



};

const perfil = (req, res) => {
    const { veterinario } = req;
    res.json({ veterinario })
}

const confirmar = async (req, res) => {
    const { token } = req.params

    const usuarioConfirmar = await Veterinario.findOne({ token })

    if (!usuarioConfirmar) {
        const error = new Error('Token no valido')
        return res.status(404).json({ msg: error.message })
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true
        await usuarioConfirmar.save()
        res.json({ msg: 'Usuario Confirmado' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al confirmar el usuario' })
    }


}


const autenticar = async (req, res) => {
    const { email, password } = req.body

    //comprobar si existe el usuario

    const usuario = await Veterinario.findOne({ email })

    if (!usuario) {
        const error = new Error('El usuario no existe')
        return res.status(404).json({ msg: error.message })
    }

    //comprobar si el usuario esta confirmado via token
    if (!usuario.confirmado) {
        const error = new Error('Tu cuenta no está confirmada. Revisa tu correo para activarla.')
        return res.status(403).json({ msg: error.message })
    }

    //Revisar el password
    if (await usuario.comprobarPassword(password)) {
        console.log(usuario)
        //Autenticar
        res.json({ token: generarJWT(usuario.id) })

    } else {
        const error = new Error('Password incorrecto')
        return res.status(403).json({ msg: error.message })
    }



    //Autenticar usuario

};

const olvidePassword = async (req, res) => {
    const { email } = req.body
    const existeVeterinario = await Veterinario.findOne({ email })
    if (!existeVeterinario) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({ msg: error.message })
    }

    try {
        existeVeterinario.token = generarId()
        await existeVeterinario.save()
        res.json({ msg: ' Hemos enviado un mail con las instrucciones' })
    } catch (error) {
        console.log(error)
    }
};

const comprobarToken = async (req, res) => {
    const { token } = req.params;

    const tokenValido = await Veterinario.findOne({ token });

    if (tokenValido) {
        //Token  valido el usuario existe
        res.json({ msg: 'Token valido el usuario existe' })
    } else {
        const error = new Error('Token no valido')
        return res.status(400).json({ msg: error.message });
    }

    console.log(token)
};

const nuevoPassword = async (req, res) => {

    const { token } = req.params
    const { password } = req.body
    console.log(token)
    const veterinario = await Veterinario.findOne({ token })
    if (!veterinario) {
        const error = new Error('Hubo un error')
        return res.status(400).json({ msg: error.message })
    }

    try {
        veterinario.token = null
        veterinario.password = password
         await veterinario.save()
         res.json({msg: 'Password modificado correctamente'})
    } catch (error) {
        console.log(error)
    }
};
export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
}