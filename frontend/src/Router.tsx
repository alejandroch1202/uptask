import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { Dashboard } from '@/pages/common/Dashboard'
import { CreateProject } from '@/pages/projects/CreateProject'
import { EditProject } from '@/pages/projects/EditProject'
import { ProjectDetails } from '@/pages/projects/ProjectDetails'
import { Login } from '@/pages/auth/Login'
import { Signup } from '@/pages/auth/Signup'
import { Confirm } from '@/pages/auth/Confirm'
import { RequestToken } from '@/pages/auth/RequestToken'
import { NotFound } from '@/pages/common/NotFound'
import { ForgotPassword } from '@/pages/auth/ForgotPassword'
import { NewPassword } from '@/pages/auth/NewPassword'
import { ProjectTeam } from './pages/projects/ProjectTeam'
import { ProfileSettings } from './pages/profile/ProfileSettings'
import { ChangePassword } from './pages/profile/ChangePassword'
import { ProfileLayout } from './layouts/ProfileLayout'

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

          <Route
            path='/proyectos/:projectId/colaboradores'
            element={<ProjectTeam />}
          />

          <Route element={<ProfileLayout />}>
            <Route
              index
              path='/perfil'
              element={<ProfileSettings />}
            />

            <Route
              index
              path='/perfil/cambiar-clave'
              element={<ChangePassword />}
            />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route
            path='/auth/iniciar-sesion'
            element={<Login />}
          />

          <Route
            path='/auth/registrarse'
            element={<Signup />}
          />

          <Route
            path='/auth/confirmar-cuenta'
            element={<Confirm />}
          />

          <Route
            path='/auth/solicitar-codigo'
            element={<RequestToken />}
          />

          <Route
            path='/auth/olvide-clave'
            element={<ForgotPassword />}
          />

          <Route
            path='/auth/cambiar-clave'
            element={<NewPassword />}
          />

          <Route
            path='*'
            element={<NotFound />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
