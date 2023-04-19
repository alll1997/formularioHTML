export function valida (input){
    const tipoDeInput = input.dataset.tipo
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid){
        input.parentElement.classList.remove ("input-container--invalid");
        input.parentElement.querySelector (".input-message-error").innerHTML="";
    } else {
        input.parentElement.classList.add ("input-container--invalid");
        input.parentElement.querySelector (".input-message-error").innerHTML= 
        mostrarMensajeDeError (tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError ={
    nombre:{
        valueMissing: "El campo nombre no puede estar vacío"
    },
    email:{
        valueMissing: "El campo email no puede estar vacío",
        typeMismatch: "Correo no valido"
    },
    password:{
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch: "Al menos 6 a 12 caracteres, debe tener 1 minuscula, 1 mayuscula y 1 número. No usar caracteres especiales, espacios o enter."
    },
    nacimiento:{
        valueMissing: "El campo fecha de nacimiento no puede estar vacío",
        customError: "Debes ser mayor de 18 para registrarte"
    },
    numero:{
        valueMissing: "El campo numero no puede estar vacío",
        patternMismatch: "El formato requerido necesita 10 digitos"
    },
    direccion:{
        valueMissing: "El campo direccion no puede estar vacío",
        patternMismatch: "El formato requerido necesita entre 10 a 40 caracteres"
    },
    ciudad:{
        valueMissing: "El campo ciudad no puede estar vacío",
        patternMismatch: "El formato requerido necesita entre 4 a 15 caracteres"
    },
    estado:{
        valueMissing: "El campo estado no puede estar vacío",
        patternMismatch: "El formato requerido necesita entre 4 a 15 caracteres"
    }
};

const validadores ={
    nacimiento: input => validarNacimiento(input)
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje ="";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date (input.value);
    let mensaje ="";
    if(! mayorDeEdad (fechaCliente)){
        mensaje = "Debes ser mayor de 18 para registrarte"
    }
    input.setCustomValidity (mensaje);
    mayorDeEdad(fechaCliente);
}

function mayorDeEdad (fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date (
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}

