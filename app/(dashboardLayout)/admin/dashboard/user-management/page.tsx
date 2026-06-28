import React from 'react'
import UserManagementPage from './UserManagementPage'
import { getAllUsers } from '@/services/admin/userManagement'

const page = async() => {
  const userRes = await getAllUsers()
  return (
    <div>
        <UserManagementPage userRes = {userRes?.data}/>
    </div>
  )
}

export default page