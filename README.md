# Base React Project

A scalable React application with feature-based architecture, built with Bun, Vite, and shadcn/ui.

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Runtime | Bun | Latest |
| Build Tool | Vite | 8.x |
| UI Library | React | 19.x |
| Language | TypeScript | 6.x |
| Styling | Tailwind CSS | 4.x |
| Components | shadcn/ui | Latest |
| State Management | Zustand | 5.x |
| Server State | TanStack React Query | 5.x |
| Virtualization | TanStack Virtual | 3.x |
| Routing | React Router | 7.x |
| Forms | React Hook Form + Zod | Latest |
| HTTP Client | Axios | 1.x |
| Icons | Lucide React | Latest |
| Date Utils | date-fns | 4.x |

## Project Structure

```
src/
├── shared/              # Globally shared across all features
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── layout/      # Layout components
│   │   └── common/      # Common components
│   ├── hooks/           # Shared custom hooks
│   ├── lib/             # Utility functions
│   │   ├── utils.ts     # cn() utility
│   │   ├── logger.ts    # Logger utility
│   │   └── api-client.ts # Axios instance
│   ├── stores/          # Global Zustand stores
│   ├── types/           # Shared TypeScript types
│   └── constants/       # App-wide constants
├── core/                # Core app configuration
│   ├── providers/       # Context providers
│   ├── routing/         # Route definitions
│   ├── config/          # App configuration
│   └── middleware/      # API interceptors
└── features/            # Feature-based modules
    ├── auth/            # Authentication feature
    ├── dashboard/       # Dashboard feature
    └── home/            # Home feature
```

## Getting Started

### Prerequisites
- Bun installed ([https://bun.sh](https://bun.sh))

### Installation
```bash
# Clone the repository
git clone git@github.com:parth-patel-25/base-reactjs-project.git

# Navigate to project directory
cd base-reactjs-project

# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun build

# Preview production build
bun preview
```

## Features

- Feature-based architecture for scalability
- shadcn/ui components with Tailwind CSS
- Global state management with Zustand
- Server state management with React Query
- Virtual scrolling with TanStack Virtual
- Form validation with React Hook Form + Zod
- Dark mode support
- API client with interceptors
- TypeScript strict mode
- ESLint + Prettier configuration
- Comprehensive logging system

## Documentation

- [Features Guide](./docs/features.md) - Detailed feature documentation
- [Components Guide](./docs/components.md) - Component library documentation
- [Hooks Guide](./docs/hooks.md) - Custom hooks documentation
- [API Guide](./docs/api.md) - API integration guide

## Coding Rules

See [AGENTS.md](./AGENTS.md) for detailed coding rules and conventions.

### Key Rules
1. **Max 200 lines per file** - Split files that exceed this limit
2. **Use TanStack Virtual** for lists with 50+ items
3. **Feature-based architecture** - Keep features independent
4. **Shared components** - Reuse across features via `shared/`
5. **TypeScript strict** - No `any` types allowed
6. **Responsive units** - Never use hard-coded px values
7. **Logger utility** - Never use console directly

## Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun preview` | Preview production build |
| `bun lint` | Run ESLint |
| `bun format` | Format code with Prettier |

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3001/api
```

## License

MIT