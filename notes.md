Protected routes and race conditions

if you update the session by signing in or updating things, always `refetch` before navigating away

the AuthGate pattern is better than explicitly laying out a callbackUrl
( Even though we did disable email verification, so on fresh start logins and signups, they would work as advertised)
It's better to use authgate pattern since if a user tries to visit a protected route, they'll get blocked, moved to login,
  and then on success sign in, they'll go *right back to where they were trying to get to*

using the callback url would lock them away to a designated spot like '/profile'

Also the authgate ensures that in the component level `useSession` always immediately returns the user if logged in.
So for authorization routes, you can just check data directly, no need to check pending



# Issues after pausing docker container
Not sure exactly why, but pausing and then restarting the container, prisma couldn't connect. Just bringing the container
fully down and then rebuilding fixed it.

Troublingly, this issue manifested in all requests simply hanginging