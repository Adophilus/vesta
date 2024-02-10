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

export const AccountSwitcher: FunctionComponent = () => {
  const {
    profiles,
    isSignedIn,
    setActiveProfile,
    activeProfile: activeProfileIndex
  } = useAuthStore()

  const isCollapsed = false

  if (!isSignedIn) return null

  console.log("profiles(account-switcher):", profiles)
  const activeProfile = profiles![activeProfileIndex!]
  const profileFullName = `${activeProfile.data.firstName} ${activeProfile.data.lastName}`

  return (
    <Select
      defaultValue={activeProfileIndex!.toString()}
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
        {profiles!.map((profile, index) => (
          <SelectItem
            key={profile.data.email}
            value={index.toString()}
          >
            <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title>Gmail</title>
                <path
                  d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
                  fill="currentColor"
                />
              </svg>
              {profile.data.email}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

