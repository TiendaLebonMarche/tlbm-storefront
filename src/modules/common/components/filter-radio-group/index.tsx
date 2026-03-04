import { EllipseMiniSolid } from "@medusajs/icons"
import { Label, RadioGroup, Text, clx } from "@medusajs/ui"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex flex-col gap-y-6">
      <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold border-b border-gray-100 pb-2">
        {title}
      </h3>
      <RadioGroup data-testid={dataTestId} onValueChange={handleChange} value={value}>
        <div className="flex flex-col gap-y-4">
          {items?.map((i) => (
            <div
              key={i.value}
              className="flex items-center group transition-all duration-300"
            >
              <RadioGroup.Item
                checked={i.value === value}
                className="hidden peer"
                id={i.value}
                value={i.value}
              />
              <Label
                htmlFor={i.value}
                className={clx(
                  "relative pl-6 text-xs tracking-wider transition-all duration-300 hover:cursor-pointer flex items-center gap-x-2 font-medium",
                  {
                    "text-brand-black font-semibold": i.value === value,
                    "text-gray-400 hover:text-brand-black": i.value !== value,
                  }
                )}
                data-testid="radio-label"
                data-active={i.value === value}
              >
                {/* Custom indicator */}
                <span
                  className={clx(
                    "absolute left-0 w-3 h-[1px] transition-all duration-300",
                    {
                      "bg-brand-gold w-4": i.value === value,
                      "bg-gray-200 w-0 group-hover:w-2": i.value !== value,
                    }
                  )}
                />
                {i.label}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
