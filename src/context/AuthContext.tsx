/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import type { Session, User } from '@supabase/supabase-js'

export type AuthContextType = {
    user: User | null
    loading: boolean
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let ignore = false

        async function loadSession() {
            const { data } = await supabase.auth.getSession()
            if (!ignore) {
                setUser(data.session?.user ?? null)
                setLoading(false)
            }
        }

        loadSession()

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session: Session | null) => {
            setUser(session?.user ?? null)
        })

        return () => {
            ignore = true
            subscription.unsubscribe()
        }
    }, [])

    async function signOut() {
        await supabase.auth.signOut()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) {
        throw new Error('useAuth debe usarse dentro de <AuthProvider>')
    }
    return ctx
}


