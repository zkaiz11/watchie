import { Route, Routes } from "react-router-dom"
import ErrorPage from "./routes/ErrorPage"
import Auth from "./pages/Auth"
import Home from "./pages/Home"
import Watch from "./pages/Watch"
import Favorite from "./pages/Favorite"
import { Root } from "./routes/root"
import Dashboard from "./pages/Dashboard"
import useUsers from "./hooks/useUsers"
import useCurrentUser from "./hooks/useCurrentUser"
import { useEffect, useState } from "react"

function App() {
  const { data: users } = useUsers();
  const { data: currentUser } = useCurrentUser();
  const [ isLogin, setIsLogin ] = useState(false);
  
  useEffect(() => {
    if (currentUser) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [currentUser])

  return ( 
    <Routes>
    <Route path="/" element={<Auth isLogin={isLogin}/>} errorElement={<ErrorPage/>}></Route>
    <Route path="/home" element={<Root/>} errorElement={<ErrorPage/>}>
      <Route index element={<Home/>} />
      <Route path="/home/favorite" element={<Favorite/>} errorElement={<ErrorPage />}></Route>
      <Route path="/home/dashboard" element={<Dashboard data={users}/>} errorElement={<ErrorPage/>}></Route>
    </Route>
    {/* <Route path="/home" element={<Home/>} errorElement={<ErrorPage/>}></Route> */}
    <Route path="/watch" element = {<Watch/>} errorElement={<ErrorPage/>}></Route>
    <Route path="/favorite" element = {<Favorite/>} errorElement={<ErrorPage/>}></Route>
    <Route path="*" element={<ErrorPage/>} errorElement={<ErrorPage/>}></Route>
  </Routes>
  )
}

export default App
