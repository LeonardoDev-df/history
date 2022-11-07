import styled, { css, createGlobalStyle } from 'styled-components'
import { rgba, darken, shade } from 'polished'
import { Form } from '@unform/web'
import Laptops from '../../../assets/laptops.png'


import { Button } from '../../../components/Button'
import EmblemOuro from '../../../assets/illustrations/ouro.svg';
import EmblemPrata from '../../../assets/illustrations/silver.svg';
import EmblemBronze from '../../../assets/illustrations/bronze.svg';
import {
    Email,
    User,
    UserAlt,
    Eye,
    PlusSquare,
    Trash,
    Edit,
    SearchSquare,
    Download,
    Share,
    Close,
    Lock,
    LockAlt
} from '../../Icons'

const actButtonVariation = {
    blue: css`
        background: ${props => props.theme.colors.blue};

        :hover {
            background: ${props => shade(0.15, props.theme.colors.blue)};
        }
    `,
    red: css`
        background: ${props => props.theme.colors.red};
        :hover {
            background: ${props => shade(0.15, props.theme.colors.red)};
        }
    `
}

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
  }

  backgroundImage: url("../../../assets/laptops.png");



  h1 {
    font-family: Fascinate Inline;
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    font-weight: 400;
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 70px;
    text-align: center;
    margin: 20px;
  }

  #category{
    width: 400px;
    margin-left: 130px;
  }

  #apelido{
    width: 400px;
    margin-left: 260px;
  }

  body {
    background-image: url("../../../assets/quiz.jpg");
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }

  * {
    font-family: 'Catamaran', sans-serif;
    box-sizing: border-box;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;



  > p {
    color: black;
  }

  .score {
    color: black;
    font-size: 2rem;
    margin: 0;
    padding-bottom: 10px;
  }


  .welcome {
    color: black;
    font-size: 2rem;
    margin: 0;
    padding-left: 72%;
    padding-bottom: 10px;
    padding-top: 10px;
  }

  h1 {
    font-family: Fascinate Inline;
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    font-weight: 400;
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 70px;
    text-align: center;
    margin: 20px;
  }

  .start, .next {
    cursor: pointer;
    background: linear-gradient(180deg, #ffffff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }

  .start {
    max-width: 200px;
  }
`;


export const Quiz = createGlobalStyle`
  html {
    height: 100%;
  }

  h1 {
    font-family: Fascinate Inline;
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    font-weight: 400;
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 70px;
    text-align: center;
    margin: 20px;
  }

  #category{
    width: 400px;
    margin-left: 130px;
  }

  #apelido{
    width: 400px;
    margin-left: 260px;
  }

  body {
    background-image: url("../../../assets/quiz.jpg");
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }

  * {
    font-family: 'Catamaran', sans-serif;
    box-sizing: border-box;
  }
`;

export const EmblemGold = styled(Object(EmblemOuro))`
    width: 20%;
    height: auto;

    h3{
        margin-top: 0%;
    }

    @media screen and (max-width: 540px) {
        display: none;
    }
`;

export const EmblemSilver = styled(Object(EmblemPrata))`
    width: 20%;
    height: auto;

    @media screen and (max-width: 540px) {
        display: none;
    }
`;

export const EmblemBronzi = styled(Object(EmblemBronze))`
    width: 20%;
    height: auto;

    @media screen and (max-width: 540px) {
        display: none;
    }
`;


export const Container = styled.div`
    height: 100%;
    display: block;
    overflow: auto;


    background: ${props => props.theme.colors.background};
    padding: 2.4rem;
    /* overflow: auto; */

    strong, h1, h2, h3 {
        color: ${props => props.theme.colors.title};
    }
`

export const ContainerQuiz = styled.div`
    height: 100%;
    display: block;
    overflow: auto;

    h2{
        text-align: center;
        padding-bottom: 15px;
        font-family: Fascinate Inline;
        background-image: linear-gradient(180deg, #fff, #87f1ff);
        font-weight: 400;
    }

    background: ${props => props.theme.colors.background};
    padding: 2.4rem;
    /* overflow: auto; */

    strong, h1, h2, h3 {
        color: ${props => props.theme.colors.title};
    }
`




export const Paper = styled.div`
    background: ${props => props.theme.colors.paper};
    width: min(964px, 90%);
    height: fit-content;
    border-radius: 8px;
    position: relative;
    /* box-shadow: 0px 0px 50px 18px rgba(0,0,0,0.1); */

    h3{
        margin-left: -10px;
    }

    .butolist{
        display: flex;

        justify-content: space-around;
        padding-top: 15px;
    }

    .pontos{
        display: flex;
        justify-content: space-around;
        padding-bottom: 10px;
        padding-top: 25px;
      }

    .msg{
        text-align: center;
    }
    .emblem{
        text-align: center;
    }
    padding: 2.4rem;
    margin: auto;
    /* margin-top: 4rem; */

    & + div {
        margin-top: 3.2rem;
    }
`

export const PaperStart = styled.div`
    background: ${props => props.theme.colors.paper};
    width: min(1164px, 100%);
    height: fit-content;
    border-radius: 8px;
    position: absolute;
    /* box-shadow: 0px 0px 50px 18px rgba(0,0,0,0.1); */
    margin-left: 150px;



    h3{
        margin-left: -10px;
    }

    .butolist{
        display: flex;

        justify-content: space-around;
        padding-top: 15px;
    }

    .pontos{
        display: flex;
        justify-content: space-around;
        padding-bottom: 10px;
        padding-top: 25px;
      }

    .msg{
        text-align: center;
    }
    .emblem{
        text-align: center;
    }
    padding: 2.4rem;
    margin: auto;
    /* margin-top: 4rem; */

    & + div {
        margin-top: 3.2rem;
    }
`

export const PaperQuiz = styled.div`
    background: ${props => props.theme.colors.paper};
    width: min(964px, 90%);
    height: fit-content;
    border-radius: 8px;
    position: relative;
    /* box-shadow: 0px 0px 50px 18px rgba(0,0,0,0.1); */


    .msg{
        text-align: center;
    }
    .emblem{
        text-align: center;
    }
    padding: 2.4rem;
    margin: auto;
    /* margin-top: 4rem; */

    & + div {
        margin-top: 3.2rem;
    }

    .trash{
        display: flex;
        background-color: red;
    }

  h1 {
    font-family: Fascinate Inline;
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    font-weight: 400;
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 50px;
    text-align: center;
    margin: 5px;
    padding-top: -10px;
  }

  hr{
    borde-color: black;
  }

  p{
    color: black;
  }

  h3{
    padding-block-start: 20px;
    text-align: center;
    font-size: 19px;
    font-weight: 400;
  }

  .borda{
    border: 3px solid #87f1ff ;
  }

  .bordi{
    border: none ;
  }

  .rank{
    text-align: center;
  }

  p{
    display: flex;
  }

  #category{
    width: 400px;
    margin-left: 130px;
  }

  #apelido{
    width: 400px;
    margin-left: 260px;
  }

  body {
    background-image: url("../../../assets/quiz.jpg");
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }

  * {
    font-family: 'Catamaran', sans-serif;
    box-sizing: border-box;
  }
