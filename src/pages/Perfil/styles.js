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
  border: 1px solid #ffffff0c;
  border-radius: 22px;
  background: linear-gradient(145deg, #0a0a0a, #080808 72%);
  box-shadow: 0 12px 34px #0002;
  @media (max-width: 600px) { padding: 20px 16px; border-radius: 18px; }
`;

export const SectionHeading = styled.header`
  display: flex;
  align-items: center;
  gap: 13px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ffffff0d;
  h2 { margin-bottom: 5px; font-size: 16px; font-weight: 650; }
  p { color: var(--mut); font-size: 11px; line-height: 1.45; }
`;

export const SectionIcon = styled.span`
  width: 42px;
  height: 42px;
  flex: none;
  display: grid;
  place-items: center;
  border: 1px solid ${({ $accent }) => ($accent ? "#793232" : "#ffffff12")};
  border-radius: 13px;
  background: ${({ $accent }) => ($accent ? "#3d1414" : "#191919")};
  color: ${({ $accent }) => ($accent ? "#e6a3a3" : "#dedede")};
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
  label { color: #dedede; font-size: 11px; font-weight: 550; }
  input {
    width: 100%;
    min-height: 42px;
    padding: 0 12px;
    border: 1px solid #3b3b3b;
    border-radius: 10px;
    outline: none;
    background: #141414;
    color: var(--txt);
    font: inherit;
    font-size: 12px;
    transition: border-color .15s ease, background .15s ease, box-shadow .15s ease;
    &::placeholder { color: #707070; }
    &:hover { border-color: #555; }
    &:focus { border-color: #a95555; background: #191515; box-shadow: 0 0 0 3px #a955551c; }
    &[type="date"] { color-scheme: dark; }
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
  color: ${({ $warning }) => ($warning ? "#e1a1a1" : "#a9cdb9")};
  font-size: 10px;
  line-height: 1.45;
`;

export const PrimaryButton = styled.button`
  min-height: 40px;
  flex: none;
  padding: 0 16px;
  border: 1px solid #ffffff1c;
  border-radius: 11px;
  background: #f0f0f0;
  color: #111;
  font-size: 11px;
  font-weight: 650;
  transition: background .15s ease, transform .15s ease;
  &:hover { background: #fff; transform: translateY(-1px); }
`;
