"use client";

import { login } from "../../app/actions";
// PERUBAHAN 1: Import dari "react", bukan "react-dom"
import { useActionState } from "react"; 

const initialState = {
  error: "",
};

export default function LoginPage() {
  // PERUBAHAN 2: Ganti useFormState menjadi useActionState
  // isPending adalah bonus fitur baru: true saat sedang loading
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-2 text-center">System Access</h1>
        <p className="text-gray-500 text-center mb-6 text-sm">Please identify yourself.</p>
        
        <form action={formAction} className="space-y-4">
          <input 
            type="password" 
            name="password" 
            placeholder="Passphrase..." 
            className="w-full bg-black/50 border border-white/10 text-white p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            required
            autoComplete="off"
          />
          
          {state?.error && (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-400 text-sm text-center">
              {state.error}
            </div>
          )}

          {/* Tombol bisa disable otomatis saat loading */}
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Verifying..." : "Authenticate"}
          </button>
        </form>
      </div>
    </div>
  );
}