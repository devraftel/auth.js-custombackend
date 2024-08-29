'use client'

import { Button } from '@/components/ui/button'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { PanelLeftClose, PanelRightClose } from 'lucide-react'
import { IconSeparator } from './ui/icons'

export function SidebarToggleClient() {
  const { toggleSidebar, isSidebarOpen } = useSidebar()

  if (isSidebarOpen) {
    return null
  }

  return (
    <div className="flex items-center justify-center">
      <Button
        variant="ghost"
        className="-ml-2 hidden size-9 p-0 lg:flex"
        onClick={() => {
          toggleSidebar()
        }}
      >
        {isSidebarOpen ? (
          <PanelLeftClose className="size-6" />
        ) : (
          <PanelRightClose className="size-6" />
        )}

        <span className="sr-only">Toggle Sidebar</span>
      </Button>
      <IconSeparator className="text-muted-foreground/50 size-6" />
    </div>
  )
}
