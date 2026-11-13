import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
    :root {
    --vinho: #3d1010;
    --dest: rgba(255, 19, 19, 0.25);
    --painel: #121212;
    --txt: #f0f0f0;
    --mut: rgba(240, 240, 240, 0.65);
    --cinza: #2a2a2a;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  [hidden] { display: none !important; }

   body {
     background: #000;
     color: var(--txt);
     font: 16px "Inter Variable", system-ui, sans-serif;
   }

  button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }
  a { color: inherit; text-decoration: none; }
  :focus-visible { outline: 2px solid var(--txt); outline-offset: 2px; }
`;