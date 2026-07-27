# Components Documentation

This document provides detailed information about the component library.

## Table of Contents

- [UI Components](#ui-components)
- [Layout Components](#layout-components)
- [Common Components](#common-components)

---

## UI Components

**Location:** `src/shared/components/ui/`

### Button
**File:** `button.tsx`

A versatile button component with multiple variants and sizes.

```tsx
import { Button } from "@shared/components/ui/button"

// Variants
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | "default" | Button variant |
| size | string | "default" | Button size |
| asChild | boolean | false | Render as child element |

---

### Card
**File:** `card.tsx`

A card component for displaying content in a contained box.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@shared/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Footer */}
  </CardFooter>
</Card>
```

---

### Input
**File:** `input.tsx`

A styled input component.

```tsx
import { Input } from "@shared/components/ui/input"

<Input type="text" placeholder="Enter text..." />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
```

---

### Label
**File:** `label.tsx`

A label component for form elements.

```tsx
import { Label } from "@shared/components/ui/label"

<Label htmlFor="email">Email</Label>
```

---

## Layout Components

**Location:** `src/shared/components/layout/`

Coming soon...

---

## Common Components

**Location:** `src/shared/components/common/`

Coming soon...

---

## Creating New Components

### Step 1: Create Component File
```tsx
// src/shared/components/ui/[component-name].tsx
import * as React from "react"
import { cn } from "@shared/lib/utils"

interface ComponentProps {
  // Define props
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("base-styles", className)}
      {...props}
    />
  )
)
Component.displayName = "Component"

export { Component }
```

### Step 2: Update Documentation
- Add component to this file
- Document props and usage examples
- Add to table of contents

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-27 | Initial release with Button, Card, Input, Label |