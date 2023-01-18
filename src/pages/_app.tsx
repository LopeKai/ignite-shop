import Image from "next/image";
import { AppProps } from "next/app";
import { globalStyle } from "../styles/global";

import logoImg from '../assets/logo.svg'
import { Container,Header } from "../styles/pages/app";

globalStyle()

console.log(logoImg)
export default function App({ Component, pageProps }: AppProps) {

  return (
    <Container>
      <Header>
        <Image 
          src={logoImg.src} 
          width={130}
          height={52}
          alt="" />
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
