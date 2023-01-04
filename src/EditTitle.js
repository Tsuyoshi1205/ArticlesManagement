import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {PageStateContext} from './App';


function EditTitle () {
  const { AllArticles, setAllArticles, CurrentArticle, setCurrentArticle } = useContext(PageStateContext);
  const [title, setTitle] = useState("タイトル");
  useEffect(() => {
    setTitle(CurrentArticle.title);
  }, [CurrentArticle.title]);

  const [EditMode, setEditMode] = useState(false);

  const doEditModeChangeTrue = (e)=> {
    setEditMode(true)
  }

  const doEditModeCancel = (e)=> {
    setEditMode(false)
    setTitle(CurrentArticle.title)
  }

  const doTitleChange = (e)=> {
    setTitle(e.target.value)
  }

  const doAction = (e)=> {
    const UrlPUT = "http://localhost:3000/content/" + CurrentArticle.id
    axios.put(UrlPUT, {
      "title": title,
      "body": CurrentArticle.body
    })
    .then(res => {
      setAllArticles((AllArticles) => (AllArticles.map((article) => (article.id==CurrentArticle.id ? Object.assign(article, res.data) : article))));
    })
    .catch(error => {
      alert("「PUT /content」 Error.");
    })
    setEditMode(false)
  }



  return(
    <div>
      {EditMode ?
        <div>
          <form onSubmit={doAction} action="">
          <input type="text" className='form-control' onChange={doTitleChange} value={title} required style={{width: "100%", boxSizing: "border-box", margin: "3em 0"}} />
            <button onClick={doEditModeCancel}>キャンセル</button>
            <input type="submit" value="タイトル保存" />
          </form>

        </div>
      :
        <div>
          <p style={{fontWeight: "bold", margin: "3em 0"}}>{title}</p>
          <button onClick={doEditModeChangeTrue}>タイトル編集</button>
        </div>
      }
    </div>
  );
}

export default EditTitle;