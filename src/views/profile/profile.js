import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CTable,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CSpinner,
  CContainer,
} from '@coreui/react'
import axios from 'axios';

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

const Profile = () => {

    let { id } = useParams();
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);

  useEffect(() => {
    getData(id)
}, []);

const getData = async (id) => {
    await axios.get(`http://hn.algolia.com/api/v1/users/${id}`)
          .then((resp) => {
            setData(resp.data);
            setLoading(false)
    })
    .catch((err) => {
        console.log(err);
    });
};

  return (
    <>
    {(loading)?
    <CContainer style={{textAlign: "center"}}>
      <CSpinner/>
    </CContainer>:
     <CContainer>
     <CCard>
            <CCardHeader>Username: {data.username}</CCardHeader>
            <CCardBody>
            <CTable borderless>
                    <CTableBody>
                        <CTableRow>
                            <CTableHeaderCell scope="row">About</CTableHeaderCell>
                            <CTableDataCell>{(data.about)?data.about:"-"}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableHeaderCell scope="row">Total Submissions</CTableHeaderCell>
                            <CTableDataCell>{data.submission_count}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableHeaderCell scope="row">Total Comments</CTableHeaderCell>
                            <CTableDataCell>{data.comment_count}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableHeaderCell scope="row">Karma</CTableHeaderCell>
                            <CTableDataCell>{data.karma}</CTableDataCell>
                        </CTableRow>

                    </CTableBody>
                </CTable>
            </CCardBody>
            <CCardFooter className="text-medium-emphasis">Account active from {formatDate(data.created_at)}</CCardFooter>
    </CCard>
     </CContainer>
      
    }
    </>
  )
}

export default Profile