`

export const PaperCadastrarQuiz = styled.div`
    background: ${props => props.theme.colors.paper};
    width: min(964px, 90%);
    height: fit-content;
    border-radius: 8px;



    .editar{
        margin-left: -3px;
    }

    .Cast{
        display: flex;
    }

    .addquest{
        margin-left:-6px;
    }

    .addqui{

    }

    .edit{
        cursor: pointer;
        transition-duration: 0.4s;
    }

    .editpes{
        cursor: pointer;
        transition-duration: 0.4s;
        margin-left:-115px;
    }

    .edit:hover{
        color: #87ff;
    }

    .editpes:hover{
        color: #87ff;
    }
    .organi{
        display: flex;
        justify-content: space-around;
        padding-top: 30px;
    }

    .organiz{
        padding-inline: 30px;
        justify-content: space-around;
        padding-top: 10px;
    }

    .organizi{
        padding-inline: 30px;
        justify-content: space-around;
        padding-top: 10px;
        display: flex;
    }

    .buto{
        display: flex;
        margin-top: -20px;
        justify-content: space-around;
    }

    .butolist{
        display: flex;

        justify-content: space-around;
        padding-top: 15px;
    }

    position: relative;
    /* box-shadow: 0px 0px 50px 18px rgba(0,0,0,0.1); */


    .msg{
        text-align: center;
    }
    .emblem{
        text-align: center;
    }
    padding: 2.4rem;
    margin: auto;
    /* margin-top: 4rem; */

    & + div {
        margin-top: 3.2rem;
    }

    .trash{
        display: flex;
        background-color: red;
    }

  h1 {
    font-family: Fascinate Inline;
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    font-weight: 400;
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 60px;
    text-align: center;
    margin: 20px;
  }

  hr{
    borde-color: black;
  }

  p{
    color: black;
  }

  h3{
    padding-block-start: 20px;
    text-align: center;
    font-size: 19px;
    font-weight: 400;
  }

  .borda{
    border: 10px solid black;
  }

  .ponto{
    display: flex;
    justify-content: space-between;
    padding-inline: 40px;
    padding-block-start: 20px;
  }

  .rank{
    text-align: center;
  }

  p{
    display: flex;
  }

  #category{
    width: 400px;
    margin-left: 130px;
  }

  #apelido{
    width: 400px;
    margin-left: 260px;
  }

  body {
    background-image: url("../../../assets/quiz.jpg");
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }

  * {
    font-family: 'Catamaran', sans-serif;
    box-sizing: border-box;
  }
