import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import { Dashboard } from '@/pages/Dashboard'
import { CreateProject } from './pages/Dashboard/projects/CreateProject'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            index
            path='/'
            element={<Dashboard />}
          />

          <Route
            path='/proyectos/crear'
            element={<CreateProject />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
