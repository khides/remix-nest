# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack TypeScript monorepo combining:
- **Backend**: NestJS API with Supabase integration
- **Frontend**: React Router (v7) with TailwindCSS and Shadcn/UI
- **Database**: Supabase (PostgreSQL with real-time features)
- **Rich Text Editor**: TipTap with collaborative editing via Hocuspocus

## Essential Commands

### Development
```bash
# Frontend development
cd apps && npm run dev

# Backend development  
cd api && npm run start:dev

# Run both frontend and backend (from respective directories)
# Terminal 1: cd api && npm run start:dev
# Terminal 2: cd apps && npm run dev
```

### Code Generation (IMPORTANT: Run after schema changes)
```bash
# From root - generates all types and API clients
npm run codegen

# Individual generation commands:
cd supabase && npm run codegen  # Database types
cd api && npm run build          # OpenAPI spec
cd apps && npm run codegen       # API client
```

### Testing
```bash
# Frontend tests
cd apps && npm run test

# Backend tests
cd api && npm run test
cd api && npm run test:e2e
```

### Code Quality
```bash
# From root - checks all projects
npm run typecheck
npm run format

# Individual projects
cd apps && npm run lint && npm run typecheck
cd api && npm run lint && npm run typecheck
```

## Architecture Overview

### Code Generation Pipeline
1. **Supabase** → Generates TypeScript types from database schema
2. **NestJS** → Generates OpenAPI spec from Zod schemas
3. **Frontend** → Generates type-safe API client from OpenAPI spec

Always run `npm run codegen` from root after modifying:
- Database schema in `supabase/migrations/`
- API DTOs/schemas in `api/src/*/dto/`
- API endpoints in `api/src/*/*.controller.ts`

### Backend Structure (api/)
- **Modular Architecture**: Each feature (agents, frames, topics, projects, owners) is a separate NestJS module
- **Repository Pattern**: Data access via `*.repository.ts` files
- **Validation**: Zod schemas in `dto/*.schema.ts` files
- **OpenAPI**: Auto-generated from Zod schemas via `@anatine/zod-openapi`

### Frontend Structure (apps/)
- **React Router v7**: Server-side rendering with file-based routing
- **Components**: Shadcn/UI components in `app/components/ui/`
- **API Client**: Generated client in `app/lib/api/` (DO NOT EDIT - auto-generated)
- **Collaborative Editor**: TipTap with Hocuspocus WebSocket server for real-time collaboration

### Authentication Flow
- Supabase handles all authentication
- Frontend uses Supabase client for auth operations
- Backend validates JWT tokens from Supabase
- Protected routes check authentication state

## Development Workflow

### Adding a New API Endpoint
1. Create/update Zod schema in `api/src/[module]/dto/`
2. Add endpoint to controller in `api/src/[module]/`
3. Run `npm run codegen` from root
4. Use generated types in frontend via `app/lib/api/`

### Modifying Database Schema
1. Create migration in `supabase/migrations/`
2. Apply migration: `cd supabase && npm run sb -- migration up`
3. Run `npm run codegen` from root
4. Update repository and service files to use new types

### Working with Collaborative Editor
- TipTap editor configuration in `apps/app/components/editor/`
- Hocuspocus server runs on port 1234 (started with frontend dev server)
- Yjs handles conflict resolution for real-time collaboration
- Document persistence via Supabase