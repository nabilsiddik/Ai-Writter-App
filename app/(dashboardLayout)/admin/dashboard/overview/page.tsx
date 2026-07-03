import OverviewPage from './OverviewPage'
import { getOverviewData } from '@/services/admin/overviewManagement'

const page = async() => {
  const overviewData = await getOverviewData()
  return (
    <div>
      <OverviewPage overviewData={overviewData}/>
    </div>
  )
}

export default page