`

export const PseudoInput = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background: ${props => darken(0.045, props.theme.colors.paper)};
    border-radius: 8px;

    & + div {
        margin-top: 1.2rem;
    }

    span {
        width: 9rem;
        display: flex;
        justify-content: center;
        border-radius: 8px 0 0 8px;
        background: ${props => props.theme.colors.background};

        color: ${props => props.theme.colors.title};
        font-weight: 600;

        border: solid 1px ${props => rgba(props.theme.colors.text, 0.15)};
        padding: .8rem 0;
        margin-right: 1.2rem;
    }
`

export const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(264px, 1fr));
    /* grid-template-columns: repeat(auto-fit, minmax(364px, 1fr)); */
    grid-gap: 1.6rem;

    /* width: 90%; */
    height: fit-content;
    margin: auto;

    /* padding: 2.4rem; */
    margin-top: 4rem;
`

export const StButton = styled(Button) <{ toRight?: boolean }>`
    width: fit-content;
    height: fit-content;
    border-radius: 4px;

    padding: 1rem 2.4rem;
    font-size: 2rem;
    font-weight: 900;

    margin-top: 2.4rem;

    ${props => !props.color && css`
        background: ${props.theme.colors.primary};

        :hover {
            background: ${shade(0.1, props.theme.colors.primary)} !important;
        }
    `}

    ${props => props.toRight && css`
        margin-left: auto;
    `}
`

export const StForm = styled(Form)`

    .arrum{
        margin-top: 3.5rem;
    }
    .lai{
       margin-top: 35px;
    }

    .group{
        display: flex;
        justify-content: space-evenly;
    }
    & > fieldset {
        h3 {
            margin-bottom: .8rem;

            padding: 15px;
        }

        h2{
            text-align: center;
        }

        + fieldset {
            margin-top: 1.6rem;
        }

        label {
            display: block;
            margin-bottom: .4rem;
        }
    }
