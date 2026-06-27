import React from "react";
import GenerationDetails from "./GenerationDetailsPage";
import { generationDetails, getGenerationDetails, getMyWooStore } from "@/services/generation";

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = await params;
  const genDetails = await getGenerationDetails(id);
  const wooStore = await getMyWooStore();
  return (
    <div>
      <GenerationDetails genDetails={genDetails} wooStore={wooStore}/>
    </div>
  );
};

export default page;
