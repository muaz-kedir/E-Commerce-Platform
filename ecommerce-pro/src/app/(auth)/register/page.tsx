import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
        <p className="mt-1 text-sm text-gray-500">
          Join EcommercePro and start shopping today
        </p>
      </div>

      {/* Form — replace with <RegisterForm /> */}
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First name
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              required
              placeholder="John"
              className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              required
              placeholder="Doe"
              className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Min. 8 characters"
            className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
        >
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-indigo-600 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
