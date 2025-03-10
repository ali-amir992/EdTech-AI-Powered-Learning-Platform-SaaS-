import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function NotificationIcon() {
  return (
    <Button variant="ghost" size="icon" asChild>
      <Link to="/notifications" aria-label="Notifications" className="relative">
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
  );
}