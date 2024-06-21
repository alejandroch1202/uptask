import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { Dashboard } from '@/pages/dashboard'
import { CreateProject } from '@/pages/projects/CreateProject'
import { EditProject } from '@/pages/projects/EditProject'
import { ProjectDetails } from '@/pages/projects/ProjectDetails'
import { Login } from './pages/auth/Login'
import { Signup } from './pages/auth/Signup'
import { Confirm } from './pages/auth/Confirm'
import { RequestToken } from './pages/auth/RequestToken'

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

          <Route
            path='/proyectos/:projectId'
            element={<ProjectDetails />}
          />

          <Route
            path='/proyectos/:projectId/editar'
            element={<EditProject />}
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route
            index
            path='/auth/iniciar-sesion'
            element={<Login />}
          />

          <Route
            index
            path='/auth/registrarse'
            element={<Signup />}
          />

          <Route
            index
            path='/auth/confirmar-cuenta'
            element={<Confirm />}
          />

          <Route
            index
            path='/auth/solicitar-codigo'
            element={<RequestToken />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
