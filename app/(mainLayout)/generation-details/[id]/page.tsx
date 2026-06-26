import React from "react";
import GenerationDetails from "./GenerationDetailsPage";
import { generationDetails, getGenerationDetails } from "@/services/generation";

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = await params;
  const genDetails = await getGenerationDetails(id);
  return (
    <div>
      <GenerationDetails genDetails={genDetails} />
    </div>
  );
};

export default page;
