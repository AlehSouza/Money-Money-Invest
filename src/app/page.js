import styles from './globals.scss'
import Image from 'next/image'
import './page.scss'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="main-c">
        <Image width="64" height="64" src="/alex_sanchez.png" alt="Icon"/>
        <h1>Olá, seja bem-vindo</h1>
        <Link href='/loan' type='button'>
          Entrar
        </Link>
    </main>
  )
}
