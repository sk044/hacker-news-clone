import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilSearch
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle, CFormInput } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: '',
  },
  {
    component: CNavItem,
    name: 'Recent Stories',
    to: '/',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  }
]

export default _nav