`

export const StFormStart = styled(Form)`

    margin-left: 10.6rem;

    .start, .next {
        cursor: pointer;
        background: linear-gradient(180deg, #ffffff, #ffcc91);
        border: 2px solid #d38558;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        height: 40px;
        margin: 20px 0;
        padding: 0 40px;
        margin-left: 38.6rem;
        margin-top: 2.8rem;
      }

      .start {
        max-width: 200px;
      }

    .group{
        display: flex;
        justify-content: space-evenly;
    }
    & > fieldset {
        h3 {
            margin-bottom: .8rem;

            padding: 15px;
        }

        h2{
            text-align: center;
        }

        + fieldset {
            margin-top: 1.6rem;
        }

        label {
            display: block;
            margin-bottom: .4rem;
        }
    }
`

export const StFormQuiz = styled(Form)`
    .pesquist{
        margin-left: 350px;
    }

    .pep{
        background-color: red;
    }

    .Cast{
        display: flex;
    }

    .butolist{
        display: flex;

        justify-content: space-around;
        padding-top: 15px;
    }

    & > fieldset {

        h3 {
            margin-bottom: .8rem;
            font-weight: bold;
            margin-left: 35px;
            padding: 15px;
            text-align: center;
        }


        h2{
            text-align: center;
        }

        + fieldset {
            margin-top: 1.6rem;
        }

        label {
            display: block;
            margin-bottom: .4rem;
        }
    }
`

export const FormGroup = styled.div<{ mult?: boolean }>`
    + div {
        margin-top: 1.2rem;
    }

    .separ{
        display: list-item;
        padding-left: 70px;
    }

    .butolist{
        display: flex;

        justify-content: space-around;
        padding-top: 15px;
    }

    .buttonadd{
        display: block;
        cursor: pointer;
        transition-duration: 0.4s;
    }

    .buttonadd:hover{
        color: #87ff;
    }

    .sell{
        margin-left: -170px;
        width: 25px;
        border: 5px solid red;
    }

    label {
        display: block;
        margin-bottom: .4rem;
    }


    ${props => props.mult && css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(112px, 1fr));
        grid-gap: 2rem;

        @media screen and (max-width: 490px) {
            grid-template-columns: 1fr;
            grid-gap: .8rem;
        }
    `}

`

export const FormQuiz = styled.div<{ mult?: boolean }>`

    .quest{

        justify-content: space-around;
    }

    .Cast{
        diplay: flex;
    }

    .quist{
        display:flex;
        justify-content: space-around;
    }

    .campedit{
        display:flex;
    }

    .editando{
        background-color: red;
        justify-items: left;
    }

    .editcate{
        background-color: red;
        justify-items: left;
    }

    .addqui{
        font-weight: bold;
        padding-top: 15px;
        margin-left: -335px
    }

    .buttonadd{
        display: block;
        cursor: pointer;
        transition-duration: 0.4s;
    }

    .buttonadd:hover{
        color: #87ff;
    }

    .separ{
        justify-items: left;
        barckground-color: red;
    }

    .buttonaddicty{
        font-weight: bold;
       text-align:center;
        margin-left: -135px
    }

    .buttonedit{
        font-weight: bold;
        padding-top: 15px;
        margin-left: -35px
    }

    .addedi{
        font-weight: bold;
        padding-top: 15px;
        margin-left: -400px
    }


    .pesqui{

    }

    .Cast{
        display: flex;
        justify-content: space-evenly;
    }

    .Casti{
        display: flex;
        justify-content: space-evenly;
        margin-left: 75px;
    }
    .titu{
        padding-bottom: 30px;
        width: 300px;
    }

    .pesqti{
        padding-bottom: 20px;
        width: 300px;
        margin-left: 170px;
        margin-top: 55px;
    }



    .pesqQuiz{
        padding-bottom: 30px;
        width: 400px;
    }

    .Cadas{
        width: 300px;
    }
    .Cad{
        width: 200px;
        margin-left: 70px;
    }
    .Cadi{
        width: 200px;
        margin-left: -70px;
    }
    .add{
        margin-top: -0.4rem;
        justify-content: center;
    }

    .listadd{
        display:flex;
        justify-content: space-evenly;
    }

    .listedi{
        display:flex;
        justify-content: space-around;
        padding-bottom: 10px;
    }

    .listaddi{
        display:flex;
        justify-content: space-around;
        padding-bottom: 10px;
    }

    .addQuiz{
        margin-top: -0.4rem;
        justify-content: center;
    }

    .mais{
        margin-left: 40px;
        cursor: pointer;
        transition-duration: 0.4s;
    }

    .mais:hover{
        color: #87ff;
    }
    .maisQuiz{
        margin-left: 25px;
        cursor: pointer;
        transition-duration: 0.4s;
    }

    .pesq{
        margin-left: 10px;
        cursor: pointer;
        transition-duration: 0.4s;
    }

    .pesq:hover{
        color: #87ff;
    }

    .search{
        padding-top: 10px;
        margin-left: 100px;
        cursor: pointer;
        transition-duration: 0.4s;
    }

    .edit{
        margin-left: -8px;
        cursor: pointer;
        transition-duration: 0.4s;
    }

    .search:hover{
        color: #87ff;
    }

    .edit:hover{
        color: #87ff;
    }

    .maisQuiz:hover{
        color: #87ff;
    }
    + div {
        margin-top: 1rem;

    }

    label {
        display: block;
        margin-bottom: .4rem;
    }


    ${props => props.mult && css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(112px, 1fr));
        grid-gap: 2rem;


        @media screen and (max-width: 490px) {
            grid-template-columns: 1fr;
            grid-gap: .8rem;
        }
    `}

