import { type ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export function PrivateRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth()

    if (loading) {
        return <div style={{ color: '#fff', textAlign: 'center', marginTop: '2rem' }}>Cargando sesión...</div>
    }

    if (!user) {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}
