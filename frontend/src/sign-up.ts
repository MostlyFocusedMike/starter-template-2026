// import { authClient } from "@/lib/auth-client"; //import the auth client

// const { data, error } = await authClient.signUp.email({
//   email, // user email address
//   password, // user password -> min 8 characters by default
//   name, // user display name
//   image, // User image URL (optional)
//   callbackURL: "/" // A URL to redirect to after the user verifies their email (optional)
// }, {
//   onRequest: (_ctx) => {
//     //show loading
//   },
//   onSuccess: (_ctx) => {
//     //redirect to the dashboard or sign in page
//   },
//   onError: (ctx) => {
//     // display the error message
//     alert(ctx.error.message);
//   },
// });