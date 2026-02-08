import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import RepairTeam from './RepairTeam/RepairTeam.jsx';
import TaskComponent from './RepairTeam/TheTaskComp.jsx';
 import TheTaskList from './RepairTeam/TheTaskList.jsx';
import PotholeTaskForm from './Officer/PotholeTaskForm.jsx';
import ShowingPothole from './showingPothole.jsx';
import Login from './Login/Login.jsx';
import Manager from './Manger/Manager.jsx';
import PotholeDashboard from './Officer/Dashboard/PotholeDashboard.jsx';
import { AuthProvider } from './Context/AuthProvider.jsx';
import Layout from './Layout.jsx';
import RequireAuth from './RequireAuth.jsx';
import EmployeeList from './Manger/EmployeeList.jsx';
import EmployeeManagement from './Manger/EmployeeManagement.jsx';
import Officer from './Officer/OfficerMain/Officer.jsx';
import OfficerMain from './Officer/OfficerMain/OfficerMain.jsx';
import MainMap from './Officer/OfficerMain/MainMap.jsx';
import PotholeProvider from './Officer/ContextFolder/PotholeProvider.jsx';
import  DashboardProvider  from './Officer/Dashboard/DashboardContext/DashboardProvider.jsx';
import LoginForm from './Login/LoginForm.jsx';
import RegisterForm from './Login/RegisterForm.jsx';
function App() {
  return (
    <>
      <AuthProvider>
        <PotholeProvider>
             <DashboardProvider>
          <BrowserRouter>
            <Routes>

              {/* 🔓 PUBLIC ROUTES */}
              <Route path="/Login" element={<Login />} >
                 <Route index element={<LoginForm />} />
                 <Route path="register" element={<RegisterForm />} />
              </Route>


              {/* 🔐 PROTECTED ROUTES */}
              <Route path='/' element={<Layout />}>

                {/* role-protected */}
                <Route element={<RequireAuth allowedRoles={["manager"]} />}>
                  <Route path="/manager" element={<Manager />} >
                  <Route index element={<EmployeeList />} />
                  <Route path='employeemanagement' element={<EmployeeManagement />} />
                  </Route>
                </Route>
                <Route element={<RequireAuth allowedRoles={["officer"]} />}>
                  <Route path='/officer' element={<Officer />} >
                      <Route index element={<OfficerMain />} />

                       <Route path='MainMap' element={<MainMap />} />
                     
                      <Route path='dashboard' element={<PotholeDashboard />} />
                  </Route>
                  <Route path='/pothole-task-form' element={<PotholeTaskForm />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={["repair_team"]} />}>
                  <Route path='/' element={<RepairTeam />} >
                    <Route index element={<TheTaskList />} />
                    <Route path='/detiles' element={<TaskComponent />} />
                  </Route>
                </Route>
                
              </Route>

            </Routes>
          </BrowserRouter>
          </DashboardProvider>
        </PotholeProvider>
      </AuthProvider>
    </>
  )
}

export default App;





// import React from 'react'
// import './App.css'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './Home/MainHome/Home.jsx';
// import PotholeProvider from './Home/ContextFolder/PotholeProvider.jsx';
// import RepairTeam from './RepairTeam/RepairTeam.jsx';
// import TaskComponent from './RepairTeam/TheTaskComp.jsx';
// import TheTaskList from './RepairTeam/TheTaskList.jsx';
// import PotholeTaskForm from './Home/PotholeTaskForm.jsx';
// import ShowingPothole from './showingPothole.jsx';
// import Login  from './Login/Login.jsx';
// import Manger from './Manger/Manger.jsx';
// import RoadInspectionTaskCreator from './Home/RoadInspectionTaskCreator.jsx';
// import { AuthProvider } from './Context/AuthProvider.jsx';
// import Layout from './Layout.jsx';
// function App() {


//   return (
//     <>    
//   <AuthProvider>
//    <PotholeProvider>
//     <BrowserRouter>
//        <Routes>{/*
//            <Route path='/' element={<RepairTeam/>} >
//            <Route index element={<TheTaskList />} />
//            <Route path='/detiles' element={<TaskComponent/>} /> 
//         </Route>   */}
//          {/* <Route path='/' element={<Home/>}/>  
//          <Route path='/pothole-task-form' element={<PotholeTaskForm/>}/>  */}

//           {/* <Route path='/' element={<ShowingPothole/>}/> */}
//           <Route path ='/' element={<Layout/>}>          
//            <Route path='/Login' element={<Login/>}/>  
//              <Route element={<RequireAuth allowedRoles={["Admin", "Manager"]} />}>
//                <Route path="/Manger" element={<Manger />} />
//              </Route>

//             </Route>
//        </Routes> 
//         </BrowserRouter>
//       </PotholeProvider>
//       </AuthProvider>
//     </>
//   )
// }

// export default App
