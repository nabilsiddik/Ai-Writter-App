import { cn } from "@/lib/utils";

const ActivityCard = ({
  number,
  text,
  className,
}: {
  number: number;
  text: string;
  className?: string;
}) => {
  return (
    <div
      className={cn("p-10 border rounded-lg shadow-md", className && className)}
    >
      <h2 className="font-bold text-3xl">
        {number} {text}
      </h2>
    </div>
  );
};

export default ActivityCard;
