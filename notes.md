Protected routes and race conditions

if you update the session by signing in or updating things, always `refetch` before navigating away

the AuthGate pattern is better than explicitly laying out a callbackUrl
( Even though we did disable email verification, so on fresh start logins and signups, they would work as advertised)
It's better to use authgate pattern since if a user tries to visit a protected route, they'll get blocked, moved to login,
  and then on success sign in, they'll go *right back to where they were trying to get to*

using the callback url would lock them away to a designated spot like '/profile'