import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextVitals,
  {
    ignores: [".next/**", ".contentlayer/**", "node_modules/**"],
    rules: {
      // These effects synchronize state with the server-rendered theme and route changes.
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default config;
