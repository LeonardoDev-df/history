import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

import {
    Container,
    Header,
    Hero,
    Main,
    ButtonEndIcon,
    SpaceGirl,
    Logo,
    ScrollIndicator,
    SectionOne,
    SectionTwo,
    SectionThree,
    SectionFour,
    LayingMan,
    Quizhist,
    Footer,
    LogoFooter,
    FacebookIcon,
    InstagramIcon,
    ArrowRightIcon,
    ImageReality,
    ManUploading,
    SocialMedias,
    One,
    Two,
    Three,
    Four
} from '../styles/pages/Home'
import { useAddToHomescreenPrompt } from '../hooks/useAddToHomescreenPrompt'
import { InstallPWAButton } from '../components/InstallPWAButton'
import Head from '../infra/components/Head'
import Link from '../infra/components/Link'
import Laptops from '../assets/laptops.png'

export default function Home() {
    const [showMenu, setShowMenu] = useState(false)
    const containerRef = useRef<HTMLDivElement>({} as HTMLDivElement)

    const [prompt, promptToInstall, isInDevice] = useAddToHomescreenPrompt()
    const [isVisible, setIsVisible] = useState(false)

    function toggleChange() {
        // Faz com que a tela não scrole quando o menu existir
        containerRef.current.style.overflow = showMenu ? 'hidden' : 'initial'

        setShowMenu(prev => !prev)
    }

    useEffect(() => {
        if (prompt && isInDevice) {
            setIsVisible(true)
        }
    }, [prompt, isInDevice])

    const names = ["Jose", "Marcus", "Paulo"]

    const points = [ 75, 85, 91]

    return (
        <Container ref={containerRef}>
            <Head title="Home - RV History" />

            {/* Navbar */}
            <Header $on={showMenu}>
                <div>
                    {/* <AssetLogo /> */}
                    <Logo />

                    <button onClick={toggleChange}>
                        <One $on={showMenu} />
                        <Two $on={showMenu} />
                        <Three $on={showMenu} />
                        <Four $on={showMenu} />
                    </button>

                    <nav>
                        <ul>
                            <li>
                                <Link href="#header">Home</Link>
                            </li>
                            <li>
                                <Link href="#about">Sobre</Link>
                            </li>
                            <li>
                                <Link href="#Quiz">Quiz</Link>
                            </li>
                            <li>
                                <Link href="/search-map">Explorar</Link>
                            </li>
                            <Link href="/signIn">
                                <button>Entrar</button>
                            </Link>
                        </ul>
                    </nav>
                </div>
            </Header>

            <Hero id="header">
                <div>
                    <div>
                        <h1>
                            O Mundo artístico e históricos na palma de sua mão.
                        </h1>
                        <p>
                            A idéia do projeto é tornar acessível a qualquer
                            pessoa o acesso a sítios culturais em qualquer lugar
                            do mundo através da Realidade Virtual.
                        </p>

                        <Link href="/3d-view?idHistoricalSite=1001&year=2021">
                            <button>
                                Iniciar
                                <ButtonEndIcon />
                            </button>
                        </Link>

                        {isVisible && (
                            <InstallPWAButton onClick={promptToInstall} />
                        )}
                    </div>
                    <SpaceGirl />
                </div>
                <ScrollIndicator />
            </Hero>

            {/* Circle Shape */}
            <svg viewBox="0 0 500 40">
                <path d="M0,0 L0,0 Q250,80 500,0 L500,0 Z" fill="#2D8CEB" />
            </svg>
            <div id="about"></div>
                 <div></div>
            <Main>
                <SectionOne >
                    <h2>
                        Sobre <span>o Projeto</span>
                    </h2>

                    <div>
                        <p>
                            O projeto tem por objetivo dispor um registro
                            temporal e geográfico de sítios com finalidades
                            artísticas e culturais para registro histórico por
                            meio de tecnologias de Realidade Virtual. Você pode
                            acessar principais pontos históricos sem precisar
                            sair de casa se locomovendo geográficamente e
                            temporal, lhe permitindo visualizar como era aquele
                            local em uma data especícifica.
                        </p>

                        <LayingMan />
                    </div>
                </SectionOne>

                <SectionTwo>
                    <h2>
                        Exemplos <span>de Sítios</span>
                    </h2>

                    <div>
                        <p>
                            Além de explorar, você pode contribuir com o projeto
                            registrando novos sítios.
                        </p>

                        {/* <img src={(Laptops as any).src} alt="Laptops" /> */}
                        <Image src={Laptops} alt="Laptops" placeholder="blur" />
                    </div>
                </SectionTwo>

                <SectionThree>
                    <h2>
                        Crie um tour <span>virtual 3D</span> em apenas 3 etapas!
                    </h2>

                    <div>
                        <section>
                            <ImageReality />

                            <span>1</span>

                            <h3>Tirar Foto</h3>
                            <p>Tire uma foto panorâmica.</p>
                        </section>

                        <section>
                            <ManUploading />

                            <span>2</span>

                            <h3>Fazer Upload</h3>
                            <p>
                                Adicione fotos a um tour e nós fazemos o resto.
                            </p>
                        </section>

                        <section>
                            <SocialMedias />

                            <span>3</span>

                            <h3>Compartilhar</h3>
                            <p>
                                Compartilhe seus tour com muitas pessoas e
                                mantenha a história.
                            </p>
                        </section>
                    </div>
                </SectionThree>

                <div id="Quiz"></div>
                 <div></div>
                <SectionFour >
                    <h2>
                        Sobre <span>o Quiz History</span>
                    </h2>

                    <div>
                        <p>
                            O Quiz History tem por objetivo aumentar a interação do usuário com o
                            sistema através de perguntas e respostas, sobre curiosidades de sítios cuturais e
                            monumentos históricos, assim deixando a experiência de quem está utilizando mais emersa.
                        </p>

                        <Quizhist />
                    </div>

                    <h3>
                        Entre e confira o
                            <Link href="/Quiz">
                            <span> Quiz History</span>
                            </Link>
                    </h3>

                </SectionFour>
            </Main>

            <Footer>
                <section>
                    <div>
                        <LogoFooter />
                        <p>
                            "A cultura de um povo é o seu maior patrimônio
                            Preservá-la é resgatar a história, perpetuar
                            valores, é permitir que as novas gerações não vivam
                            sob as trevas do anonimato." - Nildo Lage
                        </p>
                        <span>
                            <Link href="https://www.facebook.com">
                                <FacebookIcon />
                            </Link>
                            <Link href="https://instagram.com">
                                <InstagramIcon />
                            </Link>
                        </span>
                    </div>

                    <ul>
                        <h2>Links</h2>
                        <li>
                            <ArrowRightIcon />
                            <Link href="#">Termos de serviços</Link>
                        </li>
                        <li>
                            <ArrowRightIcon />
                            <Link href="#">Políticas de privacidade</Link>
                        </li>
                    </ul>

                    <section>
                        <h2>Contatos</h2>
                        <p>
                            <strong>Email:</strong> rvhistoryapi@gmail.com
                        </p>
                    </section>
                </section>

                <div>
                    <p>
                        &copy; 2021 Copyright. All right reserved. Develop with
                        ❤️ by <span>Gabriel Jacobina / Johnatan Brayan</span>.
                    </p>
                </div>
            </Footer>
        </Container>
    )
}
