"use client"

import { ModeToggle } from "../theme/mode-toggle"

export default function Header() {
  return (
    <div className="flex flex-row items-center justify-between">
      <h1>Header</h1>
      <ModeToggle/>
    </div>
  )
}
