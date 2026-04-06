"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="text-large-semi uppercase mb-6">
        \u00danete a Le Bon March\u00e9
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        Crea tu perfil y disfruta de una experiencia de compra exclusiva en nuestra tienda.
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Nombres"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Apellidos"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="Correo electr\u00f3nico"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Tel\u00e9fono"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Contrase\u00f1a"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          Al crear una cuenta, aceptas las{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            Pol\u00edtica de Privacidad
          </LocalizedClientLink>{" "}
          y los{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            T\u00e9rminos de Uso
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton className="w-full mt-6" data-testid="register-button">
          Unirme
        </SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        \u00bfYa tienes cuenta?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Iniciar sesi\u00f3n
        </button>
        .
      </span>
    </div>
  )
}

export default Register
