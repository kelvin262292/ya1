"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useCart } from "./cart-provider"
import { YapeeLogoIcon } from "./icons/yapee-logo-icon"

export function YapeeHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("User")
  const { theme, setTheme } = useTheme()
  const { cartItems } = useCart()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleLogin = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
      setUsername("John Doe")
    }
  }

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const navLinks = [
    { href: "#products", label: "Sản phẩm", isPageLink: false },
    { href: "#promotions", label: "Khuyến mãi", isPageLink: false },
    { href: "#testimonials", label: "Đánh giá", isPageLink: false },
    { href: "/about", label: "Giới thiệu", isPageLink: true },
    { href: "/contact", label: "Liên hệ", isPageLink: true },
  ]

  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/yapee" className="flex items-center space-x-2">
              <YapeeLogoIcon className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Yapee</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500 transition-colors"
                onClick={(e) => !link.isPageLink && handleNavLinkClick(e, link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* User Info / Login */}
            <div className="hidden md:block">
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Xin chào, {username}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLogin}
                    className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Đăng xuất
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLogin}
                  className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                >
                  Đăng nhập
                </Button>
              )}
            </div>

            {/* Cart */}
            <Link
              href="/yapee/cart"
              className="relative p-2 rounded-full text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md">
          <div className="container mx-auto px-4 py-3 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500 transition-colors"
                onClick={(e) => !link.isPageLink && handleNavLinkClick(e, link.href)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              {isLoggedIn ? (
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Xin chào, {username}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLogin}
                    className="justify-start text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Đăng xuất
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLogin}
                  className="justify-start text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                >
                  Đăng nhập
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
