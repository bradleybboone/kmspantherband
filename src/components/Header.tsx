'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
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

interface HeaderProps {
  variant?: 'transparent' | 'solid';
}

export default function Header({ variant = 'transparent' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<string[]>([]);
  const pathname = usePathname();

  // Pages that should have transparent navigation
  const transparentNavPages = ['/', '/about', '/students'];
  const isTransparent = transparentNavPages.includes(pathname) && variant === 'transparent';

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
        { name: 'Cadet Band', href: '/ensembles/cadet' },
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
        { name: 'Instrument Rental', href: '/instrument-rental' },
        { name: 'Forms & Documents', href: '/resources/forms' }
      ]
    },
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
    <header className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300`}>
      <nav className={`${navBackground} ${scrolled ? 'shadow-lg' : ''}`}>
        <div className="px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative w-16 h-16 lg:w-20 lg:h-20">
                {/* Replace with your logo */}
                <div className={`w-full h-full ${isTransparent && !scrolled ? 'bg-white/20' : 'bg-white/10'} backdrop-blur-sm rounded-sm flex items-center justify-center`}>
                  <span className={`${textColor} font-display text-2xl lg:text-3xl font-bold`}>K</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              {navigation.map((item) => (
                <div 
                  key={item.name} 
                  className="relative"
                  onMouseEnter={() => item.subItems && setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
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
                  
                  {/* Desktop Dropdown */}
                  {item.subItems && openDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl py-2 animate-fadeIn">
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
                  )}
                </div>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className={`lg:hidden p-2 ${textColor}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
                <span
                  className={`block h-0.5 w-full bg-current transform transition-transform duration-300 ${
                    mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current transition-opacity duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current transform transition-transform duration-300 ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-primary z-40 transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
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
                      className={`w-full flex items-center justify-between py-3 text-white text-lg font-medium uppercase tracking-wider hover:opacity-80 transition-opacity ${
                        isActiveNavItem(item) ? 'opacity-100' : 'opacity-70'
                      }`}
                      onClick={() => toggleMobileDropdown(item.name)}
                    >
                      {item.name}
                      <svg 
                        className={`h-5 w-5 transform transition-transform ${
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
                      <div className="pl-4 pb-2">
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