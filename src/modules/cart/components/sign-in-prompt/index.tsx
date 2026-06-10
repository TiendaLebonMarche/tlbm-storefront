import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-white flex items-center justify-between p-6 rounded-3xl border-2 border-brand-soft bg-brand-gray-light/5">
      <div>
        <Heading level="h2" className="text-lg font-bold text-brand-black">
          ¿Ya tienes una cuenta?
        </Heading>
        <Text className="txt-medium text-brand-gray mt-1">
          Inicia sesión para una mejor experiencia de compra.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="pill-button border-brand-black text-brand-black hover:bg-brand-black hover:text-white" data-testid="sign-in-button">
            Iniciar sesión
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
