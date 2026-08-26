"use client";

import AnimatedCursor from "react-animated-cursor";

interface CursorProps {
  color: string;
}

// Hoisted so the cursor is not handed three freshly allocated props on every
// render of the root layout. `.link` is the opt-in class the cards and cards-
// like elements carry.
const CLICKABLES = ["a", "button", "select", "input", ".link"];

const Cursor = ({ color }: CursorProps) => (
  <AnimatedCursor
    innerSize={8}
    outerSize={35}
    innerScale={1}
    outerScale={2}
    outerAlpha={0}
    innerStyle={{ backgroundColor: color }}
    outerStyle={{ border: `1px solid ${color}` }}
    clickables={CLICKABLES}
  />
);

export default Cursor;
