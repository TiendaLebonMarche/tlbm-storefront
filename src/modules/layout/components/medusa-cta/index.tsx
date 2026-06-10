import { Text } from "@medusajs/ui"

const MedusaCTA = () => {
  return (
    <Text className="flex gap-x-2 txt-compact-small-plus items-center text-brand-gray">
      &copy; {new Date().getFullYear()} Le Bon Marché. Todos los derechos reservados.
    </Text>
  )
}

export default MedusaCTA
