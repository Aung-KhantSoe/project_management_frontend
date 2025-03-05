import { useEffect, useState } from 'react'
import './App.css'
import { Home } from './pages/Home/Home'
import { Navbar } from './pages/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import { ProjectDetails } from './pages/ProjectDetails/ProjectDetails'
import { IssueDetails } from './pages/IssueDetails/IssueDetails'
import { Subscription } from './pages/Subscription/Subscription'
import { Auth } from './pages/Auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './Redux/Auth/Action'
import { fetchProjects } from './Redux/Project/Action'
import { store } from './Redux/Store'
import { AcceptInvitation } from './pages/Project/AcceptInvitation'

function App() {
  const dispatch = useDispatch();
    const {auth}=useSelector(store=>store)
    useEffect(()=>{
        dispatch(getUser())
        dispatch(fetchProjects(auth))
    },[auth.jwt])
  
    console.log(auth)

  return (
    <>
      {auth.user? <div>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path="/project/:id" element={<ProjectDetails />}></Route>
          <Route path="/project/:projectId/issue/:issueId" element={<IssueDetails />}></Route>
          <Route path='/upgrade_plan' element={<Subscription></Subscription>}></Route>
          <Route path='/accept_invitation' element={<AcceptInvitation></AcceptInvitation>}></Route>
        </Routes>
      </div>:<Auth/>}
    </>
  )
}

export default App
