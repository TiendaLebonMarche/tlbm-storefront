import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  return (
    <div className="flex flex-col gap-y-6">
      <div className="pb-6 border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-4xl md:text-5xl font-serif text-brand-black italic">Mi Bolsa</h1>
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">
          {items?.length || 0} Artículos
        </span>
      </div>
      <Table>
        <Table.Header className="border-t-0">
          <Table.Row className="text-brand-black uppercase tracking-[0.2em] text-[10px] font-bold">
            <Table.HeaderCell className="!pl-0">Producto</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Cantidad</Table.HeaderCell>
            <Table.HeaderCell className="hidden small:table-cell">
              Precio
            </Table.HeaderCell>
            <Table.HeaderCell className="!pr-0 text-right">
              Total
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items
            ? items
              .sort((a, b) => {
                return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
              })
              .map((item) => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    currencyCode={cart?.currency_code}
                  />
                )
              })
            : repeat(5).map((i) => {
              return <SkeletonLineItem key={i} />
            })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ItemsTemplate
