import styled, { css } from "styled-components";
import { NavLink, Link } from "react-router-dom";

export const Shell = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  min-height: 100vh;
  min-height: 100dvh;

  @media (max-width: 700px) {
    flex-direction: column-reverse;
    gap: 8px;
    padding: 8px;
  }
`;

export const Side = styled.aside`
  width: 96px;
  flex: none;
  align-self: flex-start;
  position: sticky;
  top: 16px;
  height: calc(100vh - 32px);
  height: calc(100dvh - 32px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 0;
  border-radius: 32px;
  background: var(--painel);

  @media (max-width: 700px) {
    position: sticky;
    top: auto;
    bottom: 8px;
    z-index: 5;
    width: 100%;
    height: auto;
    align-self: auto;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 20px;
    border-radius: 24px;
  }
`;

export const Logo = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  @media (max-width: 700px) { display: none; }
`;

export const Nav = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  @media (max-width: 700px) {
    flex-direction: row;
    justify-content: space-around;
    gap: 0;
  }
`;

const sideButton = css`
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  &:hover { background: var(--cinza); }
`;

export const Item = styled(NavLink)`
  ${sideButton}
  &.active { background: var(--cinza); }
`;

export const Sair = styled.button`
  ${sideButton}
`;

export const Icone = styled.img`
  width: 28px;
  height: 28px;
`;

export const Painel = styled.main`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 28px;
  border-radius: 32px;
  background: linear-gradient(155deg, #431616 0%, #211010 25%, var(--painel) 48%);
  @media (max-width: 700px) {
    padding: 18px 14px;
    border-radius: 24px;
  }
`;

export const Topo = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  h1 { font-size: clamp(26px, 3vw, 34px); letter-spacing: -1.1px; }
  @media (max-width: 520px) { align-items: flex-start; }
`;

export const Eyebrow = styled.p`
  margin-bottom: 5px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: var(--mut);
`;

export const TopActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Perfil = styled(Link)`
  width: 44px;
  height: 44px;
  flex: none;
  display: grid;
  place-items: center;
  border: 1px solid #ffffff12;
  border-radius: 14px;
  background: #090909;
  img { width: 20px; height: 20px; }
  &:hover { background: var(--cinza); }
`;

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 44px;
  padding: 0 17px;
  border: 1px solid #ffffff1c;
  border-radius: 13px;
  background: #f2f2f2;
  color: #121212;
  font-size: 13px;
  font-weight: 650;
  transition: transform .16s ease, background .16s ease;
  span { font-size: 20px; line-height: 0; font-weight: 400; }
  &:hover { transform: translateY(-1px); background: #fff; }
  @media (max-width: 520px) { padding: 0 12px; font-size: 12px; }
`;

export const Destaques = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(130px, .75fr) minmax(130px, .75fr);
  gap: 14px;
  margin-bottom: 20px;
  @media (max-width: 980px) { grid-template-columns: 1fr 1fr; }
  @media (max-width: 600px) { grid-template-columns: 1fr 1fr; gap: 9px; }
`;

export const Welcome = styled.article`
  position: relative;
  overflow: hidden;
  min-height: 125px;
  display: flex;
  align-items: center;
  padding: 22px 24px;
  border: 1px solid #ffffff0b;
  border-radius: 20px;
  background:
    radial-gradient(ellipse at 92% 105%, #551d1d80 0%, transparent 44%),
    linear-gradient(120deg, #090909, #151515);
  grid-column: span 1;
  @media (max-width: 980px) { grid-column: 1 / -1; }
  @media (max-width: 600px) { min-height: 110px; padding: 18px; }
`;

export const WelcomeCopy = styled.div`
  position: relative;
  z-index: 1;
  max-width: calc(100% - 128px);
  @media (max-width: 600px) { max-width: 64%; }
`;

export const Ola = styled.p`
  margin-bottom: 7px;
  font-size: 17px;
  font-weight: 650;
  letter-spacing: -.2px;
`;

export const Mut = styled.p`
  color: var(--mut);
  font-size: 12px;
  line-height: 1.5;
`;

export const Mascote = styled.img`
  position: absolute;
  right: 22px;
  bottom: -5px;
  width: auto;
  height: 112px;
  object-fit: contain;
  object-position: bottom;
  filter: drop-shadow(0 7px 12px #0008);
  @media (max-width: 600px) {
    right: 12px;
    height: 88px;
  }
`;

export const Stat = styled.article`
  position: relative;
  min-height: 125px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 6px;
  padding: 18px 20px;
  border: 1px solid #ffffff0b;
  border-radius: 20px;
  background: #090909;
  strong { font-size: 30px; line-height: 1; }
  .stat-label { color: var(--mut); font-size: 11px; }
  .stat-note { color: ${({ $alert }) => ($alert ? "#f1a2a2" : "var(--mut)")}; font-size: 10px; }
  @media (max-width: 600px) { min-height: 100px; padding: 14px; strong { font-size: 26px; } }
`;

export const Box = styled.section`
  flex: 1;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  padding: 20px 0 8px;
  border: 1px solid #ffffff0c;
  border-radius: 22px;
  background: #080808;
  overflow: hidden;
`;

export const TableHeader = styled.div`
  min-height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 22px 16px;
  h2 { margin-bottom: 4px; font-size: 16px; }
  p { color: var(--mut); font-size: 11px; }
  @media (max-width: 600px) { padding: 0 14px 14px; }
`;

export const BulkActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--mut);
  font-size: 11px;
`;

export const DeleteButton = styled.button`
  padding: 8px 11px;
  border: 1px solid #b94444;
  border-radius: 9px;
  color: #f0b7b7;
  font-size: 11px;
  &:hover { background: #4a1717; }
`;

export const Abas = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 16px 13px;
  border-bottom: 1px solid #ffffff0c;
`;

export const Aba = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 34px;
  padding: 0 13px;
  border-radius: 9px;
  color: ${({ $ativa }) => ($ativa ? "var(--txt)" : "var(--mut)")};
  background: ${({ $ativa }) => ($ativa ? "#242424" : "transparent")};
  font-size: 11px;
  span { color: ${({ $ativa }) => ($ativa ? "#fff" : "var(--mut)")}; font-size: 10px; }
  &:hover { background: #202020; }
`;

export const Rolagem = styled.div`
  overflow-x: auto;
  table { width: 100%; min-width: 610px; border-collapse: collapse; }
  th, td { padding: 14px 18px; text-align: center; }
  th { border-bottom: 1px solid #ffffff10; color: var(--mut); font-size: 10px; font-weight: 500; }
  td { color: #dedede; font-size: 12px; }
  th:first-child, td:first-child { width: 48px; padding-right: 0; }
  th:nth-child(2), td:nth-child(2) { text-align: left; }
  th:last-child, td:last-child { width: 54px; padding-left: 0; }
  @media (max-width: 600px) { th, td { padding: 12px; } }
`;

export const Linha = styled.tr`
  border-bottom: 1px solid #ffffff0c;
  background: ${({ $marcada }) => ($marcada ? "#271313" : "transparent")};
  &:hover { background: ${({ $marcada }) => ($marcada ? "#301717" : "#111")}; }
`;

export const Produto = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  color: #f3f3f3;
  font-weight: 550;
`;

export const Mini = styled.span`
  width: 34px;
  height: 34px;
  flex: none;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: #252525;
  color: #d9d9d9;
  font-size: 12px;
  font-weight: 650;
`;

export const StockValue = styled.span`
  display: inline-flex;
  min-width: 30px;
  justify-content: center;
  color: ${({ $low }) => ($low ? "#f0a2a2" : "#dedede")};
  ${({ $low }) => $low && css`font-weight: 650;`}
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  border: 1px solid #555;
  border-radius: 5px;
  background: #171717 center / 11px no-repeat;
  cursor: pointer;
  &:checked {
    border-color: #bb5555;
    background-color: #8f3232;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E");
  }
`;

export const RowDelete = styled.button`
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  color: #a5a5a5;
  svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
  &:hover { background: #411919; color: #f1aaaa; }
`;

export const Vazio = styled.div`
  flex: 1;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 30px;
  text-align: center;
  > span { color: #888; font-size: 28px; }
  strong { font-size: 14px; }
  p { color: var(--mut); font-size: 11px; }
  button { margin-top: 8px; }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;
  display: grid;
  place-items: center;
  padding: 20px;
  background: #000b;
  backdrop-filter: blur(8px);
`;

export const Dialog = styled.section`
  width: min(680px, 100%);
  padding: 32px 36px 36px;
  border: 1px solid #ffffff0d;
  border-radius: 38px;
  background: #030303;
  box-shadow: 0 24px 100px #000b;
  @media (max-width: 620px) { padding: 25px 20px 22px; border-radius: 28px; }
`;

export const ModalTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  h2 { font-size: 25px; letter-spacing: -.6px; }
  @media (max-width: 620px) { margin-bottom: 18px; h2 { font-size: 21px; } }
`;

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  flex: none;
  display: grid;
  place-items: center;
  border-radius: 9px;
  color: #eee;
  font-size: 26px;
  line-height: 1;
  &:hover { background: #222; }
`;

export const ProductForm = styled.form`
  display: grid;
  grid-template-columns: 186px minmax(0, 1fr);
  gap: 25px;
  @media (max-width: 620px) { grid-template-columns: 1fr; gap: 18px; }
`;

export const ProductPreview = styled.div`
  min-height: 186px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: #292929;
  @media (max-width: 620px) { min-height: 94px; }
`;

export const BoxIcon = styled.div`
  position: relative;
  width: 120px;
  height: 61px;
  margin-top: 20px;
  background: #d6d6d6;
  &::before {
    content: "";
    position: absolute;
    top: -13px;
    right: 9px;
    width: 28px;
    height: 13px;
    background: #d6d6d6;
  }
  span {
    position: absolute;
    top: -1px;
    left: 50%;
    width: 1px;
    height: 100%;
    background: #c3c3c3;
  }
  @media (max-width: 620px) { transform: scale(.75); margin: 0; }
`;

export const FormFields = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 1px;
`;

export const Field = styled.div`
  display: grid;
  grid-template-columns: 75px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  label { color: #e6e6e6; font-size: 12px; }
  input {
    width: 100%;
    min-width: 0;
    height: 34px;
    padding: 0 11px;
    border: 1px solid #414141;
    border-radius: 7px;
    outline: none;
    background: #1b1b1b;
    color: #f5f5f5;
    font: inherit;
    font-size: 12px;
    transition: border-color .15s ease, background .15s ease;
    &:focus { border-color: #aaa; background: #222; }
    &::placeholder { color: #737373; }
    &[type="number"] { max-width: 92px; justify-self: end; }
  }
`;

export const FormError = styled.p`
  margin: -3px 0 0 87px;
  color: #f0a2a2;
  font-size: 11px;
  line-height: 1.4;
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 9px;
  margin-top: 8px;
`;

export const CancelButton = styled.button`
  min-height: 38px;
  padding: 0 15px;
  border: 1px solid #363636;
  border-radius: 10px;
  color: #c8c8c8;
  font-size: 12px;
  &:hover { background: #1a1a1a; }
`;

export const SaveButton = styled.button`
  min-height: 38px;
  padding: 0 18px;
  border-radius: 10px;
  background: #ededed;
  color: #111;
  font-size: 12px;
  font-weight: 650;
  &:hover { background: #fff; }
`;

export const srOnly = "";
