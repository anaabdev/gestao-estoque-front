import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    color-scheme: dark;
    --app-bg: #000;
    --vinho: #3d1010;
    --dest: rgba(255, 19, 19, 0.25);
    --painel: #121212;
    --txt: #f0f0f0;
    --mut: rgba(240, 240, 240, 0.65);
    --cinza: #2a2a2a;
    --surface-main: #090909;
    --surface-card: #080808;
    --surface-raised: #191919;
    --surface-field: #141414;
    --surface-dialog: #030303;
    --border-subtle: rgba(255, 255, 255, 0.08);
    --border-strong: #555;
    --surface-hover: #202020;
    --surface-selected: #271313;
    --surface-selected-hover: #301717;
    --text-soft: #dedede;
    --success-text: #a9cdb9;
    --row-hover: #111;
    --accent-text: #c36a6a;
    --accent-surface: #321515;
    --theme-choice-accent: #73b98a;
    --theme-choice-surface: #173321;
    --theme-choice-check: #34794f;
    --action-bg: #f0f0f0;
    --action-text: #111;
    --login-button-hover: #4f1414;
    --input-border: #3b3b3b;
    --input-placeholder: #707070;
    --panel-gradient: linear-gradient(155deg, #431616 0%, #211010 25%, var(--painel) 48%);
    --welcome-gradient: radial-gradient(ellipse at 92% 105%, #551d1d80 0%, transparent 44%), linear-gradient(120deg, #090909, #151515);
    --section-gradient: linear-gradient(145deg, #0a0a0a, #080808 72%);
    --login-page: radial-gradient(ellipse at center, #1b1b1b 0%, #0a0a0a 45%, #000 75%);
    --login-card: radial-gradient(circle at 25% 12%, #3d1010 0, transparent 55%), radial-gradient(circle at 80% 92%, #3d1010 0, transparent 50%), #0b0b0b;
  }

  :root[data-theme="light"] {
    color-scheme: light;
    --app-bg: #e9ebef;
    --vinho: #7c2929;
    --dest: rgba(150, 38, 38, 0.13);
    --painel: #f3f4f6;
    --txt: #1b1c20;
    --mut: rgba(31, 34, 40, 0.66);
    --cinza: #e4e6ea;
    --surface-main: #fff;
    --surface-card: #fff;
    --surface-raised: #f2f3f5;
    --surface-field: #fafafa;
    --surface-dialog: #fff;
    --border-subtle: rgba(16, 18, 24, 0.1);
    --border-strong: #c3c5cb;
    --surface-hover: #e6e7eb;
    --surface-selected: #f8eaea;
    --surface-selected-hover: #f4e1e1;
    --text-soft: #34363b;
    --success-text: #276b45;
    --row-hover: #f4eeee;
    --accent-text: #9b3434;
    --accent-surface: #f8eaea;
    --theme-choice-accent: #337d4d;
    --theme-choice-surface: #e7f4ea;
    --theme-choice-check: #337d4d;
    --action-bg: #292a2d;
    --action-text: #fff;
    --login-button-hover: #692222;
    --input-border: #c9cbd1;
    --input-placeholder: #777b83;
    --panel-gradient: linear-gradient(155deg, #b3dfc0 0%, #e0efe4 29%, var(--painel) 53%);
    --welcome-gradient: radial-gradient(ellipse at 92% 105%, #91cda2 0%, transparent 46%), linear-gradient(120deg, #fff, #f7f7f8);
    --section-gradient: linear-gradient(145deg, #fff, #f7f7f8 72%);
    --login-page: radial-gradient(ellipse at center, #fff 0%, #f3f3f5 70%);
    --login-card: radial-gradient(circle at 25% 12%, #bde4c8 0, transparent 55%), radial-gradient(circle at 80% 92%, #a4d9b2 0, transparent 50%), #fff;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  [hidden] { display: none !important; }
  html, body, #root { min-height: 100%; }

  body {
    background: var(--app-bg);
    color: var(--txt);
    font: 16px "Inter Variable", system-ui, sans-serif;
    transition: background-color .18s ease, color .18s ease;
  }

  button, input, select { font: inherit; }
  button { color: inherit; background: none; border: 0; cursor: pointer; }
  a { color: inherit; text-decoration: none; }
  :focus-visible { outline: 2px solid var(--accent-text); outline-offset: 2px; }

  html[data-theme="light"] aside img,
  html[data-theme="light"] header img { filter: invert(1); }
`;
