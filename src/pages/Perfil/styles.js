import styled from "styled-components";

export const PageIntro = styled.section`
  margin: 0 0 19px;
  h2 { margin-bottom: 5px; font-size: 17px; letter-spacing: -.2px; }
  p { color: var(--mut); font-size: 12px; line-height: 1.5; }
`;

export const Sections = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 16px;
  @media (max-width: 980px) { grid-template-columns: 1fr; }
`;

export const SectionCard = styled.section`
  min-width: 0;
  padding: 25px;
  border: 1px solid var(--border-subtle);
  border-radius: 22px;
  background: var(--section-gradient);
  box-shadow: 0 12px 34px #0002;
  @media (max-width: 600px) { padding: 20px 16px; border-radius: 18px; }
`;

export const SectionHeading = styled.header`
  display: flex;
  align-items: center;
  gap: 13px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-subtle);
  h2 { margin-bottom: 5px; font-size: 16px; font-weight: 650; }
  p { color: var(--mut); font-size: 11px; line-height: 1.45; }
`;

export const SectionIcon = styled.span`
  width: 42px;
  height: 42px;
  flex: none;
  display: grid;
  place-items: center;
  border: 1px solid ${({ $accent }) => ($accent ? "var(--accent-text)" : "var(--border-subtle)")};
  border-radius: 13px;
  background: ${({ $accent }) => ($accent ? "var(--accent-surface)" : "var(--surface-raised)")};
  color: ${({ $accent }) => ($accent ? "var(--accent-text)" : "var(--text-soft)")};
  svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-top: 22px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  label { color: var(--text-soft); font-size: 11px; font-weight: 550; }
  input {
    width: 100%;
    min-height: 42px;
    padding: 0 12px;
    border: 1px solid var(--input-border);
    border-radius: 10px;
    outline: none;
    background: var(--surface-field);
    color: var(--txt);
    font: inherit;
    font-size: 12px;
    transition: border-color .15s ease, background .15s ease, box-shadow .15s ease;
    &::placeholder { color: var(--input-placeholder); }
    &:hover { border-color: var(--border-strong); }
    &:focus { border-color: var(--accent-text); background: var(--surface-raised); box-shadow: 0 0 0 3px var(--accent-surface); }
  }
`;

export const FormFooter = styled.div`
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 3px;
  @media (max-width: 560px) { align-items: flex-start; flex-direction: column-reverse; }
`;

export const Status = styled.p`
  min-height: 16px;
  color: ${({ $warning }) => ($warning ? "var(--accent-text)" : "var(--success-text)")};
  font-size: 10px;
  line-height: 1.45;
`;

export const PrimaryButton = styled.button`
  min-height: 40px;
  flex: none;
  padding: 0 16px;
  border: 1px solid var(--border-subtle);
  border-radius: 11px;
  background: var(--action-bg);
  color: var(--action-text);
  font-size: 11px;
  font-weight: 650;
  transition: background .15s ease, transform .15s ease;
  &:hover { background: var(--action-bg); transform: translateY(-1px); }
`;
