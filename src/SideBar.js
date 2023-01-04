import React, { useContext } from 'react';
import {PageStateContext} from './App';
import axios from 'axios';

function SideBar() {
  const { AllArticles, setAllArticles, CurrentArticle, setCurrentArticle } = useContext(PageStateContext);

  const AddArticle = () => {
    axios.post("http://localhost:3000/content", {
      title: "タイトル",
      body: "コンテンツ"
    })
    .then(res => {
      setAllArticles([...AllArticles, res.data]);
    })
    .catch(error => {
      alert("「POST /content」 Error.");
    })
  }

  const DelArticle = (e) => {
    const DeleteButtonIdNum = e.target.className.substr(14);
    const UrlDELETE = "http://localhost:3000/content/" + DeleteButtonIdNum
    axios.delete(UrlDELETE)
    .then(res => {
      let AfterDelAllArticles = [];
      let cnt = 0;
      let DelIndex = -1;
      for (const article of AllArticles){
        if (article.id != DeleteButtonIdNum){
          AfterDelAllArticles.push(article);
        }
        else {
          DelIndex = cnt;
        }
        cnt++;
      }

      if (typeof AllArticles[DelIndex+1] !== "undefined"){
        setCurrentArticle(AllArticles[DelIndex+1]);
      }
      else if (typeof AllArticles[DelIndex-1] !== "undefined"){
        setCurrentArticle(AllArticles[DelIndex-1]);
      }
      else{
        setCurrentArticle({id: 0});
      }


      setAllArticles(AfterDelAllArticles);
    })
    .catch(error => {
      alert("「DELETE /content」 Error.");
    })
  }

  const SelectArticle = (e) => {
    const TitleButtonIdNum = e.target.className.substr(13);
    for (const article of AllArticles){
      if(article.id == TitleButtonIdNum){
        setCurrentArticle(article);
      }
    }
  }

  return(
    <div>
          <div className="list-group">
              {
                AllArticles.length != 0 ?
                AllArticles.map((article, index) => (
                  <div key={index} className=".container-fluid">
                    <div className="row">
                      <div className="col-8 list-group-item list-group-item list-group-item-info">
                        <a onClick={SelectArticle} href="#" className={`${"TitleButtonId" + article.id} `} style={{textAlign: "left"}}>
                          {article.title}
                        </a>
                      </div>
                      <div className="col-4">
                        <button onClick={DelArticle} className={`${"DeleteButtonId" + article.id}`}>記事削除</button>
                      </div>
                    </div>
                  </div>
                ))
                :
                <p></p>
              }
          </div>

      <button onClick={AddArticle} >新規作成</button>
    </div>
  );
}

export default SideBar;