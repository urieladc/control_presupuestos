import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto}) => {
    const[porcentaje, setPorcentaje] = useState(0) 
    const[disponible, setDisponible] = useState(0)
    const[gastado, setGastado] = useState(0)

    const handleResetApp = () => {
        const resetear = confirm('¿Deseas recetear la App?')

        if(resetear){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    useEffect(()=>{
        const totalGasto = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGasto
        
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

        setDisponible(totalDisponible)
        setGastado(totalGasto)

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 500);
    },[gastos])
    const formateaCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR'
        })
    }
    
    return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? 'red' : '#3B82F6',
                    textColor: porcentaje > 100 ? 'red' : '#3B82F6'
                })}
                value={porcentaje}
                text={`${porcentaje}% gastado`}
            />
        </div>
        <div className="contenido-presupuesto">
            <button
                className="reset-app"
                type="button"
                onClick={handleResetApp}
            >
                Resetear App
            </button>
            <p>
                <span>Presupuesto:</span> {formateaCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''} `}>
                <span>Disponible:</span> {formateaCantidad(disponible)}
            </p>
            <p>
                <span>Gastado:</span> {formateaCantidad(gastado)}
            </p>
        </div>
    </div>
    )
}

export default ControlPresupuesto