`


export const FormGroup2 = styled.div<{ mult?: boolean }>`
    + div {
        margin-top: 1.2rem;
    }

    label {
        display: block;
        margin-bottom: .4rem;
    }


    ${props => props.mult && css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(112px, 1fr));
        grid-gap: 2rem;

        @media screen and (max-width: 490px) {
            grid-template-columns: 1fr;
            grid-gap: .8rem;
        }
    `}

`

export const FormInputContainer = styled.div<{ gridColumn?: string }>`
    grid-column: ${props => props.gridColumn ? props.gridColumn : 'auto'};

    .flex-container{
        display: flex;
        justify-content: space-evenly;
        padding-top: 30px;

    }




    .sepi{

        margin-left:-400px;
    }

    .vtt{
       text-align:left;
    }

    @media screen and (max-width: 490px) {
        grid-column: auto;
    }
`

export const FormInputContainerQuiz = styled.div<{ gridColumn?: string }>`
    grid-column: ${props => props.gridColumn ? props.gridColumn : 'auto'};

    .flex-container{
        display: flex;

    }

    .vtt{
       text-align:left;
    }

    @media screen and (max-width: 490px) {
        grid-column: auto;
    }
`

export const ActionButtonContainer = styled.div``
export const ActButton = styled.button<{ colorType: "red" | "blue" }>`
    padding: 0.4rem;
    border-radius: .4rem;
    background: ${props => props.theme.colors.red};

    font-size: 0;
    color: white;

    & + button {
        margin-left: .8rem;
    }

    :hover {
        background: ${props => shade(0.15, props.theme.colors.red)};
    }

    ${props => actButtonVariation[props.colorType]}
`

export const Copy = styled.span`
    display: block;
    width: fit-content;
    margin: 2.4rem auto 0;
`

export const ModalContainer = styled.div`
    background: ${props => props.theme.colors.paper};
    padding: 2.4rem;
    border-radius: 8px;
    position: relative;

    width: min(600px, 100%);
    margin: 6.4rem auto auto;

    a {
        color: ${props => props.theme.colors.primary};
    }

    h3 {
        margin-bottom: .8rem;
    }
    h2 {
        margin-bottom: 1rem;
    }
`
export const ModalGridRow = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(224px, 1fr));
    grid-gap: 1.6rem;

    + div {
        margin-top: 2.4rem;
    }
`

export const ModalCloseButton = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;

    :hover {
        opacity: .5;
    }
`

export const ModalSubItem = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    /* margin-left: 2.4rem; */
`

const ModalIconCss = css`
    width: 2.4rem;
    height: 2.4rem;

    margin-right: 1rem;
`

const IconCss = css`
    width: 2rem;
    height: 2rem;

    margin-right: 1rem;
`

export const StEmail = styled(Email)`
    ${IconCss}
`
export const StUser = styled(User)`
    ${IconCss}
`
export const StUserAlt = styled(UserAlt)`
    ${IconCss}
`
export const StPassword = styled(Lock)`
    ${IconCss}
`
export const StPasswordAlt = styled(LockAlt)`
    ${IconCss}
`


export const StDownLoad = styled(Download)`
    ${ModalIconCss}
    color: ${props => props.theme.colors.primary};
`
export const StShare = styled(Share)`
    width: 2rem;
    height: 2rem;

    margin-right: 1rem;
`
export const StClose = styled(Close)`
    ${ModalIconCss}
`

export const StEye = styled(Eye)`
    width: 2rem;
    height: 2rem;
`

export const StAdd = styled(PlusSquare)`
    width: 6rem;
    height: 5rem;

`

export const StTrash = styled(Trash)`
    width: 2rem;
    height: 2rem;
`

export const StEdit = styled(Edit)`
    width: 6rem;
    height: 5rem;
`
export const StSearch = styled(SearchSquare)`
    width: 6rem;
    height: 5rem;
`

export const StTrashQuize = styled(Trash)`
    width: 4rem;
    height: 5rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    cursor: pointer;
    padding-top: 0px;
`

export const StTrashEmble = styled(Trash)`
    width: 3.5rem;
    height: 4rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    cursor: pointer;
    padding-top: 0px;
