import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {PageStateContext} from './App';


function EditBody () {
  const { AllArticles, setAllArticles, CurrentArticle, setCurrentArticle } = useContext(PageStateContext);
  const [body, setBody] = useState("コンテンツ");
  useEffect(() => {
    setBody(CurrentArticle.body);
  }, [CurrentArticle.body]);

  const [EditMode, setEditMode] = useState(false);

  const doEditModeChangeTrue = (e)=> {
    setEditMode(true)
  }

  const doEditModeCancel = (e)=> {
    setEditMode(false)
    setBody(CurrentArticle.body)
  }

  const doBodyChange = (e)=> {
    setBody(e.target.value)
  }

  const doAction = (e)=> {
    const UrlPUT = "http://localhost:3000/content/" + CurrentArticle.id
    axios.put(UrlPUT, {
      "title": CurrentArticle.title,
      "body": body
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
            <textarea type="text" className="form-control" onChange={doBodyChange} value={body} rows="20" required style={{width: "100%", padding: "0.5em 0.5em", boxSizing: "border-box", margin: "3em 0"}} />
            <button onClick={doEditModeCancel}>キャンセル</button>
            <input type="submit" value="本文保存" />
          </form>

        </div>
      :
        <div>
          <p style={{width: "100%", boxSizing: "border-box", margin: "3em 0"}}>{body}</p>
          <button onClick={doEditModeChangeTrue}>本文編集</button>
        </div>
      }
    </div>
  );
}

export default EditBody;