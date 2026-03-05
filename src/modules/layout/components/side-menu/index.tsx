"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"


const mainMenu = [
  { name: "Inicio", href: "/" },
  { name: "Ofertas", href: "/ofertas" },
  { name: "Tecnología", href: "/tecnologia" },
  { name: "Sonido", href: "/sonido" },
  { name: "Hogar", href: "/hogar" },
]

const secondaryMenu = [
  { name: "Accesorios", href: "/accesorios" },
  { name: "Marcas", href: "/marcas" },
  { name: "Mascotas", href: "/mascotas" },
  { name: "Personal", href: "/personal" },
]

const extraMenu = [
  { name: "Blog", href: "/blog" },
  { name: "Mi Cuenta", href: "/account" },
  { name: "Mi Bolsa", href: "/cart", icon: true },
]

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  return (
    <div className="h-full z-50">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="nav-icon outline-none text-inherit hover:text-brand-gold transition-colors group-hover:underline decoration-1 underline-offset-4"
                >
                  <span className="hidden md:inline">MENU</span>
                  <span className="md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  </span>
                </Popover.Button>
              </div>

              {open && (
                <div
                  className="fixed inset-0 z-[60] bg-black/95 pointer-events-auto transition-opacity"
                  onClick={close}
                  data-testid="side-menu-backdrop"
                  style={{backdropFilter:'blur(2px)'}}
                />
              )}

              <Transition
                show={open}
                as={Fragment}
                enter="transition transform duration-400 cubic-bezier(0.16, 1, 0.3, 1)"
                enterFrom="-translate-x-full opacity-0"
                enterTo="translate-x-0 opacity-100"
                leave="transition transform duration-400 ease-in"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="-translate-x-full opacity-0"
              >
                <PopoverPanel className="fixed top-0 left-0 h-[100vh] w-[100vw] max-w-none bg-brand-black z-[70] text-white border-none flex flex-col shadow-2xl">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full justify-between px-6 pt-10 pb-6 md:p-8"
                  >
                    <div className="flex justify-between items-center mb-12">
                      <h2 className="text-xl font-serif font-bold italic">Menu</h2>
                      <button data-testid="close-menu-button" onClick={close} className="text-3xl text-gray-400 hover:text-white transition-colors">
                        &times;
                      </button>
                    </div>

                    <ul className="flex flex-col gap-4 items-start justify-start flex-1 w-full mt-2">
                      {mainMenu.map(({ name, href }) => (
                        <li key={name} className="w-full">
                          <LocalizedClientLink
                            href={href}
                            className="block w-full text-xl font-bold uppercase tracking-[0.2em] py-2 px-2 rounded hover:text-brand-gold hover:bg-white/5 transition-colors"
                            onClick={close}
                          >
                            {name}
                          </LocalizedClientLink>
                        </li>
                      ))}
                      {/* Separador visual */}
                      <li className="w-full border-t border-gray-700 my-2"></li>
                      {/* Submenú 'Más' */}
                      <li className="w-full">
                        <details className="group w-full" style={{marginTop:'0.5rem'}}>
                          <summary className="text-xl font-bold uppercase tracking-[0.2em] py-2 px-2 rounded hover:text-brand-gold hover:bg-white/5 transition-colors cursor-pointer select-none outline-none flex items-center">Más <span className="ml-2 text-base">▸</span></summary>
                          <ul className="pl-4 mt-2 flex flex-col gap-2">
                            {secondaryMenu.map(({ name, href }) => (
                              <li key={name} className="w-full">
                                <LocalizedClientLink
                                  href={href}
                                  className="block w-full text-base font-medium uppercase tracking-widest py-2 px-2 rounded hover:text-brand-gold hover:bg-white/5 transition-colors"
                                  onClick={close}
                                >
                                  {name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        </details>
                      </li>
                      {/* Separador visual */}
                      <li className="w-full border-t border-gray-700 my-2"></li>
                      {/* Extras */}
                      {extraMenu.map(({ name, href, icon }) => (
                        <li key={name} className="w-full">
                          <LocalizedClientLink
                            href={href}
                            className="block w-full text-lg font-semibold uppercase tracking-widest flex items-center gap-2 py-2 px-2 rounded hover:text-brand-gold hover:bg-white/5 transition-colors"
                            onClick={close}
                          >
                            {icon ? (
                              <span className="inline-flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75A.75.75 0 0 1 3 6h18a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75V6.75ZM3 6.75V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25v1.5" />
                                </svg>
                                {name}
                              </span>
                            ) : name}
                          </LocalizedClientLink>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col gap-y-6 pt-8 border-t border-gray-800">
                      {!!locales?.length && (
                        <div
                          className="flex justify-between hover:text-brand-gold transition-colors text-xs font-bold tracking-widest uppercase cursor-pointer"
                          onMouseEnter={languageToggleState.open}
                          onMouseLeave={languageToggleState.close}
                        >
                          <LanguageSelect
                            toggleState={languageToggleState}
                            locales={locales}
                            currentLocale={currentLocale}
                          />
                          <ArrowRightMini
                            className={clx(
                              "transition-transform duration-150",
                              languageToggleState.state ? "-rotate-90" : ""
                            )}
                          />
                        </div>
                      )}

                      <div
                        className="flex justify-between hover:text-brand-gold transition-colors text-xs font-bold tracking-widest uppercase cursor-pointer"
                        onMouseEnter={countryToggleState.open}
                        onMouseLeave={countryToggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={countryToggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            countryToggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>

                      <Text className="flex justify-between mt-4 text-[10px] text-gray-500">
                        © {new Date().getFullYear()} Le Bon Marché.
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
