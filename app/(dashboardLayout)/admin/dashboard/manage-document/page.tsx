import { getAllDocuments } from '@/services/admin/documentManagement'
import ManageDocumentsPage from './ManageDocumentPage'
const page = async() => {
  const docRes = await getAllDocuments()
  return (
    <div>
        <ManageDocumentsPage docRes = {docRes?.data}/>
    </div>
  )
}

export default page