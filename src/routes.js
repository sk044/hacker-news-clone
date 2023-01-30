import React from 'react'

//Pages
const Home = React.lazy(() => import('./views/home/home'))
const Search = React.lazy(() => import('./views/search/search'))
const Profile = React.lazy(() => import('./views/profile/profile'))
const Comment = React.lazy(() => import('./views/comments/comments'))

const routes = [
  { path: '/', exact: true, name: 'Recent Stories', element: Home },
  { path: '/search/:searchQuery', exact: true, name: 'Search', element: Search },
  { path: '/profile/:id', exact: true, name: 'Profile', element: Profile },
  { path: '/comments/:id', exact: true, name: 'Comments', element: Comment },
]

export default routes
