"use client"

import React, { useActionState } from "react";

import useSyncedState from "@lib/hooks/use-synced-state"

import Input from "@modules/common/components/input"

import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"
import { updateCustomer } from "@lib/data/customer"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {

  const updateCustomerName = async (
    _currentState: Record<string, unknown>,
    formData: FormData
  ) => {
    const customer = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
    }

    try {
      await updateCustomer(customer)
      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.toString() }
    }
  }

  const [state, formAction] = useActionState(updateCustomerName, {
    error: false,
    success: false,
  })

  // successState refleja state.success (useSyncedState: ajuste en render, no en
  // effect — React 19) y se puede limpiar con clearState al editar de nuevo.
  const [successState, setSuccessState] = useSyncedState(state.success)

  const clearState = () => {
    setSuccessState(false)
  }

  return (
    <form action={formAction} className="w-full overflow-visible">
      <AccountInfo
        label="Nombre"
        currentInfo={`${customer.first_name} ${customer.last_name}`}
        isSuccess={successState}
        isError={!!state?.error}
        clearState={clearState}
        data-testid="account-name-editor"
      >
        <div className="grid grid-cols-2 gap-x-4">
          <Input
            label="Nombres"
            name="first_name"
            required
            defaultValue={customer.first_name ?? ""}
            data-testid="first-name-input"
          />
          <Input
            label="Apellidos"
            name="last_name"
            required
            defaultValue={customer.last_name ?? ""}
            data-testid="last-name-input"
          />
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileName
