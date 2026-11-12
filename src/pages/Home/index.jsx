import casinha from "../../assets/casinha_Home.svg";
import perfilSide from "../../assets/PerfilSideBar_Home.svg";
import settings from "../../assets/Settings_Home.svg";
import saida from "../../assets/Saida_Home.svg";
import perfilTop from "../../assets/PerfilTop_Home.svg";
import mascote from "../../assets/Mascote_Home.svg";
// import fundoPerfil from "../../assets/FundoPerfil_Home.svg"; // ainda sem lugar definido no design

import * as S from "./styles";

function Home() {
  return (
    <S.Shell>
      {/* BARRA LATERAL (depois vira components/Sidebar dentro de um Layout com <Outlet />) */}
      <S.Side>
        <S.Logo>F</S.Logo>

        <S.Nav>
          <S.Item to="/" end aria-label="Início"><S.Icone src={casinha} alt="" /></S.Item>
          <S.Item to="/Perfil" aria-label="Perfil"><S.Icone src={perfilSide} alt="" /></S.Item>
          <S.Item to="/Configuracoes" aria-label="Configurações"><S.Icone src={settings} alt="" /></S.Item>
        </S.Nav>

        {/* JS: limpar o usuário salvo e navegar para /login */}
        <S.Sair aria-label="Sair"><S.Icone src={saida} alt="" /></S.Sair>
      </S.Side>

      {/* ÁREA PRINCIPAL */}
      <S.Painel>
        <S.Topo>
          <h1>Inventory:</h1>
          <S.Perfil to="/perfil" aria-label="Perfil"><img src={perfilTop} alt="" /></S.Perfil>
        </S.Topo>

        {/* CARDS
            JS: estado de "cards fechados"; × esconde o card (renderização condicional) */}
        <S.Destaques>
          <S.BoasVindas>
            <S.Fechar aria-label="Fechar boas-vindas">×</S.Fechar>
            <S.Texto>
              <S.Ola>Olá, Henrique França!</S.Ola> {/* JS: nome do usuário logado */}
              <S.Mut>Veja como está o seu estoque hoje.</S.Mut>
            </S.Texto>
            <S.Avatar aria-hidden="true">F</S.Avatar> {/* JS: inicial do nome */}
            <S.Mascote src={mascote} alt="" />
          </S.BoasVindas>

          <S.Coluna>
            <S.Stat>
              <S.Fechar aria-label="Fechar card">×</S.Fechar>
              <strong>3</strong><span>produtos cadastrados</span> {/* JS: produtos.length */}
            </S.Stat>
            <S.Stat>
              <S.Fechar aria-label="Fechar card">×</S.Fechar>
              <strong>2</strong><span>com estoque baixo</span> {/* JS: filtrar disponível < 20 */}
            </S.Stat>
          </S.Coluna>
        </S.Destaques>

        {/* JS: mostrar só quando algum card estiver fechado (tirar o hidden) */}
        <S.Restaurar hidden>Restaurar cards</S.Restaurar>

        {/* TABELA */}
        <S.Box>
          {/* JS: categorias em um array; a aba clicada vira a ativa e filtra a tabela */}
          <S.Abas>
            <S.Aba $ativa>
              All
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </S.Aba>
            <S.Aba>Low Stock</S.Aba>
            <S.Aba>Apparel</S.Aba>
            <S.Aba>Accessories</S.Aba>
            <S.Aba aria-label="Adicionar categoria">+</S.Aba>
          </S.Abas>

          {/* JS: aparece quando houver linhas marcadas (tirar o hidden) */}
          <S.Selecao hidden>
            <span>0 selecionado(s)</span>
            <button>Limpar seleção</button>
          </S.Selecao>

          <S.Rolagem>
            <table>
              <thead>
                <tr>
                  <th><S.Checkbox aria-label="Selecionar todos" /></th>
                  <th>Product</th>
                  <th>Unavailable</th>
                  <th>Available</th>
                  <th>On hand</th>
                </tr>
              </thead>

              {/* JS: estas linhas viram produtos.map((p) => <S.Linha key={p.id} $marcada={...}>...) */}
              <tbody>
                <S.Linha>
                  <td><S.Checkbox aria-label="Selecionar Sneaker" /></td>
                  <td><S.Produto><S.Mini>S</S.Mini>Sneaker</S.Produto></td>
                  <td>30</td><td>73</td><td>121</td>
                </S.Linha>
                <S.Linha>
                  <td><S.Checkbox aria-label="Selecionar Camiseta básica" /></td>
                  <td><S.Produto><S.Mini>C</S.Mini>Camiseta básica</S.Produto></td>
                  <td>5</td><td>12</td><td>40</td>
                </S.Linha>
                <S.Linha>
                  <td><S.Checkbox aria-label="Selecionar Boné" /></td>
                  <td><S.Produto><S.Mini>B</S.Mini>Boné</S.Produto></td>
                  <td>2</td><td>8</td><td>15</td>
                </S.Linha>
              </tbody>
            </table>
          </S.Rolagem>

          {/* JS: mostrar quando o filtro não retornar nada (tirar o hidden) */}
          <S.Vazio hidden>Nenhum produto nesta categoria.</S.Vazio>
        </S.Box>
      </S.Painel>
    </S.Shell>
  );
}

export default Home;