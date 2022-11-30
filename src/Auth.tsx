import React, {
  FormEvent,
  useState,
} from "react"
import { supabase } from './supabaseClient'

type AuthProps = {};

const Auth: React.FC<AuthProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({ email })

      if (error) {
        throw error;
      }

      alert('Check your email for the login link!')
    } catch (error) {
      alert(`Error logging in: ${(error as Error).message}`);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full items-center justify-center flex flex-col rounded p-16 text-xl">
      <h1 className="font-bold text-3xl mb-4">Log In</h1>
      <p className="text-center mb-4">Sign in via magic link with your email below</p>
      {loading && (
        <p className="mb-4">Sending magic link...</p>
      )}
      {!loading && (
        <form
          onSubmit={handleLogin}
          className="flex flex-col"
        >
          <div>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-black py-1 px-2 mb-4 rounded"
            />
          </div>
          <button
            type="submit"
            className="
              rounded border-2 border-black py-1 bg-gray-100 hover:brightness-75
              disabled:200 disabled:hover:brightness-100
            "
            disabled={email === ""}
          >
            Send magic link
          </button>
        </form>
      )}
    </div>
  )
}

export default Auth;
