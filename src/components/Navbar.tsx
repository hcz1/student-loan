"use client";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { AcedemicCap } from "./Icons";
import { classNames } from "@/utils";
import { useState } from "react";
import { CONFIG } from "@/utils/const";

const navigation = [
  { name: "Calculator", href: "#hero", current: true },
  { name: "About", href: "#about", current: false },
  // { name: "Projects", href: "#", current: false },
  // { name: "Calendar", href: "#", current: false },
];

export default function Navbar() {
  const [state, setState] = useState({
    name: "Calculator",
    href: "#hero",
    current: true,
  });
  return (
    <Disclosure as="nav" className="fixed w-full bg-gray-600">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-2 sm:px-6">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button
                  id="main-menu"
                  className="relative inline-flex items-center justify-center rounded-lg p-2 text-gray-400 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <AcedemicCap />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        onClick={() => {
                          setState(item);
                        }}
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.href === state.href
                            ? "bg-gray-900 text-white shadow-xl"
                            : "text-gray-300 hover:bg-gray-600 hover:text-white",
                          "rounded-lg px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={
                          item.href === state.href ? "page" : undefined
                        }
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <a href={CONFIG.BMC_LINK} rel="noopener" target="_blank">
                  <button
                    className="shadow-xl bg-gray-900 text-white rounded-lg px-3 py-2 text-sm font-medium"
                    aria-hidden="true"
                  >
                    {CONFIG.BMC_TEXT}
                  </button>
                </a>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  id={item.name}
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.href === state.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-600 hover:text-white",
                    "block rounded-lg px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.href === state.href ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
