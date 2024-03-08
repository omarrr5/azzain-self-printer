import React from 'react'
import { Outlet } from 'react-router-dom'

const DeafultLayout = () => {
  return (
    <div>
      deafult layout
      <Outlet/>
    </div>
  )
}

export default DeafultLayout
