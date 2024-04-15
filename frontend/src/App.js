import './App.css';
import {Routes , Route } from "react-router-dom" ;
import LoginUser from './components/Home/Home.js';
import RegisterUser from "./components/RegisterUser/RegisterUser.js" ;
import FileSubmission from "./components/FileSubmission/FileSubmission.js"; 
function App() {

  return (
    <>
      <div className="App"> 
          <Routes> 
              <Route path="/" element={<LoginUser/> } /> 
              <Route path="/RegisterUser" element={<RegisterUser/> } /> 
              <Route path="/FileSubmission" element={<FileSubmission/> } /> 
          </Routes> 
      </div> 
    </>
  );
}

export default App;