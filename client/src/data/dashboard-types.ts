import type React from "react"
export type UserRole = "Student" | "Instructor" | "Admin"

export interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  badge?: number
}

export interface DashboardStats {
  title: string
  value: string | number
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> // Fix
}

export interface User {
  name: string
  role: UserRole
  email: string
  avatar?: string
}

