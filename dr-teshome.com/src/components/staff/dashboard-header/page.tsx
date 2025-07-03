import { Bell, Search } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { SidebarTrigger } from "@/src/components/ui/sidebar"

interface DashboardHeaderProps {
  userRole: string
  userName: string
}

export function DashboardHeader({ userRole, userName }: DashboardHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4 bg-white text-black border-none">
      <div className="flex flex-1 items-center gap-2 ml-48 border border-none">
        <div className="relative flex-1 max-w-md border border-none">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground bg-white text-black" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 bg-white text-black focus:outline-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium">{userName}</p>
          <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
