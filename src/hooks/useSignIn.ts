import { useState } from 'react'
import { supabase } from '../lib/supabase'

export function useSignIn() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function signIn(email: string, password: string) {
        setLoading(true)
        setError(null)

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        console.log(data)

        setLoading(false)

        if (error) {
            setError(error.message)
            return { ok: false }
        }
        return { ok: true }
    }
    return {
        signIn,
        loading,
        error,
    }
}
