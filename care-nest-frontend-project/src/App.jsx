import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router'
import MainPage from './pages/MainPage'
import AddChild from './pages/AddChild'
import EditChild from './pages/EditChild'
import ChildDetails from './pages/ChildDetails'
import AddAchievement from './pages/AddAchievement'
import ChildAchievementList from './components/ChildAchievementList/ChildAchievementList'
import EditAchievement from './pages/EditAchievement.jsx'
import SectionsList from './components/SectionsList/SectionsList.jsx'
import ViewSectionAttendance from './components/ViewSectionAttendance/ViewSectionAttendance.jsx'
import ChildrenInSectionList from './components/ChildrenInSectionList/ChildrenInSectionList.jsx'
import AddAttendance from './components/AddAttendance/AddAttendance.jsx'
import EditAttendance from './pages/EditAttendance.jsx'
import ChildrenList from './components/ChildrenList/ChildrenList.jsx'
import AttendanceDropDown from './components/AttendanceDropDown/AttendanceDropDown.jsx'
import AllChildrenAchievementsList from './components/AllChildrenAchievementsList/AllChildrenAchievementsList.jsx'
import MyChildren from './components/MyChildren/MyChildren.jsx'
import MyChildAttendance from './components/MyChildAttendance/MyChildAttendance.jsx'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Logout from './pages/Logout'
import NotFound from './components/NotFound/NotFound.jsx'
import NavBar from './components/NavBar/NavBar.jsx'
import HomePage from './pages/HomePage.jsx'
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute.jsx'
import Footer from './components/Footer/Footer.jsx'
function App() {

  return (
<div>
    <Router>
      <NavBar />
    <div className="page-wrapper">
    <Routes>
      <Route path='/' element={<MainPage />}/>
      <Route element={<ProtectedRoute />}>
        <Route path='/home' element={<HomePage />}/>
        <Route path="/logout" element={<Logout />} />
        <Route path="/add" element={<AddChild />} />
        <Route path="/children" element={<ChildrenList />} />
        <Route path="/children/:id" element={<ChildDetails />} />
        <Route path="children/:id/edit" element={<EditChild />} />
        <Route path="achievements/add" element={<AddAchievement />} />
        <Route path="children/:id/achievements/" element={<ChildAchievementList />} />
        <Route path="/achievements/:id/edit" element={<EditAchievement />} />
        <Route path="/children-achievements/" element={<AllChildrenAchievementsList />} />
        <Route path="/my-children" element={<MyChildren />} />
        <Route path="/children/:id/attendance" element={<MyChildAttendance />} />
        <Route path="/sections" element={<SectionsList />} />
        <Route path="/sections/:id/attendance" element={<ViewSectionAttendance />} />
        <Route path="/sections/:id/children/" element={<ChildrenInSectionList />} />
        <Route path="sections/:id/attendance/add/" element={<AddAttendance />} />
        <Route path="attendance/:id/edit/" element={<EditAttendance />} />
        <Route path="/attendance" element={<AttendanceDropDown />} />
      </Route>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<NotFound />}/>
    </Routes>
  </div>
  </Router>
  <Footer/>
</div>
  )
}

export default App