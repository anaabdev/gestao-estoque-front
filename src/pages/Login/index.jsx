
import { TopHeader, Tela_Login, Footer, GlobalStyles, PaginaLogin } from "./styles";

function Login() {
    return (
        <PaginaLogin>
            
            <GlobalStyles/>
            <TopHeader>

                <h1>Bem-Vindos!</h1>
            </TopHeader>
            <Tela_Login>
                <form>



                    <label htmlFor="email">Login:</label>
                    <input id="Login" type="text" placeholder="Login" />

                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" placeholder="Password" />


                    <button type="submit">Login</button>
                </form>
            </Tela_Login>

            <Footer>
                <p>Direitos Reservados Por Jesus 2026</p>

            </Footer>
            
        </PaginaLogin>
    );
}

export default Login;