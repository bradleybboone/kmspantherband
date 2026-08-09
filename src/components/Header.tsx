'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface SubItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href?: string;
  subItems?: SubItem[];
}

// Routes whose hero sits under a transparent nav until the user scrolls.
export const TRANSPARENT_NAV_PAGES = ['/', '/about'];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<string[]>([]);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Stable element id for aria-controls: "ENSEMBLES" -> "ensembles".
  const menuId = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

  const isTransparent = TRANSPARENT_NAV_PAGES.includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation: NavItem[] = [
    { 
      name: 'ABOUT',
      subItems: [
        { name: 'About the Band', href: '/about' },
        { name: 'Meet the Directors', href: '/about#directors' }
      ]
    },
    { name: 'CALENDAR', href: '/calendar' },
    { name: 'INSTRUMENT RENTAL', href: '/instrument-rental' },
    { 
      name: 'ENSEMBLES',
      subItems: [
        { name: 'Beginner Band', href: '/ensembles/beginner' },
        { name: 'Concert Band', href: '/ensembles/concert' },
        { name: 'Symphonic Band', href: '/ensembles/symphonic' },
        { name: 'Honor Band', href: '/ensembles/honor' }
      ]
    },
    { name: 'FUTURE MEMBERS', href: '/future-members' },
    {
      name: 'RESOURCES',
      subItems: [
        { name: 'Band Handbook', href: '/handbook' },
        { name: 'Rehearsal Schedule', href: '/schedule' },
        { name: 'Instrument Rental', href: '/instrument-rental' },
        { name: 'Forms & Documents', href: '/resources/forms' }
      ]
    },
    { name: 'JOIN BAND', href: '/join' },
    { name: 'CONTACT', href: '/contact' }
  ];

  // Toggle mobile dropdown
  const toggleMobileDropdown = (name: string) => {
    setMobileDropdowns(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  // Check if current path matches nav item or its children
  const isActiveNavItem = (item: NavItem): boolean => {
    if (item.href && pathname === item.href) return true;
    if (item.subItems) {
      return item.subItems.some(subItem => pathname === subItem.href);
    }
    return false;
  };

  // Determine background based on transparency and scroll
  const navBackground = isTransparent && !scrolled 
    ? 'bg-transparent' 
    : 'bg-primary';
  
  const textColor = 'text-white';

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      {/*
        `relative z-50` keeps the bar -- and the hamburger toggle -- above the
        mobile menu overlay below, which is `fixed inset-0 z-40`. Without a
        z-index here the nav is unpositioned, so inside <header>'s stacking
        context the positioned overlay paints over it and swallows taps on the
        toggle: the menu opened and could not be closed except by following a
        link. The overlay's own `pt-24` already assumes a visible bar above it.
      */}
      <nav className={`relative z-50 transition-[background-color,box-shadow] duration-300 ${navBackground} ${scrolled ? 'shadow-lg' : ''}`}>
        <div className="px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative w-16 h-16 lg:w-20 lg:h-20">
                <Image
                  src="/images/logo.svg"
                  alt="KMS Panther Band"
                  fill
                  priority
                  className="object-contain brightness-0 invert"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              {/*
                Each dropdown group: hover is one of three ways in, not the
                only one. The trigger button also toggles on click/Enter/Space
                (aria-expanded below), Escape closes and returns focus to the
                trigger, and the group closes when focus tabs out of it.
                Before this, submenus opened on mouseenter only, leaving 8
                routes with no keyboard path at all (WCAG 2.1.1 -- audit P0-1).
              */}
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.subItems && setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setOpenDropdown(null);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape' && openDropdown === item.name) {
                      setOpenDropdown(null);
                      e.currentTarget.querySelector('button')?.focus();
                    }
                  }}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`nav-link ${textColor} hover:opacity-70 transition-opacity ${
                        isActiveNavItem(item) ? 'nav-link-active' : ''
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      aria-expanded={openDropdown === item.name}
                      aria-controls={`desktop-menu-${menuId(item.name)}`}
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.name ? null : item.name)
                      }
                      className={`nav-link ${textColor} hover:opacity-70 transition-opacity flex items-center ${
                        isActiveNavItem(item) ? 'nav-link-active' : ''
                      }`}
                    >
                      {item.name}
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                  
                  {/*
                    Desktop Dropdown.

                    The 8px offset below the trigger is `pt-2` on this
                    positioned wrapper, NOT `mt-2` on the white panel. A margin
                    leaves a literal gap that belongs to no element, so moving
                    the pointer from the trigger down to the menu left the
                    hover wrapper, fired onMouseLeave, and closed the menu
                    before any item could be clicked. Transparent padding keeps
                    the hover target continuous. Do not swap this back to mt-*.
                  */}
                  {item.subItems && openDropdown === item.name && (
                    <div
                      id={`desktop-menu-${menuId(item.name)}`}
                      className="absolute top-full left-0 pt-2 w-56 animate-fadeIn"
                    >
                      <div className="bg-white shadow-xl py-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-dark hover:bg-gray-lighter transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              ref={mobileToggleRef}
              className={`lg:hidden p-2 ${textColor}`}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
                <span
                  className={`block h-0.5 w-full bg-current transform transition-transform duration-300 motion-reduce:transition-none ${
                    mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current transition-opacity duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current transform transition-transform duration-300 motion-reduce:transition-none ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/*
        Mobile Navigation Menu.

        Closed state is `translate-x-full`, which keeps the panel rendered
        (display:block, visibility:visible) so the slide animation works --
        but that alone left 8 focusable items in the tab order, parked
        off-screen at left:389px on a 375px viewport (WCAG 2.4.3 -- audit
        P1-2). `inert` + `aria-hidden` remove it from keyboard and
        screen-reader reach while closed without touching `display`, so the
        slide survives. Do not replace this with `display: none`.
      */}
      <div
        id="mobile-menu"
        inert={!mobileMenuOpen}
        aria-hidden={!mobileMenuOpen}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setMobileMenuOpen(false);
            mobileToggleRef.current?.focus();
          }
        }}
        className={`lg:hidden fixed inset-0 bg-primary z-40 transform transition-transform motion-reduce:transition-none ${
          mobileMenuOpen ? 'translate-x-0 duration-300' : 'translate-x-full duration-200'
        }`}
      >
        <div className="pt-24 pb-6 px-6 max-h-screen overflow-y-auto">
          <div className="flex flex-col">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`block py-3 text-white text-lg font-medium uppercase tracking-wider hover:opacity-80 transition-opacity ${
                      isActiveNavItem(item) ? 'opacity-100' : 'opacity-70'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <>
                    <button
                      type="button"
                      aria-expanded={mobileDropdowns.includes(item.name)}
                      aria-controls={`mobile-submenu-${menuId(item.name)}`}
                      className={`w-full flex items-center justify-between py-3 text-white text-lg font-medium uppercase tracking-wider hover:opacity-80 transition-opacity ${
                        isActiveNavItem(item) ? 'opacity-100' : 'opacity-70'
                      }`}
                      onClick={() => toggleMobileDropdown(item.name)}
                    >
                      {item.name}
                      <svg
                        className={`h-5 w-5 transform transition-transform motion-reduce:transition-none ${
                          mobileDropdowns.includes(item.name) ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {item.subItems && mobileDropdowns.includes(item.name) && (
                      <div id={`mobile-submenu-${menuId(item.name)}`} className="pl-4 pb-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block py-2 text-white/80 text-base hover:text-white transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}