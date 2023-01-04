import { useState, useEffect } from 'react';
import axios from 'axios';

const useAPIGetAllArticles = () => {
  {
    const [AllArticles, setAllArticles] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:3000/content")
      .then(res => {
        setAllArticles(res.data);
      })
      .catch(error => {
        alert("「GET /content」 Error.");
      })
    }, []);

    return AllArticles;
  }
}

export default useAPIGetAllArticles;