import React from "react";
import GenerationDetails from "./GenerationDetailsPage";
import { generationDetails, getGenerationDetails, getMyWooStore } from "@/services/generation";
import getLogedInUser from "@/services/user/userManagement";

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = await params;
  const genDetails = await getGenerationDetails(id);
  const user = await getLogedInUser()
  return (
    <div>
      <GenerationDetails genDetails={genDetails} wooStore={user?.wooCommerceStore}/>
    </div>
  );
};

export default page;