`

export const StatusFlag = styled.div<{
    colorType: "red" | "green" | "blue"
}>`
    background: ${props => props.theme.colors[props.colorType]};
    border-radius: 8px;
    color: white;
    font-weight: bold;

    padding: 1rem 0;
    width: 10rem;
    display: flex;
    justify-content: center;
`

interface FlexProps {
    /* activate flexbox for top element */
    container?: boolean;
    alignItems?:
      | 'stretch'
      | 'center'
      | 'flex-start'
      | 'flex-end'
      | 'baseline'
      | 'initial'
      | 'inherit';
    justifyContent?:
      | 'flex-start'
      | 'flex-end'
      | 'space-between'
      | 'space-around'
      | 'center'
      | 'initial'
      | 'inherit';
    direction?: 'column' | 'row';
    flexWrap?: 'wrap' | 'nowrap' | 'reverse';
    height?: string;
    maxHeight?: string;
    width?: string;
    maxWidth?: string;
    alignSelf?: 'stretch' | 'center' | 'start' | 'end';
    justifySelf?: 'stretch' | 'center' | 'start' | 'end';
    bgColor?: string;
    flex?: string;
    flexBasis?: string;
    flexGrow?: number;
    flexShrink?: number;

    /* padding and margin */
    padding?: number | number[];
    margin?: number | number[];

    pushDown?: boolean;
    pushLeft?: boolean;
    pushRight?: boolean;
    pushTop?: boolean;
  }

  export const Flex = styled.div<FlexProps>`
    ${({
      container,
      alignItems,
      justifyContent,
      direction,
      flexWrap,
      height,
      maxHeight,
      bgColor,
      flex,
      flexBasis,
      flexGrow,
      flexShrink,
      width,
      maxWidth,
      padding,
      margin,
      justifySelf,
      alignSelf,
      pushDown,
      pushLeft,
      pushRight,
      pushTop,
    }) => css`
      display: ${container ? 'flex' : 'block'};
      ${justifyContent &&
      css`
        justify-content: ${justifyContent};
      `}
      ${alignItems &&
      css`
        align-items: ${alignItems};
      `}
        ${direction &&
      css`
        flex-direction: ${direction};
      `}
      ${flexWrap &&
      css`
        flex-wrap: ${flexWrap};
      `}
      ${height &&
      css`
        height: ${height};
      `}
      ${maxHeight &&
      css`
        max-height: ${maxHeight};
      `}
      ${width &&
      css`
        width: ${width};
      `}
      ${maxWidth &&
      css`
        max-width: ${maxWidth};
      `}
      ${bgColor &&
      css`
        background-color: ${bgColor};
      `}
      /* additional flex properties */
      ${flex &&
      css`
        flex: ${flex};
      `}
      ${flexGrow &&
      css`
        flex-grow: ${flexGrow};
      `}
      ${flexShrink &&
      css`
        flex-shrink: ${flexShrink};
      `}
      ${flexBasis &&
      css`
        flex-basis: ${flexBasis};
      `}
      ${alignSelf &&
      css`
        align-self: ${alignSelf};
      `}
      ${justifySelf &&
      css`
        justify-self: ${justifySelf};
      `}
      ${handleMarginOrPadding(margin)}
      ${handleMarginOrPadding(padding, true)}
      ${pushDown &&
      css`
        margin-top: auto;
      `}
      ${pushTop &&
      css`
        margin-bottom: auto;
      `}
      ${pushLeft &&
      css`
        margin-right: auto;
      `}
      ${pushRight &&
      css`
        margin-left: auto;
      `}
    `}
  `;

  const handleMarginOrPadding = (
    values?: number | number[],
    isPadding?: boolean
  ) => {
    if (!values) return;

    if (Array.isArray(values)) {
      if (values.length > 4) {
        throw new Error(`${isPadding ? 'Padding' : 'Margin'} can have 4 values`);
      }

      // [1, 2] => '1rem 2rem'
      const convertValuesArrayToString = values
        .map((v) => (v === 0 ? 0 : `${v}rem`))
        .join(' ');

      if (isPadding) {
        return css`
          padding: ${convertValuesArrayToString};
        `;
      }

      return css`
        margin: ${convertValuesArrayToString};
      `;
    }

    if (isPadding) {
      return css`
        padding: ${values}rem;
      `;
    }

    return css`
      margin: ${values}rem;
    `;
  };

