import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CCardTitle,
  CCardText,
  CSpinner,
  CContainer,
  CFormSelect,
  CCol,
  CFormLabel
} from '@coreui/react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

const Search = () => {
  const { searchQuery } = useParams();

  const [loading, setLoading] = useState(true)
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //Filter props
  const [datatype, setDataType] = useState('story');
  const [filterType, setFilterType] = useState('search');
  const [timeBefore, setTimeBefore] = useState(0);

  useEffect(() => {
    getStories(filterType,datatype,timeBefore,page)
}, [ filterType,datatype,timeBefore,page,searchQuery]);

const changePage = (event, pageNumber) => {
    setPage(pageNumber)
    window.scrollTo(0, 0)
}

const getStories = async (filterType,datatype,timeBefore,page) => {
    setLoading(true)
    await axios.get(`https://hn.algolia.com/api/v1/${filterType}?tags=${datatype}&numericFilters=created_at_i>${timeBefore}&query=${searchQuery}&page=${page}&hitsPerPage=10`)
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

const timeBeforeSince=(timeBeforestamp)=>{
  let date = new Date(timeBeforestamp);
  let now = new Date();
  let timeBeforeDiff = now - date;
  let diffMinutes = Math.round(timeBeforeDiff / (1024 * 60));
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
        <CContainer>
            <div className="row justify-content-md-center">  
                <CCol sm="auto">
                    <CFormLabel>Type</CFormLabel>
                    <CFormSelect value={datatype} onChange={(e) => setDataType(e.target.value)}>
                        <option value="story">Stories</option>
                        <option value="comment">Comments</option>
                    </CFormSelect>
                </CCol>
                <CCol sm="auto">
                    <CFormLabel>Type</CFormLabel>
                    <CFormSelect value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option value="search">Popularity</option>
                        <option value="search_by_date">Time</option>
                    </CFormSelect>
                </CCol>
                <CCol sm="auto">
                    <CFormLabel>Upload date</CFormLabel>
                    <CFormSelect value={timeBefore} onChange={(e) => setTimeBefore(e.target.value)}>
                        <option value="0">All Time</option>
                        <option value="86400">Last 24hr</option>
                        <option value="604800">Past Week</option>
                        <option value="2592000">Past Month</option>
                        <option value="31104000">Past Year</option>
                    </CFormSelect>
                </CCol>
            </div>  
        </CContainer>
        <br/>
    {(loading)?
    <CContainer style={{textAlign: "center"}}>
      <CSpinner/>
    </CContainer>:
     <CContainer>
        <br/>
      {(stories) ? stories.map((story, index)=>
          <div key={index}>
            {(datatype === 'story')?
            <CCard>
                <CCardBody>
                    <CCardTitle>{story.title}</CCardTitle>
                    <CCardText><a href={story.url} style={{color: "inherit"}}>({simplify(story.url)})</a></CCardText>
                </CCardBody>
                <CCardFooter className="text-medium-emphasis">{story.points} points by <Link to={`/profile/${story.author}`} style={{textDecoration: "none"}}>{story.author}</Link> {timeBeforeSince(story.created_at)}  | <Link to={`/comments/${story.objectID}`} style={{textDecoration: "none"}}>{story.num_comments} Comments</Link></CCardFooter>
            </CCard>:
            <CCard>
                <CCardHeader>{story.points} points by <Link to={`/profile/${story.author}`} style={{textDecoration: "none"}}>{story.author}</Link> {timeBeforeSince(story.created_at)}  | <Link to={`/comments/${story.objectID}`} style={{textDecoration: "none"}}>View comment</Link></CCardHeader>
                <CCardBody>
                {(story._highlightResult.comment_text) &&
                    <div class="overflow-auto" style={{maxHeight: "10rem"}}>
                        <CCardText
                            dangerouslySetInnerHTML={{
                                __html: story._highlightResult.comment_text.value,
                            }}
                        >
                        </CCardText>
                    </div>
                }
                </CCardBody>
            </CCard>
            }
                

            <br/>
          </div>
      ):<></>}
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

export default Search
