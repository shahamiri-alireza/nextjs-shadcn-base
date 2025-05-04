# API Hooks Organization

## API Hooks Structure

This directory contains React Query implementations for API calls. Each feature's API interactions are organized into separate hooks that handle queries and mutations.

## Implementation Pattern

Each API hook follows a consistent pattern:

1. Uses React Query's `useQuery` or `useMutation`
2. Handles API calls through dedicated endpoint functions
3. Manages side effects and state updates
4. Provides type safety for request/response data

## Example: Login Mutation Hook

```tsx
// hooks/api/auth/useLogin.ts
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'

import useUserStore from '~/stores/user'
import { baseRoutes } from '~/consts/routes'
import { handleLogin } from '~/endpoints/authEndpoints'
import { LoginFormData } from '~/components/features/auth/login-form/useLoginForm'

const useLogin = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const setUserTokens = useUserStore((state) => state.setUserTokens)
  const getSubscriptionData = useUserStore((state) => state.getSubscriptionData)

  return useMutation({
    mutationFn: (data: LoginFormData) => handleLogin(data),
    onSuccess: (res) => {
      setUserTokens(res)
      getSubscriptionData().then(() => {
        const redirectTo = searchParams.get('redirect')
        router.push(redirectTo || baseRoutes.DASHBOARD)
      })
    },
  })
}

export default useLogin
```

## Directory Structure

```
src/
└── hooks/
    └── api/
        ├── auth/
        │   ├── useLogin.ts
        │   └── useRegister.ts
        └── user/
            ├── useGetUser.ts
            └── useUpdateUser.ts
```

## Key Features

1. **Type Safety**

   - Strong typing for request and response data
   - Integration with form data types

2. **State Management**

   - Integration with global state (e.g., Zustand stores)
   - Automatic cache management through React Query

3. **Side Effects**

   - Navigation handling
   - State updates
   - Error handling

4. **Reusability**
   - Centralized API logic
   - Consistent error handling
   - Shared authentication logic

## Best Practices

1. **Organization**

   - Group related API hooks by feature
   - Keep endpoint functions separate from hooks
   - Use consistent naming conventions

2. **Error Handling**

   - Implement global error handling
   - Provide meaningful error messages
   - Handle loading states appropriately

3. **State Management**

   - Update global state in `onSuccess` callbacks
   - Handle side effects consistently
   - Manage loading and error states

4. **Type Safety**
   - Define and export types for API responses
   - Use TypeScript for all API interactions
   - Maintain type consistency across the application
