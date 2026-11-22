import styled from "styled-components";

export const Pagina = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 16px;
  background: var(--login-page);
`;

export const Card = styled.form`
  width: min(400px, 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 44px 40px 40px;
  border-radius: 44px;
  background: var(--login-card);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
`;

export const Logo = styled.img`
  width: 42px;
  height: 44px;
  object-fit: contain;
`;

export const Titulo = styled.h1`
  margin: 24px 0 36px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;

export const Erro = styled.p`
  width: 100%;
  margin: -16px 0 16px;
  font-size: 13px;
  text-align: center;
  color: var(--accent-text);
`;

export const Campo = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;

  &:last-of-type { margin-bottom: 0; }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  color: var(--mut);
  font-size: 12px;
  font-weight: 550;
`;

export const RequiredMark = styled.span`
  margin-left: 3px;
  color: var(--accent-text);
  font-weight: 700;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  padding-right: ${({ $comOlho }) => ($comOlho ? "48px" : "12px")};
  border: 0;
  border-radius: 10px;
  background: #d9d9d9;
  color: #111;
  font: inherit;
  font-size: 16px;

  &::placeholder { color: #8f8f8f; }
  &:focus-visible { outline: 2px solid var(--accent-text); outline-offset: 2px; }
`;

export const Olho = styled.button`
  position: absolute;
  top: 20px;
  right: 4px;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  color: #555;

  &:hover { color: #111; }
`;

export const Esqueci = styled.a`
  align-self: flex-end;
  margin: 8px 0 28px;
  font-size: 12px;
  font-weight: 600;

  &:hover { text-decoration: underline; }
`;

export const Botao = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 16px;
  border-radius: 10px;
  background: var(--vinho);
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
  transition: background 0.15s;

  &:hover { background: var(--login-button-hover); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

export const Criar = styled.a`
  margin-top: 18px;
  font-size: 12px;
  font-weight: 600;

  &:hover { text-decoration: underline; }
`;

export const Loading = styled.div`
  display: grid;
  place-items: center;
  min-height: 200px;
  color: var(--mut);
  font-size: 14px;
`;
