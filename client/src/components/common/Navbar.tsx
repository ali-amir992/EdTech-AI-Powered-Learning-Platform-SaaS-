import * as React from "react"
import { Link } from "react-router-dom"
import { Bell, BookOpen, ChevronDown, LogIn, LogOut, Menu, Search, Settings, ShoppingCart, User, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Mock data for course categories
const courseCategories = [
    { id: 1, name: "Web Development" },
    { id: 2, name: "Data Science" },
    { id: 3, name: "Mobile Development" },
    { id: 4, name: "Machine Learning" },
    { id: 5, name: "UI/UX Design" },
    { id: 6, name: "Cloud Computing" },
]

interface NavbarProps {
    isAuthenticated?: boolean
}

export function Navbar({ isAuthenticated = true }: NavbarProps) {
    const [isSearchOpen, setIsSearchOpen] = React.useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container px-3 md:px-12 flex h-16 items-center">
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                            <SheetHeader>
                                <SheetTitle>

                                    <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                                        <BookOpen className="h-5 w-5" />
                                        MetaDots
                                    </Link>

                                </SheetTitle>
                            </SheetHeader>
                            <nav className="mt-8 bg-red-600 px-2 flex flex-col gap-4">
                                <div className="space-y-3">
                                    <h3 className="text-sm font-medium">Explore Categories</h3>
                                    {courseCategories.map((category) => (
                                        <Link
                                            key={category.id}
                                            to={`/courses/category/${category.id}`}
                                            className="block py-2 text-sm transition-colors hover:text-primary"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="space-y-2 pt-4 border-t">
                                    <Link
                                        to="/cart"
                                        className="flex bg-amber-600 items-center gap-2 py-2 text-sm transition-colors hover:text-primary"
                                    >
                                        <ShoppingCart className="h-4 w-4" />
                                        Cart
                                    </Link>
                                    {isAuthenticated ? (
                                        <>
                                            <Link
                                                to="/notifications"
                                                className="flex items-center gap-2 py-2 text-sm transition-colors hover:text-primary"
                                            >
                                                <Bell className="h-4 w-4" />
                                                Notifications
                                            </Link>
                                            <Link
                                                to="/profile"
                                                className="flex items-center gap-2 py-2 text-sm transition-colors hover:text-primary"
                                            >
                                                <User className="h-4 w-4" />
                                                Profile
                                            </Link>
                                            <Link
                                                to="/settings"
                                                className="flex items-center gap-2 py-2 text-sm transition-colors hover:text-primary"
                                            >
                                                <Settings className="h-4 w-4" />
                                                Settings
                                            </Link>
                                            <Button variant="ghost" className="flex w-full items-center justify-start gap-2 ">
                                                <LogOut className="h-4 w-4" />
                                                <span>Log out</span>
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                className="flex bg-amber-600 items-center gap-2 py-2 text-sm transition-colors hover:text-primary"
                                            >
                                                <LogIn className="h-4 w-4" />
                                                Login
                                            </Link>
                                            <Link to="/signup">
                                                <Button className="w-full">Sign up</Button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 font-bold">
                        <BookOpen className="h-5 w-5" />
                        <span className="hidden md:inline-block">MetaDots</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex md:items-center md:gap-5">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="gap-1">
                                    Explore
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-56">
                                <DropdownMenuLabel>Course Categories</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {courseCategories.map((category) => (
                                    <DropdownMenuItem key={category.id} asChild>
                                        <Link to={`/courses/category/${category.id}`}>{category.name}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>
                </div>

                {/* Search and Actions */}
                <div className="ml-auto flex items-center gap-2">
                    {/* Desktop Search */}
                    <div className="hidden md:flex md:w-40 lg:w-64">
                        <div className="relative w-full">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search courses..." className="pl-8" />
                        </div>
                    </div>

                    {/* Mobile Search Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        aria-label={isSearchOpen ? "Close search" : "Open search"}
                    >
                        {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                    </Button>

                    {/* Cart */}
                    <Button variant="ghost" size="icon" asChild>
                        <Link to="/cart" aria-label="Shopping cart" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                3
                            </Badge>
                            <span className="sr-only">Cart</span>
                        </Link>
                    </Button>

                    {isAuthenticated ? (
                        <>
                            {/* Notifications */}
                            <Button variant="ghost" size="icon" asChild>
                                <Link to="/notifications" aria-label="Notifications">
                                    <Bell className="h-5 w-5" />
                                    <Badge
                                        variant="destructive"
                                        className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                                    >
                                        2
                                    </Badge>
                                    <span className="sr-only">Notifications</span>
                                </Link>
                            </Button>

                            {/* User Profile */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                            <AvatarFallback>JD</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem asChild>
                                            <Link to="/profile">
                                                <User className="mr-2 h-4 w-4" />
                                                <span>Profile</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link to="/dashboard">
                                                <BookOpen className="mr-2 h-4 w-4" />
                                                <span>My Learning</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link to="/settings">
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>Settings</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <div className="hidden md:flex md:items-center md:gap-2">
                            <Button variant="ghost" asChild>
                                <Link to="/login">Log in</Link>
                            </Button>
                            <Button asChild>
                                <Link to="/signup">Sign up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Search Expanded */}
            {isSearchOpen && (
                <div className="border-t p-2 md:hidden">
                    <div className="relative w-full">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search courses..." className="pl-8 w-full" autoFocus />
                    </div>
                </div>
            )}
        </header>
    )
}

