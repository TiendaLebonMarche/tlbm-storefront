"use client"

import { useState, type Dispatch, type SetStateAction } from "react"

/**
 * useSyncedState — sincroniza un estado local cuando el valor fuente CAMBIA,
 * conservando la capacidad de resetearlo localmente (clearState).
 *
 * Patrón oficial de React ("Adjusting some state when a prop changes"):
 * el ajuste se hace DURANTE el render con guard, NO en un effect
 * (React 19 prohíbe setState síncrono en effects — react-hooks/set-state-in-effect).
 *
 * Útil para: formState.success de useActionState que debe reflejarse en la UI
 * pero también poder limpiarse (ej. ocultar el mensaje de éxito al editar de nuevo).
 */
export const useSyncedState = <T,>(
  value: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState(value)
  const [prev, setPrev] = useState(value)

  if (prev !== value) {
    setPrev(value)
    setState(value)
  }

  return [state, setState]
}

export default useSyncedState
