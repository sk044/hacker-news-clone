import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler, CButton, CFormInput, CForm } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  
  const [search, setSearch] = useState("")

  const searchKey = () => {
      navigate(`/search/${search}`)
  }

  const _handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         searchKey();
      }
    }

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        Hacker News
      </CSidebarBrand>
      <br/>
      <CSidebarNav>
        <SimpleBar className="text-center" style={{paddingLeft: "1.5rem"}}>
          <CFormInput
            size="sm"
            type="search"
            className="me-2"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={_handleKeyDown}
            value={search}
            style={{maxWidth: "90%"}}/>
        </SimpleBar>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>

      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
