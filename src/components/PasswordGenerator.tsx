import React, { useState } from "react";

interface PasswordOptions{ // creo una interfaz para que no se mezclen los datos a usar
  longitud: number
  incluirSimbolos: boolean
  incluirMayusculas: boolean
  incluirNumeros: boolean
}

const generadorPassword = (opciones:PasswordOptions) : string =>{ // genero la funcion generador de password y hago un if con ternario para la eleccion de con mayuscula o no etc
  const {longitud, incluirSimbolos,incluirMayusculas,incluirNumeros} = opciones
  const letrasMayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
  const numeros = "0123456789";
  const simbolos = "!@#$%^&*()-_+=";

  const caracteres = letrasMinusculas + (incluirSimbolos ? simbolos : "") + (incluirMayusculas ? letrasMayusculas : "") + (incluirNumeros ? numeros : "");
  let password = "";

  for(let i=0; i< longitud; i++){ //for para generar la contraseña con math.random
    const randomIndex = Math.floor(Math.random() * caracteres.length);
    password += caracteres[randomIndex];
  }
  return password
};

const PasswordGenerator: React.FC = () =>{ // hago la funcion que incluye estados para un mejor control y rendimiento y que retorna toda la parte grafica
  const [passwordLongitud, setPasswordLongitud] = useState(6);
  const [incluyeSimbolos, setIncluyeSimbolos] = useState(false)
  const [incluyeMayusculas, setIncluyeMayusculas] = useState(false)
  const [incluyeNumeros, setIncluyeNumeros] = useState(false)
  const [password, setPassword] = useState("")

  const handleGenerarPassword = () =>{ // aca genera la contraseña al hacer click y le paso por parametros los estados
    const nuevaPassword = generadorPassword({longitud:passwordLongitud, incluirSimbolos:incluyeSimbolos, incluirMayusculas:incluyeMayusculas,incluirNumeros:incluyeNumeros})
    setPassword(nuevaPassword);
  }

  const handleCopiarPortapapeles = ()=>{
    navigator.clipboard.writeText(password);
    alert("Contraseña copiada con éxito al portapapeles");
  }
  return ( //retorna todo el front y los botones de check, generar contraseña y copiar para poder hacer uso de las funciones handle
    <div className="flex justify-center items-center h-screen bg-gradient-to-t from-cyan-500 to-blue-500">
      <div className=" bg-blue-300 p-5 rounded-md mx-2">
        <h2 className="text-center mb-5">
          <strong>¡Bienvenido al generador de contraseñas!</strong>
        </h2>
        <label className="md:block mb-4 flex items-center">
          Longitud de la contraseña:
          <input
            id="longitud-contra"
            type="number"
            value={passwordLongitud}
            onChange={(e) => setPasswordLongitud(Number(e.target.value))}
            className="ml-2 p-2 border border-blue-600 rounded"
          />
        </label>
        <label className="block mb-4 ">
          <input
            id="simbolos"
            type="checkbox"
            checked={incluyeSimbolos}
            onChange={(e) => setIncluyeSimbolos(e.target.checked)}
            className="mr-2"
          />
          Incluir símbolos
        </label>
        <label className="block mb-4 ">
          <input
            id="mayusculas"
            type="checkbox"
            checked={incluyeMayusculas}
            onChange={(e) => setIncluyeMayusculas(e.target.checked)}
            className="mr-2"
          />
          Incluir Mayúsculas
        </label>
        <label className="block mb-4 ">
          <input
            id="numeros"
            type="checkbox"
            checked={incluyeNumeros}
            onChange={(e) => setIncluyeNumeros(e.target.checked)}
            className="mr-2"
          />
          Incluir números
        </label>
        <div className="flex">
          <button
          onClick={handleGenerarPassword}
          className="bg-pink-400 hover:bg-pink-300 duration-500 text-white px-4 md:py-2 rounded mr-16"
        >
          Generar contraseña
        </button>
        <button
          onClick={handleCopiarPortapapeles}
          disabled={!password}
          className="bg-cyan-600 hover:bg-cyan-500 duration-500 text-white px-4 py-2 rounded"
        >
          Copiar contraseña
        </button>
        </div>

        <div className="mt-4">
         Contraseña: <strong>{password}</strong>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
