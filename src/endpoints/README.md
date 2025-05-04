# API Endpoints Organization

## Endpoints Structure

This directory contains pure API call implementations. Each feature's API endpoints are organized into separate files that handle the actual HTTP requests.

## Implementation Pattern

Each endpoint file follows a consistent pattern:

1. Uses a centralized axios instance
2. Implements specific API calls
3. Handles type safety for request/response
4. Returns typed responses

## Example: Authentication Endpoints

```tsx
// endpoints/authEndpoints.ts
import { useAxios } from '~/plugins/api'
import _endpoint from '~/plugins/endpoint'
import IUserTokens from '~/dtos/auth/IUserTokens'
import { UserDto } from '~/dtos/auth/UserDto'
import { LoginFormData } from '~/components/features/auth/login-form/useLoginForm'
import { RegisterFormData } from '~/components/features/auth/register-form/useRegisterForm'

export const handleGoogleLogin = async (
  token: string
): Promise<IUserTokens> => {
  const axios = useAxios()
  const url = _endpoint.getUrl('google-login')

  const response = await axios.post<IUserTokens>(url, {
    token: token,
  })

  return response?.data
}

export const handleLogin = async (
  data: LoginFormData
): Promise<IUserTokens> => {
  const axios = useAxios()
  const url = _endpoint.getUrl('login')
  const response = await axios.post<IUserTokens>(url, data)
  return response.data
}

export const handleRegister = async (
  data: RegisterFormData
): Promise<UserDto> => {
  const axios = useAxios()
  const url = _endpoint.getUrl('register')
  const response = await axios.post<UserDto>(url, data)
  return response.data
}
```

## Directory Structure

```
src/
└── endpoints/
    ├── authEndpoints.ts
    ├── userEndpoints.ts
    └── subscriptionEndpoints.ts
```

## Key Features

1. **Separation of Concerns**

   - Pure API call implementations
   - No business logic or state management
   - Centralized HTTP request handling

2. **Type Safety**

   - Strong typing for request parameters
   - Type-safe response handling
   - Integration with DTOs and form types

3. **Reusability**

   - Centralized API call implementations
   - Consistent error handling
   - Shared across different hooks

4. **Maintainability**
   - Single responsibility principle
   - Easy to update API endpoints
   - Clear separation from business logic

## Best Practices

1. **Organization**

   - Group related endpoints by feature
   - Use consistent naming conventions
   - Keep endpoints focused and specific

2. **Type Safety**

   - Define and use DTOs for all API interactions
   - Use TypeScript for all endpoint implementations
   - Maintain type consistency

3. **Error Handling**

   - Let the calling code handle errors
   - Return typed responses
   - Use consistent response formats

4. **Implementation**
   - Use centralized axios instance
   - Implement one function per endpoint
   - Keep functions pure and focused
   - Use proper typing for all parameters and responses
