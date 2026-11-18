import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as S from "./styles";
import { useAppSettings } from "../../context/useAppSettings.js";
import { api } from "../../services/api.js";
import Logo from "../../assets/Logo_Site.svg";

function Login() {
  const { t } = useAppSettings();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    api.me()
      .then(() => navigate("/home"))
      .catch(() => {})
      .finally(() => setCheckingAuth(false));
  }, [navigate]);

  async function entrar(event) {
    event.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      await api.login(email, senha);
      navigate("/home");
    } catch (requestError) {
      setErro(requestError.message || "Não foi possível entrar.");
    } finally {
      setCarregando(false);
    }
  }

  if (checkingAuth) {
    return <S.Pagina><S.Loading>Carregando...</S.Loading></S.Pagina>;
  }

  return (
    <S.Pagina>
      <S.Card onSubmit={entrar}>
        <S.Logo src={Logo} alt={t("brand.logo")} />
        <S.Titulo>{t("login.title")}</S.Titulo>

        {erro && <S.Erro role="alert">{erro}</S.Erro>}

        <S.Campo>
          <S.Label htmlFor="email">{t("login.email")}</S.Label>
          <S.Input
            id="email"
            name="email"
            type="email"
            placeholder={t("login.email").toLowerCase()}
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </S.Campo>

        <S.Campo>
          <S.Label htmlFor="senha">{t("login.password")}</S.Label>
          <S.Input
            id="senha"
            name="senha"
            type={mostrarSenha ? "text" : "password"}
            placeholder={t("login.password").toLowerCase()}
            autoComplete="current-password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
            $comOlho
          />
          <S.Olho type="button" onClick={() => setMostrarSenha((show) => !show)} aria-label={t("login.showPassword")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </S.Olho>
        </S.Campo>

        <S.Botao type="submit" disabled={carregando}>
          {carregando ? "…" : t("login.getStarted")}
        </S.Botao>
      </S.Card>

      <S.Footer>
        <p>{t("login.footer")}</p>
      </S.Footer>
    </S.Pagina>
  );
}

export default Login;
