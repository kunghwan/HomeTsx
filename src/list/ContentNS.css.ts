import { style, keyframes } from "@vanilla-extract/css";

const borderAnaimation = keyframes({
  "0%": { transform: "translateY(500px)", opacity: 0 },

  "100%": { transform: "translateY(0) ", opacity: 1 },
});

export const Cont1 = {
  container: style({ border: "1px solid black" }),
  ce3: style({
    animation: `${borderAnaimation} 1s ease`,
  }), // Adding a color to the border for visibility
};

export default Cont1;
