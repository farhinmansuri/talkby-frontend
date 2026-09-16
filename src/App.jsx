import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './routes/LoginPage'
import { RoutPath } from './routes/RouthPath'
import RegisterPage from './routes/RegisterPage'
import HomePage from './chatRoute/HomePage'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PublicRoute } from './routes/PublicRoute'
import NotFoundPage from './routes/NotFoundPage'
import { ProtectedRoute } from './routes/ProtectedRoute'
import ProfilePage from './routes/ProfilePage'
import { useSelector } from 'react-redux'
import SearchPage from './otherRoute/SearchPage'
import FriendPage from './otherRoute/FriendPage'



function App() {
  const [count, setCount] = useState(0)
  const queryClient = new QueryClient()


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>

        <QueryClientProvider client={queryClient}>

          <BrowserRouter>
            <Routes>

              <Route element={<PublicRoute />}
              >


                <Route element={<LoginPage />}
                  path={RoutPath.LOGIN} />
                <Route element={<RegisterPage />}
                  path={RoutPath.SINGUP} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route element={<HomePage />} path={RoutPath.HOME} />
                <Route element={<ProfilePage />} path={RoutPath.PROFILE} />
                <Route element={<FriendPage />} path={RoutPath.SEARCH} />
              </Route>

              <Route path='*' element={<NotFoundPage />} />
            </Routes>
            <Toaster position='top-right' />

          </BrowserRouter>
        </QueryClientProvider>
      </PersistGate>
    </Provider>

  )
}

export default App
