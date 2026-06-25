import React from 'react'
import GenerationDetails from './GenerationDetailsPage';
import { generationDetails } from '@/services/generation';

const page = async({params}: {
  params: {
    id: string
  }
}) => {
  const {id} = await params
  const genDetails = await generationDetails(id)
  return (
    <div>
        <GenerationDetails/>
    </div>
  )
}

export default page