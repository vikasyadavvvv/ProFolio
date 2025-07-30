import React, { useState } from 'react';
import { Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';
import TemplateSelect from './pages/TemplateSelect.jsx';
import CreateProfile from './pages/CreateProfile.jsx';
import Professionals from './pages/Professionals.jsx';
import Portfolio from './pages/Portfolio.jsx';
import {
  FiAperture, FiUsers, FiGrid, FiPlusCircle, FiMenu, FiX,
  FiHome, FiGithub, FiMail, FiLinkedin, FiUser
} from 'react-icons/fi';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-50">
      <Header />

      {/* Accessibility skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-yellow-500 focus:text-black focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to content
      </a>

      <main
        id="main-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        <Routes>
          <Route path="/" element={<TemplateSelect />} />
          <Route path="/create" element={<CreateProfile />} />
          <Route path="/professionals" element={<Professionals />} />
          <Route path="/portfolio/:id" element={<Portfolio />} />
          <Route path="/edit/:id" element={<CreateProfile />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Home', icon: <FiHome className="text-lg" /> },
    { to: '/professionals', label: 'Professionals', icon: <FiUsers className="text-lg" /> },
    { to: '/create', label: 'Create', icon: <FiPlusCircle className="text-lg" /> },
  ];

  const baseLink =
    'relative inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-800 hover:text-yellow-700 hover:bg-yellow-50 transition';
  const activeClasses =
    'text-yellow-700 bg-yellow-100 after:scale-x-100';

  return (
    <header className="sticky top-0 z-50 border-b border-yellow-200/70 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      {/* subtle accent bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-3"
            aria-label="Go to homepage"
          >
            <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-amber-400 text-black shadow-soft ring-1 ring-yellow-300/60">
              <FiAperture className="w-5 h-5" />
              <span className="absolute -inset-0.5 rounded-xl ring-1 ring-yellow-500/20" />
            </span>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
              <span className="text-yellow-600">Pro</span>
              <span className="text-gray-900">Folio</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 ml-auto">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  [
                    baseLink,
                    'after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:rounded after:bg-yellow-500 after:transition after:origin-left after:scale-x-0',
                    isActive ? activeClasses : '',
                  ].join(' ')
                }
              >
                <span className="mr-2">{n.icon}</span>
                {n.label}
              </NavLink>
            ))}
           
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${mobileOpen ? 'max-h-80' : 'max-h-0'}`}
      >
        <div className="bg-white/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
            <nav className="grid gap-2">
              {navItems.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition
                     ${isActive ? 'bg-yellow-100 text-yellow-800' : 'text-gray-800 hover:bg-yellow-50 hover:text-yellow-700'}`
                  }
                >
                  {n.icon}
                  {n.label}
                </NavLink>
              ))}
              <Link
                to="/create"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-black shadow-soft hover:bg-yellow-400"
              >
                <FiPlusCircle className="text-lg" />
                Create Profile
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative mt-20 bg-gray-950 text-gray-200">
      {/* top glow accent */}
      <div className="pointer-events-none absolute -top-2 left-0 right-0 h-2 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 blur-sm" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-400 flex items-center justify-center ring-1 ring-yellow-300/50">
                <FiAperture className="text-black w-5 h-5" />
              </div>
              <h3 className="text-xl font-extrabold">
                <span className="text-yellow-400">Pro</span>Folio
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Create stunning, professional portfolios with beautiful templates and an intuitive builder.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/vikasyadavvvv"
                target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 text-gray-300 hover:text-yellow-400 hover:bg-white/10 transition"
              >
                <FiGithub className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/vikas-yadav-1916002a6/"
                target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 text-gray-300 hover:text-yellow-400 hover:bg-white/10 transition"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-yellow-400 transition flex items-center gap-2">
                  <FiGrid className="w-4 h-4" /> Templates
                </Link>
              </li>
              <li>
                <Link to="/professionals" className="text-gray-300 hover:text-yellow-400 transition flex items-center gap-2">
                  <FiUsers className="w-4 h-4" /> Professionals
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-gray-300 hover:text-yellow-400 transition flex items-center gap-2">
                  <FiPlusCircle className="w-4 h-4" /> Create Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300">
                <FiMail className="w-4 h-4 text-yellow-400" />
                <a href="mailto:vy532555@gmail.com" className="hover:text-yellow-400 transition">
                  vy532555@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <FiGithub className="w-4 h-4 text-yellow-400" />
                <a
                  href="https://github.com/vikasyadavvvv"
                  target="_blank" rel="noopener noreferrer"
                  className="hover:text-yellow-400 transition"
                >
                  github.com/vikasyadavvvv
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Info */}
          <div>
            <h4 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-5">
              Developer
            </h4>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center ring-1 ring-white/10">
                <FiUser className="text-yellow-400 w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-white">Vikas Yadav</p>
                <p className="text-xs text-gray-400">Full‑Stack Developer</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Crafted with <span className="text-yellow-400">❤️</span> by Vikas Yadav
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">Pro</span>Folio. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
