# Page Components Organization

## Why Separate Page Components?

In this template, we follow a specific pattern for organizing page components to optimize performance and maintainability:

1. **Server Components by Default**:

   - All components in the `app` directory are Server Components by default
   - This provides better performance and SEO benefits

2. **Client Components When Needed**:
   - When client-side features are required (state, effects, browser APIs)
   - We create separate client components with `'use client'` directive

## Best Practices

- Keep page components (`app/*/page.tsx`) as Server Components
- Create separate client components for interactive parts
- Place client components in `components/pages/[page-name]/*`
- Import and use these client components within the page

## Example Structure

```
src/
├── app/
│   └── home/
│       └── page.tsx              # Server Component
└── components/
    └── pages/
        └── home/
            ├── Counter.tsx       # Client Component
            └── Features.tsx      # Client Component
```

This pattern ensures:

- Optimal server-side rendering
- Smaller client-side bundles
- Clear separation of concerns
- Better code organization
