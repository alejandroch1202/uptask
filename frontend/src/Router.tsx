import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import { Dashboard } from '@/pages/Dashboard'
import { CreateProject } from './pages/Dashboard/projects/CreateProject'
import { EditProject } from './pages/Dashboard/projects/EditProject'
import { ProjectDetails } from './pages/Dashboard/projects/ProjectDetails'

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
      </Routes>
    </BrowserRouter>
  )
}

export default Router
