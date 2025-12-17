export function ExampleCard() {
  return (
    <div className="flex justify-center items-center p-4 bg-gray-50 w-full">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">Login</h1>
        <p className="mb-6 text-sm text-gray-600">
          Please enter your credentials to continue
        </p>
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="field-email" className="text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              id="field-email"
              type="email"
              placeholder="Enter your email"
              required
              className="px-3 py-2 border border-gray-300 rounded text-base transition-colors focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 placeholder:text-gray-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="field-password" className="text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              id="field-password"
              type="password"
              placeholder="Enter your password"
              required
              className="px-3 py-2 border border-gray-300 rounded text-base transition-colors focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 placeholder:text-gray-500"
            />
          </div>
          <div className="mt-2">
            <button
              type="submit"
              className="w-full px-3 py-2 bg-gray-900 text-white border-none rounded text-base font-medium transition-all hover:bg-gray-700 active:scale-[0.98]"
            >
              Sign In
            </button>
          </div>
          <div className="text-center">
            <a
              href="#"
              className="text-sm text-gray-600 transition-colors hover:text-gray-900"
            >
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
