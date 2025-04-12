import { useEffect, useState } from "react";
import { AuthContext } from "./context/context";
import AppRouter from "./components/AppRouter";
import './styles/styles.css'
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";

function App() {
  const [isAuth, setIsAuth] = useState(true)

  useEffect(() => {
      if(localStorage.getItem('auth')){
        setIsAuth(true)
      }
  }, [])

  return (
    <div className='App'>
      <AuthContext.Provider
        value={{
          isAuth, setIsAuth
        }}
      >

        <BrowserRouter>
          <div className='content'>
            <Header/>
            <AppRouter/>
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
