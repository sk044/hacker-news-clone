import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardTitle,
  CCardText,
  CSpinner,
  CContainer,
} from '@coreui/react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

const Home = () => {

  const [loading, setLoading] = useState(true)
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getStories(page)
}, [ page]);

const changePage = (event, pageNumber) => {
    setPage(pageNumber)
    window.scrollTo(0, 0)
}

const getStories = async (page) => {
  setLoading(true)
  await axios.get(`http://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}&hitsPerPage=10`)
        .then((resp) => {
          setStories(resp.data.hits);
          setTotalPages(resp.data.nbPages)
          setLoading(false)
  })
  .catch((err) => {
      console.log(err);
  });
};

const simplify = (url) => {
  let urlObj = "";
  if (url) {
    urlObj = new URL(url, "https://www.google.com");
    return urlObj.host;
  }else{
    return url;
  }
  
}

const timeSince=(timestamp)=>{
  let date = new Date(timestamp);
  let now = new Date();
  let timeDiff = now - date;
  let diffMinutes = Math.round(timeDiff / (1024 * 60));
  let diffHours = Math.round(diffMinutes / 60);
  let diffDays = Math.round(diffHours / 24);
  let diffWeeks = Math.round(diffDays / 7);
  let diffMonths = Math.round(diffWeeks / 4);
  let diffYears = Math.round(diffMonths / 12);
  
  if(diffYears >= 1){
      return diffYears + " years ago";
  } else if(diffMonths >= 1){
      return diffMonths + " months ago";
  } else if(diffWeeks >= 1){
      return diffWeeks + " weeks ago"
  } else if(diffDays >= 1){
      return diffDays + " days ago"
  } else if(diffHours >= 1){
      return diffHours + " hours ago"
  } else if(diffMinutes>=0){
      return diffMinutes + " minutes ago"
  }
  }

  return (
    <>
    {(loading)?
    <CContainer style={{textAlign: "center"}}>
      <CSpinner/>
    </CContainer>:
     <CContainer>
      {(stories.length>0) ? stories.map((story, index)=>
          <div key={index}>
            <CCard>
              <CCardBody>
                  <CCardTitle>{story.title}</CCardTitle>
                  <CCardText><a href={story.url} style={{color: "inherit"}}>({simplify(story.url)})</a></CCardText>
              </CCardBody>
              <CCardFooter className="text-medium-emphasis">{story.points} points by <Link to={`/profile/${story.author}`} style={{textDecoration: "none"}}>{story.author}</Link> {timeSince(story.created_at)}  | <Link to={`/comments/${story.objectID}`} style={{textDecoration: "none"}}>{story.num_comments} Comments</Link></CCardFooter>
            </CCard>
            <br/>
          </div>
      ):<>
      <p>No stories !!!</p>
      </>}
        <Pagination
          count={totalPages}
          page={page}
          onChange={changePage}
          variant="outlined"
          color="primary"
          shape="rounded"
        />
     </CContainer>
      
    }
    </>
  )
}

export default Home
