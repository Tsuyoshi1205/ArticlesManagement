import React, { useContext } from 'react';
import EditTitle from './EditTitle';
import EditBody from './EditBody';
import {PageStateContext} from './App';

function EditSpace () {
  const { AllArticles, setAllArticles, CurrentArticle, setCurrentArticle } = useContext(PageStateContext);
  return(
    <div >
      {
        CurrentArticle.id != 0 ?
        <>
          <EditTitle />
          <EditBody />
        </>
      :
        <p></p>
      }

    </div>
  );
}

export default EditSpace;