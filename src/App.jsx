import React from 'react'
import { ThemeCustomeProvider } from './context/Theme/ThemeProvider'
import Layout from './pages/Layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Teacher from './pages/Faculty/Teacher'
import Student from './pages/Student'
import Liberary from './pages/Faculty/Liberary'
import Admin from './pages/Admin/Admin'
import { AttendanceModalProvider } from './context/AttendanceModalContext'
import { ThemeCustomeHook } from './context/Theme/ThemeCustomeHook'
import { ModalProvider } from './context/ModalContext'
import RoleSelector from './pages/RoleSelector'
import GlobalAttendanceModal from './component/teacher/GlobalAttendanceModal'
import Hod from './pages/HOD/Hod'


function App() {
  const { theme, toggleTheme } = ThemeCustomeHook()


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleSelector />} />

          <Route element={<Layout />}>
            <Route path="/login" element={<Login theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/teacher" element={<AttendanceModalProvider>
              <Teacher theme={theme} />
              <GlobalAttendanceModal />
            </AttendanceModalProvider>} />
            <Route path='/hod' element={<Hod/>}/>
            <Route path="/student" element={<ModalProvider>
              <Student theme={theme} />
            </ModalProvider>} />
            <Route path="/library" element={<Liberary theme={theme} />} />
            <Route path="/admin" element={<Admin theme={theme} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App