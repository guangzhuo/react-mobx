import React from 'react'
import { Load } from 'components'
import { Route } from 'react-router-dom'

const getRoutes = (routeArr) => (
  routeArr.map(item => (
    <Route exact key={item.path} {...item} />
  ))
)

export default getRoutes([
  {
    path: '/admin/list',
    component: Load('admin/list')
  },
])