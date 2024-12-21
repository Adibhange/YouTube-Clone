import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <section className="container mx-auto my-4 w-1/2 space-y-4 rounded-xl bg-foreground p-4">
      <h1 className="text-center text-3xl font-bold">Sign In</h1>

      <form className="mx-auto w-1/2 space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-xl">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#ff3533] p-2 text-white transition-colors duration-300 hover:bg-[#ff0200]"
        >
          Sign in
        </button>
      </form>

      <hr />
      <p className="p-2 text-center text-xl text-copy-light">
        Don't have an account?
        <Link to="/sign-up" className="text-blue-500">
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default SignIn;
