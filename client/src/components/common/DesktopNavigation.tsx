import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DesktopNavigationProps {
  courseCategories: { id: number; name: string }[];
}

export function DesktopNavigation({ courseCategories }: DesktopNavigationProps) {
  return (
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
  );
}