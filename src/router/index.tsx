import React from 'react'
import { Load } from 'components'
import { Route } from 'react-router-dom'

const getRoutes = (routeArr: any[]) =>
  routeArr.map((item) => <Route exact key={item.path} {...item} />)

export default getRoutes([
  {
    path: '/not',
    component: Load('admin/notFound')
  },
  {
    path: '/test',
    component: Load('test')
  }
])
