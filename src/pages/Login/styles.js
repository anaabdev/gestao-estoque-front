import styled from "styled-components"
import { createGlobalStyle } from "styled-components"

export const PaginaLogin = styled.div`
min-height: 100vh;
    display: flex;
    flex-direction: column;


`


export const TopHeader = styled.div`
    background: #1ed760;
    height: 56px;
    width: 100vw;
    justify-content: center;

    display: flex;
  
`

export const Tela_Login = styled.div`

  display: flex;
    flex-direction: column;
    gap: 12px;

    width: 320px;
    padding: 32px;
    border-radius: 20px;
    background: #141414;
    border: 1px solid rgba(30, 215, 96, 0.3);
    color: #fff;

    margin: auto;


`

export const Footer = styled.form`
margin-top: auto;
align-itens: center;
background: #1ed760;
    height: 50px;
    width: 100%;
    justify-content: center;

    display: flex;  

`
export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
background: #000;
color: #fff;

}
`
