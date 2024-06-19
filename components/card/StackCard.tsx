import React from "react";
import Card from "../ui/Card";
import { stackData } from "@/data/Stack";
import Tooltip from "../ui/Tooltip";

const StackCard = () => {
  return (
    <Card title="My Tech Stack">
      <div className="flex flex-col gap-6 mt-2">
        {stackData.map((tech, i) => (
          <div
            key={i}
            className="grid items-center gap-[90px]"
            style={{ gridTemplateColumns: "50px 1fr" }}
          >
            {/* Stack Group Name */}
            <div className="h-auto flex-none break-words whitespace-pre">
              <p className="text-secondary-foreground">{tech.title}</p>
            </div>
            {/* ToolTip */}
            <div className="flex gap-4">
              {tech.stack.map((t) => (
                <Tooltip
                  key={t.id}
                  title={t.title}
                  image={t.image}
                  bgColor={t.bgColor}
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
