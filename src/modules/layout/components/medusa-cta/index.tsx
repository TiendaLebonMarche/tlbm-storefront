import { Text } from "@medusajs/ui"

const MedusaCTA = () => {
  return (
    <Text className="flex gap-x-2 txt-compact-small-plus items-center text-gray-400">
      &copy; {new Date().getFullYear()} Le Bon Marché. Todos los derechos reservados.
    </Text>
  )
}

export default MedusaCTA
