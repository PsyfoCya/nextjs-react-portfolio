import Card from "../ui/Card";
import { stackData } from "@/data/Stack";
import Tooltip from "../ui/Tooltip";

const StackCard = () => {
  return (
    <Card title="My Tech Stack" fill>
      <div className="flex flex-col gap-6 mt-2">
        {stackData.map((group) => (
          <div
            key={group.title}
            className="flex flex-col gap-3 sm:grid sm:items-center sm:gap-x-[90px] sm:gap-y-0 sm:[grid-template-columns:50px_1fr]"
          >
            {/* Stack Group Name */}
            <div className="h-auto flex-none break-words">
              <p className="text-secondary-foreground sm:whitespace-pre">
                {group.title}
              </p>
            </div>
            {/* ToolTip */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {group.stack.map((tech) => (
                <Tooltip
                  key={tech.id}
                  title={tech.title}
                  image={tech.image}
                  icon={tech.icon}
                  bgColor={tech.bgColor}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StackCard;
