'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Playground', href: '/playground' }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ user }: { user: any }) {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="shadow">
      {({ open }) => (
        <>
          <div className="ml-5">
            <div className="flex h-16 justify-between">
              <div className="-mr-2 flex items-center">
                <Disclosure.Button className="inline-flex items-center ">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel>
              <div className="space-y-1 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      pathname === item.href
                        ? 'bg-slate-50 border-slate-500 text-slate-700'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                      'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                    )}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 pb-3">
                {user ? (
                  <>
                    <div className="flex items-center px-4">
                      <div className="flex-shrink-0">
                        <Image
                          className="h-8 w-8 rounded-full"
                          src={user.image}
                          height={32}
                          width={32}
                          alt={`${user.name} avatar`}
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">
                          {user.name}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <button
                        onClick={() => signOut()}
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                      >
                        Sign out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mt-3 space-y-1">
                    <button
                      onClick={() => signIn('github')}
                      className="flex w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      Sign in
                    </button>
                  </div>
                )}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
