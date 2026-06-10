import { Text, clx } from "@medusajs/ui"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import React from "react"
import { Plus } from "lucide-react"

type AccordionItemProps = AccordionPrimitive.AccordionItemProps & {
  title: string
  subtitle?: string
  description?: string
  required?: boolean
  tooltip?: string
  forceMountContent?: true
  headingSize?: "small" | "medium" | "large"
  customTrigger?: React.ReactNode
  complete?: boolean
  active?: boolean
  triggerable?: boolean
  className?: string
  children: React.ReactNode
}

type AccordionProps =
  | (AccordionPrimitive.AccordionSingleProps &
      React.RefAttributes<HTMLDivElement>)
  | (AccordionPrimitive.AccordionMultipleProps &
      React.RefAttributes<HTMLDivElement>)

const Accordion: React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>
} = ({ children, ...props }) => {
  return (
    <AccordionPrimitive.Root {...props} className="w-full">
      {children}
    </AccordionPrimitive.Root>
  )
}

const Item: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  description,
  children,
  className,
  headingSize = "large",
  customTrigger = undefined,
  forceMountContent = undefined,
  triggerable,
  ...props
}) => {
  return (
    <AccordionPrimitive.Item
      {...props}
      className={clx(
        "border-b border-brand-gray-light last:border-b-0",
        "py-4",
        className
      )}
    >
      <AccordionPrimitive.Header className="px-0">
        <AccordionPrimitive.Trigger
          className={clx(
            "flex w-full items-center justify-between text-left transition-all",
            "[&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0",
            "[&[data-state=open]>svg]:rotate-180"
          )}
        >
          <div className="flex flex-col">
            <Text className="text-brand-black font-semibold text-sm uppercase tracking-wider">
              {title}
            </Text>
            {subtitle && (
              <Text as="span" size="small" className="mt-1 text-brand-gray">
                {subtitle}
              </Text>
            )}
          </div>
          {customTrigger || (
            <Plus
              size={16}
              strokeWidth={2}
              className="shrink-0 opacity-60 transition-transform duration-200"
              aria-hidden="true"
            />
          )}
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content
        forceMount={forceMountContent}
        className={clx(
          "overflow-hidden text-sm transition-all",
          "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        )}
      >
        <div className="text-brand-gray space-y-3 text-sm leading-relaxed pt-4">
          {description && <Text>{description}</Text>}
          <div className="w-full">{children}</div>
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  )
}

Accordion.Item = Item

export default Accordion
