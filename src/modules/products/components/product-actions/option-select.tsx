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
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-brand-black uppercase tracking-[0.2em] font-sans">
          {title}
        </label>
        {current && (
          <span className="text-xs text-brand-gray font-light">
            {current}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
        {filteredOptions.map((v) => {
          const isSelected = v === current
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "min-w-[48px] px-5 py-2.5 text-[11px] font-medium tracking-wide transition-all duration-200 uppercase",
                {
                  "border-2 border-brand-black bg-brand-black text-white":
                    isSelected,
                  "border border-brand-gray-light bg-white text-brand-gray hover:border-brand-black hover:text-brand-black":
                    !isSelected && !disabled,
                  "border border-brand-gray-light bg-brand-gray-light/20 text-gray-300 cursor-not-allowed":
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
