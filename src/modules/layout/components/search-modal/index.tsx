"use client"

import { Fragment, useState } from "react"
import { Transition, Dialog, DialogPanel } from "@headlessui/react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useRouter } from "next/navigation"

export default function SearchModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState("")
    const router = useRouter()

    const openSearch = () => setIsOpen(true)
    const closeSearch = () => setIsOpen(false)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/store?q=${encodeURIComponent(query)}`)
            closeSearch()
        }
    }

    return (
        <>
            <button
                onClick={openSearch}
                className="nav-icon hover:text-brand-gold relative flex items-center gap-2 outline-none"
            >
                <span className="hidden md:inline group-hover:underline decoration-1 underline-offset-4 font-bold tracking-widest text-xs">BUSCAR</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>

            <Transition show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[100]" onClose={closeSearch}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-white/95 backdrop-blur-sm transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-start justify-center p-4 text-center sm:p-0 pt-[15vh]">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <DialogPanel className="relative transform overflow-hidden text-center transition-all sm:w-full sm:max-w-4xl p-6">
                                    <button onClick={closeSearch} className="absolute right-0 top-0 text-4xl text-gray-400 hover:text-black outline-none">&times;</button>
                                    <p className="text-sm font-bold uppercase tracking-[0.2em] mb-4 text-brand-gold">¿Qué estás buscando?</p>

                                    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto mb-12">
                                        <input
                                            type="text"
                                            placeholder="Escribe aquí..."
                                            className="w-full text-3xl md:text-5xl font-serif text-center border-b-2 border-brand-black bg-transparent py-4 focus:outline-none placeholder-gray-300"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            autoFocus
                                        />
                                        <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-brand-black hover:text-brand-gold transition duration-300">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                            </svg>
                                        </button>
                                    </form>

                                    <div className="flex justify-center gap-8 text-sm font-medium text-gray-500">
                                        <LocalizedClientLink href="/store" onClick={closeSearch} className="hover:text-black transition uppercase tracking-wider text-xs border-b border-transparent hover:border-black pb-1">Novedades</LocalizedClientLink>
                                        <LocalizedClientLink href="/store" onClick={closeSearch} className="hover:text-black transition uppercase tracking-wider text-xs border-b border-transparent hover:border-black pb-1">Colecciones Especiales</LocalizedClientLink>
                                    </div>
                                </DialogPanel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
