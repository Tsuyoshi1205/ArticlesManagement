import React, { useState, useEffect, createContext } from 'react';
import EditSpace from './EditSpace';
import useAPIGetAllArticles from './useAPIGetAllArticles';
import SideBar from './SideBar';


export const PageStateContext = createContext();

function App() {
  const InitAllArticles = useAPIGetAllArticles();
  const [AllArticles, setAllArticles] = useState([]);
  const [CurrentArticle, setCurrentArticle] = useState([]);
  useEffect(() => {
    if(InitAllArticles != 0){
      setAllArticles(InitAllArticles);
      setCurrentArticle(InitAllArticles[0]);
    }
  }, [InitAllArticles]);


  return (
    <div>
      {
        <PageStateContext.Provider value={{AllArticles, setAllArticles, CurrentArticle, setCurrentArticle}} >
          <div className=".container-fluid">
            <div className="row">
              <div className="col-3">
                <SideBar />
              </div>
              <div className="col-7">
                <EditSpace />
              </div>
            </div>
          </div>
        </PageStateContext.Provider>
      }
    </div>

  );
}

export default App;
