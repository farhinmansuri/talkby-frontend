import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RoutPath } from './RouthPath'
export const PublicRoute = () => {
    const isAuthenticated = useSelector(
        (state) => state.auth.isAuthenticated
    )
    if (isAuthenticated) {
        return <Navigate to={RoutPath.HOME} replace />
    }
    return <Outlet />
}