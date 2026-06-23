import { getMyGenerations } from "./../../../services/generation/index";

const page = async () => {
  const generations = await getMyGenerations();
  console.log(generations, "gen");
  return <div></div>;
};

export default page;
