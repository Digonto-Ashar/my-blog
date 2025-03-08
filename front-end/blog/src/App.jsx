import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreatePost from './pages/CreatePost'
import SinglePost from './pages/SinglePost'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/posts/:id" element={<SinglePost />} />
        <Route element={<PrivateRoute />}>
          <Route path="/create" element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  )
}