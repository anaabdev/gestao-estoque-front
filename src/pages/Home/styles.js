import styled, { css } from "styled-components";
import { NavLink, Link } from "react-router-dom";

/* ===== Estrutura ===== */
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

/* ===== Barra lateral ===== */
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

const botaoLateral = css`
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 14px;

  &:hover { background: var(--cinza); }
`;

export const Item = styled(NavLink)`
  ${botaoLateral}
  &.active { background: var(--cinza); }
`;

export const Sair = styled.button`
  ${botaoLateral}
`;

export const Icone = styled.img`
  width: 28px;
  height: 28px;
`;

/* ===== Área principal ===== */
export const Painel = styled.main`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 32px;
  background: linear-gradient(var(--vinho), var(--painel) 55%);

  @media (max-width: 700px) {
    padding: 16px;
    border-radius: 24px;
  }
`;

export const Topo = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 { font-size: 32px; }
  @media (max-width: 700px) { h1 { font-size: 26px; } }
`;

export const Perfil = styled(Link)`
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: #000;

  img { width: 20px; height: 20px; }
`;

/* ===== Cards ===== */
export const Destaques = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 820px) { grid-template-columns: 1fr; }
`;

export const Coluna = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Card = styled.article`
  position: relative;
  border-radius: 20px;
  background: #000;
  padding: 18px 24px;
`;

export const BoasVindas = styled(Card)`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 150px;
  padding: 0 0 0 28px;
  overflow: hidden;
`;

export const Texto = styled.div`
  flex: 1;
  padding: 18px 0;
`;

export const Ola = styled.p`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const Mut = styled.p`
  font-size: 14px;
  color: var(--mut);
`;

export const Avatar = styled.div`
  align-self: flex-start;
  margin-top: 28px;
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #1aa6a6;
  font-weight: 600;
  font-size: 14px;
`;

export const Mascote = styled.img`
  align-self: flex-end;
  height: 140px;
  margin-right: 24px;

  @media (max-width: 700px) { height: 110px; margin-right: 8px; }
`;

export const Stat = styled(Card)`
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 66px;

  strong { font-size: 30px; }
  span { font-size: 18px; }
`;

export const Fechar = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  font-size: 20px;
  line-height: 1;
  color: var(--mut);

  &:hover { background: var(--cinza); color: var(--txt); }
`;

export const Restaurar = styled.button`
  align-self: flex-start;
  margin-bottom: 16px;
  padding: 8px 14px;
  border: 1px solid var(--cinza);
  border-radius: 10px;
  font-size: 13px;
  color: var(--mut);
`;

/* ===== Tabela ===== */
export const Box = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border-radius: 22px;
  background: #000;
  overflow: hidden;
`;

export const Abas = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding: 0 14px 10px;
`;

/* $ativa: no React, a classe "on" vira uma propriedade */
export const Aba = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  min-height: 36px;
  padding: 0 14px;
  border-radius: 8px;
  font-size: 14px;
  background: ${({ $ativa }) => ($ativa ? "var(--cinza)" : "transparent")};
  color: ${({ $ativa }) => ($ativa ? "var(--txt)" : "var(--mut)")};

  &:hover { background: ${({ $ativa }) => ($ativa ? "var(--cinza)" : "var(--dest)")}; }
`;

export const Selecao = styled.p`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px 10px;
  font-size: 13px;
  color: var(--mut);

  button { text-decoration: underline; color: var(--txt); }
`;

export const Rolagem = styled.div`
  overflow-x: auto;

  table { width: 100%; min-width: 520px; border-collapse: collapse; }
  th, td { padding: 12px 20px; text-align: center; }
  th { font-weight: 400; background: var(--vinho); color: var(--mut); }
  th:first-child, td:first-child { width: 56px; padding-right: 0; }
  th:nth-child(2), td:nth-child(2) { text-align: left; }
`;

/* $marcada: linha selecionada */
export const Linha = styled.tr`
  border-bottom: 2px solid var(--cinza);
  background: ${({ $marcada }) => ($marcada ? "var(--dest)" : "transparent")};
`;

export const Produto = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Mini = styled.span`
  width: 40px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  background: var(--cinza);
  font-size: 13px;
  font-weight: 600;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background: var(--txt) center / 14px no-repeat;
  cursor: pointer;

  &:checked {
    background-color: #ff1313;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E");
  }

  &:indeterminate {
    background-color: #ff1313;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke='white' stroke-width='4' stroke-linecap='round'%3E%3Cline x1='5' y1='12' x2='19' y2='12'/%3E%3C/svg%3E");
  }
`;

export const Vazio = styled.p`
  padding: 32px;
  text-align: center;
  font-size: 14px;
  color: var(--mut);
`;