import { getAllSubscriptions } from '@/services/admin/subscriptionManagement'
import SubscriptionsPage from './SubscriptionsPage'

const page = async() => {
  const subRes = await getAllSubscriptions()
  return (
    <div>
        <SubscriptionsPage subRes = {subRes?.data}/>
    </div>
  )
}

export default page