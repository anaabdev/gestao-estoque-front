import * as S from "./styles";
import { useAppSettings } from "../../context/useAppSettings.js";

function Login() {
  const { t } = useAppSettings();
  return (
    <S.Pagina>
      {/* JS: trocar o onSubmit pela função de login (api.login) */}
      <S.Card onSubmit={(e) => e.preventDefault()}>
        <S.Logo>F</S.Logo> {/* troque pelo SVG do logo quando tiver */}
        <S.Titulo>{t("login.title")}</S.Titulo>

        {/* JS: mostrar a mensagem de erro que vier da API (tirar o hidden) */}
        <S.Erro role="alert" hidden>Mensagem de erro</S.Erro>

        {/* JS: guardar o que for digitado em estados (email e senha) */}
        <S.Campo>
          <S.Label htmlFor="email">{t("login.email")}</S.Label>
          <S.Input id="email" name="email" type="email" placeholder={t("login.email").toLowerCase()} autoComplete="email" required />
        </S.Campo>

        <S.Campo>
          <S.Label htmlFor="senha">{t("login.password")}</S.Label>
          <S.Input id="senha" name="senha" type="password" placeholder={t("login.password").toLowerCase()} autoComplete="current-password" required $comOlho />

          {/* JS: alternar o type do input entre "password" e "text" */}
          <S.Olho type="button" aria-label={t("login.showPassword")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </S.Olho>
        </S.Campo>

        {/* trocar por <Link to="..."> quando as páginas existirem */}
        <S.Esqueci href="#">{t("login.forgot")}</S.Esqueci>

        {/* JS: desabilitar (disabled) enquanto a requisição estiver em andamento */}
        <S.Botao type="submit">{t("login.getStarted")}</S.Botao>

        <S.Criar href="#">{t("login.createAccount")}</S.Criar>
      </S.Card>

      <S.Footer>
        <p>{t("login.footer")}</p>
      </S.Footer>
    </S.Pagina>
  );
}

export default Login;
