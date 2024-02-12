import { createContext, useState } from "react";
import { calcularMarca, calcularPlan, formatearDinero, obtenerDiferenciaYear } from "../helpers";

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {
    const [datos, setDatos] = useState({
        marca: "",
        year: "",
        plan: "",
    });

    const [error, setError] = useState("");
    const [resultado, setResultado] = useState(0);
    const [cargando, setCargando] = useState(false);
    

    const handleChangeDatos = (e) => {
        setDatos({
            ...datos, // Se crea una copia de lo existente
            [e.target.name]: e.target.value, // Y se agrega lo que cambió
        });
    };

    const cotizarSeguro = () => {
        // Una base
        let resultado = 2000;

        // Obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year);

        // Hay que restar el 3% por cada año
        resultado *= 1 - diferencia * 0.03;

        // Americano 15%
        // Europeo 30%
        // Asiatico 5%
        resultado *= calcularMarca(datos.marca);

        // Plan Básico 20%
        // Completo 50%
        resultado *= calcularPlan(datos.plan);

        resultado = formatearDinero(resultado);

        console.log(resultado);

        setCargando(true);
        setTimeout(() => {
            setResultado(resultado);
            setCargando(false);
        }, 3000)
    };

    return (
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    );
};

export { CotizadorProvider };

export default CotizadorContext;
