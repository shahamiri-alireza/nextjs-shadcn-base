# Features Components Organization

## Feature Structure Pattern

Each feature in the application follows a consistent pattern with two main files:

1. **Form Component** (`[Feature]Form.tsx`)

   - Contains the UI/HTML structure
   - Uses the corresponding hook for form logic
   - Focuses purely on presentation

2. **Form Hook** (`use[Feature]Form.tsx`)
   - Contains all form logic and validation
   - Handles form state and submission
   - Manages API calls and loading states

## Example: Login Feature

```
src/
└── components/
    └── features/
        └── login/
            ├── LoginForm.tsx      # UI Component
            └── useLoginForm.tsx   # Form Logic Hook
```

### Form Component Structure

```tsx
// LoginForm.tsx
'use client'

import Link from 'next/link'
import { Button, buttonVariants } from '~/components/ui/button'

import { cn } from '~/helpers/ui'
import { baseRoutes } from '~/consts/routes'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'

import useLoginForm from './useLoginForm'

const LoginForm = () => {
  const { form, onSubmit, loading } = useLoginForm()

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    className="bg-background"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="bg-background"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            Sign in
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <Link
          href={baseRoutes.RESET_PASSWORD}
          className={cn(
            buttonVariants({ variant: 'link' }),
            'text-sm text-muted-foreground underline underline-offset-4 hover:text-primary'
          )}
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  )
}

export default LoginForm
```

### Form Hook Structure

```tsx
// useLoginForm.tsx
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const loginFormSchema = z.object({
  email: z.string().email('Please enter a valid Email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export type LoginFormData = z.infer<typeof loginFormSchema>

const useLoginForm = () => {
  const { mutate: login, isPending: loading } = useLogin()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginFormData) => {
    login(data)
  }

  return { form, onSubmit, loading }
}

export default useLoginForm
```

## Benefits of This Pattern

1. **Separation of Concerns**

   - UI components focus on presentation
   - Hooks handle business logic and state management

2. **Reusability**

   - Form logic can be reused across different UI implementations
   - Easier to maintain and update validation rules

3. **Type Safety**

   - Zod schemas provide runtime validation
   - TypeScript types are automatically inferred

4. **Consistent Structure**
   - Predictable file organization
   - Easy to locate and modify feature components

## Best Practices

- Keep form UI components focused on layout and styling
- Move all form logic, validation, and API calls to the hook
- Use Zod for schema validation
- Export form data types for reuse
- Handle loading states in the hook
