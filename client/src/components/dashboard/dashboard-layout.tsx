import type * as React from "react"
import { BarChart3, BookOpen, GraduationCap, LayoutDashboard, Settings, User2, Users2 } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

// import { usePathname } from "next/navigation"
import { useLocation } from "react-router-dom";

import type { NavItem, User, UserRole } from "@/data/dashboard-types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const roleBasedNavigation: Record<UserRole, NavItem[]> = {
  Student: [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "My Courses", href: "/dashboard/courses", icon: BookOpen, badge: 3 },
    { title: "Progress", href: "/dashboard/progress", icon: BarChart3 },
    {
      title: "Assignments",
      href: "/dashboard/assignments",
      icon: GraduationCap,
      badge: 2,
    },
    { title: "Profile", href: "/dashboard/profile", icon: User2 },
  ],
  Instructor: [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    {
      title: "My Teaching",
      href: "/dashboard/teaching",
      icon: BookOpen,
      badge: 4,
    },
    {
      title: "Student Grades",
      href: "/dashboard/grades",
      icon: GraduationCap,
    },
    {
      title: "Assignments",
      href: "/dashboard/assignments",
      icon: BarChart3,
      badge: 5,
    },
    { title: "Profile", href: "/dashboard/profile", icon: User2 },
  ],
  Admin: [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    {
      title: "User Management",
      href: "/dashboard/users",
      icon: Users2,
      badge: 12,
    },
    {
      title: "Course Overview",
      href: "/dashboard/courses",
      icon: BookOpen,
    },
    { title: "Reports", href: "/dashboard/reports", icon: BarChart3 },
    { title: "Settings", href: "/dashboard/settings", icon: Settings },
  ],
}



interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {

  const { user } = useSelector((state: RootState) => state.auth);
  const currentUser = user as User | null;

  const location = useLocation();
  if (!currentUser) {
    return null; // or handle the null case appropriately
  }
  const navigation = roleBasedNavigation[currentUser.role as UserRole];

  console.log("role is ", currentUser.role);
  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <Sidebar>
          <SidebarHeader className="border-b">
            <div className="flex h-[60px] items-center px-6">
              <GraduationCap className="mr-2 h-6 w-6" />
              <span className="font-semibold">EduTech Platform</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.href} tooltip={item.title}>
                    <a href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                  <Avatar>
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>
                      {currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{currentUser.name}</span>
                    <span className="text-xs text-muted-foreground capitalize">{currentUser.role}</span>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[240px]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[60px] items-center border-b bg-background px-6">
            <SidebarTrigger />
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

