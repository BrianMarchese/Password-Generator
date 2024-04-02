import React, { useState } from "react";

interface PasswordOptions{
  longitud: number
  incluirSimbolos: boolean
  incluirMayusculas: boolean
  incluirNumeros: boolean
}

const generadorPassword = (opciones:PasswordOptions) : string =>{
  const {longitud, incluirSimbolos,incluirMayusculas,incluirNumeros} = opciones
  const letrasMayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
  const numeros = "0123456789";
  const simbolos = "!@#$%^&*()-_+=";

  const caracteres = letrasMinusculas + (incluirSimbolos ? simbolos : "") + (incluirMayusculas ? letrasMayusculas : "") + (incluirNumeros ? numeros : "");
  let password = "";

  for(let i=0; i< longitud; i++){
    const randomIndex = Math.floor(Math.random() * caracteres.length);
    password += caracteres[randomIndex];
  }
  return password
};

const PasswordGenerator: React.FC = () =>{
  const [passwordLongitud, setPasswordLongitud] = useState(6);
  const [incluyeSimbolos, setIncluyeSimbolos] = useState(false)
  const [incluyeMayusculas, setIncluyeMayusculas] = useState(false)
  const [incluyeNumeros, setIncluyeNumeros] = useState(false)
  const [password, setPassword] = useState("")

  const handleGenerarPassword = () =>{
    const nuevaPassword = generadorPassword({longitud:passwordLongitud, incluirSimbolos:incluyeSimbolos, incluirMayusculas:incluyeMayusculas,incluirNumeros:incluyeNumeros})
    setPassword(nuevaPassword);
  }

  const handleCopiarPortapapeles = ()=>{
    navigator.clipboard.writeText(password);
    alert("Contraseña copiada con éxito al portapapeles");
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-t from-cyan-500 to-blue-500">
      <div className=" bg-blue-300 p-5 rounded-md">
        <h2 className="text-center mb-5">
          <strong>¡Bienvenido al generador de contraseñas!</strong>
        </h2>
        <label className="block mb-4">
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
        <button
          onClick={handleGenerarPassword}
          className="bg-pink-400 hover:bg-pink-300 duration-500 text-white px-4 py-2 rounded mr-16"
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
        <div className="mt-4">
         Contraseña: <strong>{password}</strong>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
