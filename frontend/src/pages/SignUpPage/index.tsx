import { authClient } from "../../lib/auth-client"; //import the auth client

// {
//     "token": "gI1LR5Ze7uoiDBYUEiOZWXK0eGnurrrR",
//     "user": {
//         "name": "bob",
//         "email": "bob@gmail.com",
//         "emailVerified": false,
//         "image": null,
//         "createdAt": "2026-03-12T05:18:53.984Z",
//         "updatedAt": "2026-03-12T05:18:53.984Z",
//         "id": "3"
//     }
// }

export default function SignUpPage() {
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const { email, password, name } = Object.fromEntries(new FormData(e.target)) as { [key: string]: string }

    try {
      const { data, error } = await authClient.signUp.email({
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        callbackURL: "/" // A URL to redirect to after the user verifies their email (optional)
      }, {
        onRequest: (ctx) => {
          console.log('on Request:', ctx);
          //show loading
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          console.log('onSuccess ctx:', ctx);
        },
        onError: (ctx) => {
          // display the error message
          console.log('fuck me:',);
          console.error('it broke', ctx)
          alert(ctx.error.message);
        },
      });

      if (error) {
        return console.error(error)
      }

      console.log('data:', data);
      e.target.reset();
    } catch (error) {
      console.log('it readlly fucked:', error);
    }


  }
  return <div className="m-2">
    <h1 className="text-3xl mb-4">Sign up!</h1>
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl">Create your user</h2>
      <label className="block">
        Email:
        <input type="text" name="email" className="border rounded px-1 m-1" />
      </label>
      <label>
        Name:
        <input type="text" className="border rounded px-1 m-1" name="name" />
      </label>
      <label className="block">
        Password:
        <input type="text" className="border rounded px-1 m-1" name="password" />
      </label>


      <button className="border rounded-xl px-3 hover:bg-gray-200 active:bg-gray-400">Submit</button>
    </form>
  </div>;
}