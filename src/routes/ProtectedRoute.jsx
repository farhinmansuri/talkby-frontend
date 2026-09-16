import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RoutPath } from './RouthPath'
export const ProtectedRoute = () => {
    const isAuthenticated = useSelector(
        (state) => state.auth.isAuthenticated
    )
    if (!isAuthenticated) {
        return <Navigate to={RoutPath.LOGIN} replace />
    }
    return <Outlet />
}