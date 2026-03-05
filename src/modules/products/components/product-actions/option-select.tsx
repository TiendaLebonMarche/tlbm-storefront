import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col gap-y-3">
      <label className="text-sm font-semibold text-brand-black uppercase tracking-wider">
        {title}
      </label>
      <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
        {filteredOptions.map((v) => {
          const isSelected = v === current
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "px-4 py-2 text-sm font-medium transition-all duration-200 rounded",
                {
                  "border-2 border-brand-gold bg-white text-brand-black":
                    isSelected,
                  "border border-gray-300 bg-white text-gray-600 hover:border-brand-gold hover:text-brand-black":
                    !isSelected && !disabled,
                  "border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed":
                    disabled,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
