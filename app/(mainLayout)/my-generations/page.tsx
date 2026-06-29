export const dynamic = "force-dynamic";
import { getMyGenerations } from "./../../../services/generation/index";
import MyGenerations from "./MyGenerations";

const page = async () => {
  const generations = await getMyGenerations();
  console.log(generations, "gen");
  return (
    <div>
      <MyGenerations generations={generations} />
    </div>
  );
};

export default page;
