import styled from "styled-components";

export const Pagina = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 16px 16px 60px;
  background: radial-gradient(ellipse at center, #1b1b1b 0%, #0a0a0a 45%, #000 75%);
`;

export const Card = styled.form`
  width: min(400px, 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 44px 40px 40px;
  border-radius: 44px;
  background:
    radial-gradient(circle at 25% 12%, #3d1010 0, transparent 55%),
    radial-gradient(circle at 80% 92%, #3d1010 0, transparent 50%),
    #0b0b0b;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
`;

export const Logo = styled.span`
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
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
  color: #ff6b6b;
`;

export const Campo = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;

  &:last-of-type { margin-bottom: 0; }
`;

/* Escondido da tela, mas lido por leitores de tela (o design usa só placeholder) */
export const Label = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
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
  &:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
`;

export const Olho = styled.button`
  position: absolute;
  top: 0;
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
  border-radius: 10px;
  background: #3d1010;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
  transition: background 0.15s;

  &:hover { background: #4f1414; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

export const Criar = styled.a`
  margin-top: 18px;
  font-size: 12px;
  font-weight: 600;

  &:hover { text-decoration: underline; }
`;

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(6px);

  p { font-size: 13px; color: rgba(240, 240, 240, 0.6); }
`;