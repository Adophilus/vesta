import { cn } from "@/lib/shad/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shad/ui/select"
import { useAuthStore } from "@/lib/hooks/auth"
import { useState } from "react"
import { FunctionComponent } from "react"
import { useProfile } from "@/lib/hooks/profile"
import { LogoIcon } from "@/components/icons"

export const AccountSwitcher: FunctionComponent = () => {
  const profile = useProfile()

  const {
    profiles,
    setActiveProfile,
  } = useAuthStore(store => ({
    profiles: store.profiles!,
    setActiveProfile: store.setActiveProfile
  }))

  const isCollapsed = false

  if (!profiles || profiles.length === 0) return null

  const profileFullName = `${profile.data.firstName} ${profile.data.lastName}`

  return (
    <Select
      defaultValue={profile.data.email}
      onValueChange={value => setActiveProfile(parseInt(value))}
    >
      <SelectTrigger
        className={cn(
          "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
          isCollapsed &&
          "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
        )}
        aria-label="Select account"
      >
        <SelectValue placeholder="Select an account">
          <span className={cn("ml-2", isCollapsed && "hidden")}>
            {profileFullName}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {profiles.map((profile, index) => (
          <SelectItem
            key={profile.data.email}
            value={index.toString()}
          >
            <div className="flex items-center [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
              <LogoIcon className="w-4 h-4" />
              {profile.data.email}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

