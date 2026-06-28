import { getAllTransactions } from '@/services/admin/transactionManagement'
import UserManagementPage from '../user-management/UserManagementPage'
import TransactionsPage from './TransactionsPage'

const page = async() => {
  const tranRes = await getAllTransactions()
  return (
    <div>
        <TransactionsPage tranRes = {tranRes?.data}/>
    </div>
  )
}

export default page