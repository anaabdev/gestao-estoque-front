import * as S from "./styles";

function Login() {
  return (
    <S.Pagina>
      {/* JS: trocar o onSubmit pela função de login (api.login) */}
      <S.Card onSubmit={(e) => e.preventDefault()}>
        <S.Logo>F</S.Logo> {/* troque pelo SVG do logo quando tiver */}
        <S.Titulo>Sign in with email</S.Titulo>

        {/* JS: mostrar a mensagem de erro que vier da API (tirar o hidden) */}
        <S.Erro role="alert" hidden>Mensagem de erro</S.Erro>

        {/* JS: guardar o que for digitado em estados (email e senha) */}
        <S.Campo>
          <S.Label htmlFor="email">Email</S.Label>
          <S.Input id="email" name="email" type="email" placeholder="email" autoComplete="email" required />
        </S.Campo>

        <S.Campo>
          <S.Label htmlFor="senha">Password</S.Label>
          <S.Input id="senha" name="senha" type="password" placeholder="password" autoComplete="current-password" required $comOlho />

          {/* JS: alternar o type do input entre "password" e "text" */}
          <S.Olho type="button" aria-label="Mostrar senha">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </S.Olho>
        </S.Campo>

        {/* trocar por <Link to="..."> quando as páginas existirem */}
        <S.Esqueci href="#">Forgot password?</S.Esqueci>

        {/* JS: desabilitar (disabled) enquanto a requisição estiver em andamento */}
        <S.Botao type="submit">Get Started</S.Botao>

        <S.Criar href="#">Create an account</S.Criar>
      </S.Card>

      <S.Footer>
        <p>Direitos Reservados Por Jesus 2026</p>
      </S.Footer>
    </S.Pagina>
  );
}

export default Login;