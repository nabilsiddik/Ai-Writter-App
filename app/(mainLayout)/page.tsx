'use client'

import AnalysisResultView from '@/components/pages/HomePageContent'
import PromptInputBox from '@/components/shared/ai/PromptInputBox'
import { useState } from 'react'

const page = () => {
    const [analysisData, setAnalysisData] = useState<any | null>(null)
  return (
    <div>
        <PromptInputBox setAnalysisData = {setAnalysisData}/>
        {analysisData && (
          <div className="mt-10">
            <AnalysisResultView data={analysisData}/>
          </div>
        )}
    </div>
  )
}

export default page