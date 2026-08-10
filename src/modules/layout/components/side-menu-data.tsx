import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listCollections } from "@lib/data/collections"
import { StoreRegion, HttpTypes } from "@medusajs/types"
import SideMenu from "@modules/layout/components/side-menu"

/**
 * Server wrapper del SideMenu: carga regions/locales/collections y renderiza el
 * MISMO drawer que usan todas las páginas. Se inyecta en el Hero del index
 * (HeroOverlay + ScrollHeader) para que el home tenga el menú idéntico.
 */
export default async function SideMenuData() {
  const [regions, locales, currentLocale, { collections }] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
    listCollections({ fields: "id,title,handle" }),
  ])

  return (
    <SideMenu
      regions={regions}
      locales={locales}
      currentLocale={currentLocale}
      collections={collections as HttpTypes.StoreCollection[]}
    />
  )
}
