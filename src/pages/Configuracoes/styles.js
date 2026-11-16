import styled from "styled-components";

export const Intro = styled.section`
  margin: 0 0 20px;
  h2 { margin-bottom: 5px; font-size: 17px; letter-spacing: -.2px; }
  p { color: var(--mut); font-size: 12px; line-height: 1.5; }
`;

export const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-content: start;
  gap: 16px;
  @media (max-width: 920px) { grid-template-columns: 1fr; }
`;

export const SettingsCard = styled.section`
  min-width: 0;
  padding: 24px;
  border: 1px solid var(--border-subtle);
  border-radius: 22px;
  background: var(--surface-card);
  box-shadow: 0 12px 34px #0002;
  @media (max-width: 600px) { padding: 19px 16px; border-radius: 18px; }
`;

export const CardHeading = styled.header`
  display: flex;
  align-items: center;
  gap: 13px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-subtle);
  h2 { margin-bottom: 5px; font-size: 16px; font-weight: 650; }
  p { color: var(--mut); font-size: 11px; line-height: 1.45; }
`;

export const CardIcon = styled.span`
  width: 42px;
  height: 42px;
  flex: none;
  display: grid;
  place-items: center;
  border: 1px solid ${({ $language }) => ($language ? "#793232" : "var(--border-subtle)")};
  border-radius: 13px;
  background: ${({ $language }) => ($language ? "var(--accent-surface)" : "var(--surface-raised)")};
  color: ${({ $language }) => ($language ? "var(--accent-text)" : "var(--txt)")};
  svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
`;

export const ThemeChoices = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  padding-top: 20px;
  @media (max-width: 520px) { gap: 8px; }
`;

export const ThemeOption = styled.button`
  min-width: 0;
  padding: 8px;
  border: 1px solid ${({ $active }) => ($active ? "var(--theme-choice-accent)" : "var(--border-subtle)")};
  border-radius: 14px;
  background: ${({ $active }) => ($active ? "var(--theme-choice-surface)" : "var(--surface-raised)")};
  text-align: left;
  transition: border-color .15s ease, transform .15s ease, background .15s ease;
  &:hover { border-color: var(--theme-choice-accent); transform: translateY(-1px); }
`;

export const ThemePreview = styled.div`
  height: 88px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 11px;
  margin-bottom: 10px;
  border: 1px solid ${({ $theme }) => ($theme === "dark" ? "#ffffff1c" : "#0000001c")};
  border-radius: 9px;
  background: ${({ $theme }) => ($theme === "dark" ? "#171717" : "#f6f6f7")};
  span { height: 8px; border-radius: 4px; background: ${({ $theme }) => ($theme === "dark" ? "#303030" : "#dedfe3")}; }
  span:first-child { width: 48%; height: 17px; background: ${({ $theme }) => ($theme === "dark" ? "#552020" : "#a8d8b6")}; }
  span:nth-child(2) { width: 85%; }
  span:nth-child(3) { width: 65%; }
`;

export const OptionTitle = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 0 4px;
  font-size: 12px;
  font-weight: 650;
`;

export const OptionDescription = styled.span`
  display: block;
  min-height: 28px;
  padding: 4px 4px 0;
  color: var(--mut);
  font-size: 9px;
  line-height: 1.45;
`;

export const LanguageChoices = styled.div`
  display: grid;
  gap: 10px;
  padding-top: 20px;
`;

export const LanguageOption = styled.button`
  min-height: 54px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 13px;
  border: 1px solid ${({ $active }) => ($active ? "var(--accent-text)" : "var(--border-subtle)")};
  border-radius: 12px;
  background: ${({ $active }) => ($active ? "var(--accent-surface)" : "var(--surface-raised)")};
  color: var(--txt);
  text-align: left;
  font-size: 12px;
  font-weight: 550;
  transition: border-color .15s ease, background .15s ease;
  &:hover { border-color: var(--accent-text); }
  > span:nth-child(2) { flex: 1; }
`;

export const Flag = styled.span`
  width: 30px;
  height: 22px;
  display: grid;
  place-items: center;
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  background: ${({ $english }) => ($english ? "#1d3565" : "#1a6945")};
  color: #fff;
  font-size: 8px;
  font-weight: 750;
  letter-spacing: .4px;
`;

export const SelectedMark = styled.span`
  width: 19px;
  height: 19px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: ${({ $theme }) => ($theme ? "var(--theme-choice-check)" : "var(--accent-text)")};
  color: #fff;
  font-size: 11px;
  font-weight: 700;
`;

export const SettingsFooter = styled.footer`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 15px 4px 0;
  p { color: var(--mut); font-size: 11px; }
  small { display: block; min-height: 15px; margin-top: 5px; color: var(--accent-text); font-size: 10px; }
  @media (max-width: 600px) { align-items: flex-start; flex-direction: column; }
`;

export const ResetButton = styled.button`
  min-height: 38px;
  flex: none;
  padding: 0 13px;
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  color: var(--mut);
  font-size: 10px;
  &:hover { border-color: var(--accent-text); color: var(--txt); }
`;
