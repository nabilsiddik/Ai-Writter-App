'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { analyzeProject } from '@/services/ai/projectAnalyser'
import { BrainCircuit, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'


interface PromptInputBoxProps {
    setAnalysisData: (data: any) => void;
}

const PromptInputBox = ({ setAnalysisData }: PromptInputBoxProps) => {
    const [prompt, setPrompt] = useState<string | undefined>()
    const [isLoading, setIsLoading] = useState(false)

    // Analyze project
    const handleAnalyze = async() => {
       if(!prompt || prompt.trim().length < 50){
        return toast.error('Please provide a more detailed prompt (min 50 chars)')
      }
      console.log(prompt, 'prompt value');
      const toastId = toast.loading('Generating....')
      setIsLoading(true)
      try{
        const res = await analyzeProject(prompt)
        if(res?.success){
          setAnalysisData(res?.data)
          toast.success('Idea Generated', {id: toastId})
        }else{
          toast.error(res?.message || 'Generation Failed', { id: toastId })
        }
      }catch(err){
        console.log('Something went wrong', err);
        toast.error('Something Went Wrong!', {id: toastId})
      }finally {
        setIsLoading(false)
      }
    }


  return (
    <div className='max-w-7xl mx-auto px-10 xl:px-0 mt-10'>
            <div className="relative group">
                <Textarea 
                    value={prompt} 
                    onChange={(e) => setPrompt(e.target.value)} 
                    placeholder="Describe your project (e.g., 'A management system for a Bangladeshi Madrasa with bKash integration')" 
                    className='min-h-44 p-6 text-lg rounded-3xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm transition-all' 
                />
            </div>
            
            <Button 
                onClick={handleAnalyze} 
                disabled={isLoading}
                className='mt-5 py-7 px-10 text-lg cursor-pointer rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200'
            >
                {isLoading ? (
                    <><Loader2 className="animate-spin mr-2" /> Processing...</>
                ) : (
                    <><BrainCircuit className="mr-2" /> Bring Out Your Project</>
                )}
            </Button>
        </div>
  )
}

export default PromptInputBox