import { getMyGenerations } from "./../../../services/generation/index";
import MyGenerations from "./MyGenerations";

const page = async () => {
  const generations = await getMyGenerations();
  return (
    <div>
      <MyGenerations generations={generations} />
    </div>
  );
};

export default page;
