import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CSpinner,
  CContainer,
} from '@coreui/react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Comments = () => {

    let { id } = useParams();
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);

  useEffect(() => {
    getData(id)
}, []);

const getData = async (id) => {
    await axios.get(`http://hn.algolia.com/api/v1/items/${id}`)
          .then((resp) => {
            setData(resp.data);
            setLoading(false)
    })
    .catch((err) => {
        console.log(err);
    });
};

const timeSince = (timestamp) => {
    let date = new Date(timestamp);
    let now = new Date();
    let timeDiff = now - date;
    let diffMinutes = Math.round(timeDiff / (1000 * 60));
    let diffHours = Math.round(diffMinutes / 60);
    let diffDays = Math.round(diffHours / 24);
    let diffMonths = Math.round(diffDays / 30);
    let diffYears = Math.round(diffMonths / 12);

    if (diffYears >= 1) {
        return diffYears + " years ago";
    } else if (diffMonths >= 1) {
        return diffMonths + " months ago";
    } else if (diffDays >= 1) {
        return diffDays + " days ago"
    } else if (diffHours >= 1) {
        return diffHours + " hours ago"
    } else if (diffMinutes >= 0) {
        return diffMinutes + " minutes ago"
    }
}

const clComment = (commment) => {
    return (
        <div style={{ marginLeft: "3em" }}>
            <div
                className="grey-text"
                style={{
                    fontSize: "small",
                    display: "list-item",
                    listStyleType: "disclosure-open",
                    color: "gray",
                }}
            >
                by <Link to={`/profile/${data.author}`}>{data.author}</Link><span> {timeSince(commment.created_at)}</span>
            </div>
            <div id={`collapse${commment.id}`} style={{ backgroundColor: "#BED1E1" }} aria-labelledby={`heading${commment.id}`} data-bs-parent="#accordionExample">
                <div className="accordion-body" dangerouslySetInnerHTML={{ __html: commment.text }}></div>
            </div>
            {commment.children ? commment.children.map((commment) => clComment(commment)) : ""}
        </div>
    );
};

  return (
    <>
    {(loading)?
    <CContainer style={{textAlign: "center"}}>
      <CSpinner/>
    </CContainer>:
     <CContainer>
     <CCard>
            <CCardHeader>
                <h4>{data.title}</h4> by <Link to={`/profile/${data.author}`} style={{textDecoration: "none"}}>{data.author}</Link>
            </CCardHeader>
            <CCardBody>
            {
                (data.children) ? data.children.map((commment, index) => (
                    <div style={{ marginLeft: "3em" }} key={index}>
                        <div
                            className="grey-text"
                            style={{
                                fontSize: "small",
                                display: "list-item",
                                listStyleType: "disclosure-open",
                                color: "gray",
                            }}
                        >
                            by <Link to={`/profile/${data.author}`}>{data.author}</Link><span> {timeSince(commment.created_at)}</span>
                        </div>
                        <div id={`collapse${commment.id}`} aria-labelledby={`heading${commment.id}`} data-bs-parent="#accordionExample">
                            <div className="accordion-body" dangerouslySetInnerHTML={{ __html: commment.text }}>
                            </div>
                        </div>
                        {commment.children ? commment.children.map((commment) => clComment(commment)) : ""}
                    </div>
                )):<p>No Comments</p>
            }

            </CCardBody>
    </CCard>
     </CContainer>
      
    }
    </>
  )
}

export default Comments
