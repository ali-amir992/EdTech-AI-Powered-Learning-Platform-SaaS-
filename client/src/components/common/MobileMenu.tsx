import { Link } from "react-router-dom";
import { BookOpen, ShoppingCart, Bell, User, Settings, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader,SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface MobileMenuProps {
  isAuthenticated: boolean;
  courseCategories: { id: number; name: string }[];
}

export function MobileMenu({ isAuthenticated, courseCategories }: MobileMenuProps) {
  return (
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
        <nav className="mt-8 px-2 flex flex-col gap-4">
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
              className="flex items-center gap-2 py-2 text-sm transition-colors hover:text-primary"
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
                <Button variant="ghost" className="flex w-full items-center justify-start gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 py-2 text-sm transition-colors hover:text-primary"
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
  );
}