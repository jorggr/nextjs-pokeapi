import Image from 'next/image'
import Link from 'next/link'
// import { useRouter } from 'next/router'

export default function pokemonById({ pokemon }) {
  // Usando fallback true
  // const router = useRouter()
  // if (router.isFallback) {
  //   return <p>Cargando</p>
  // }

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <Image src={pokemon.sprites.front_default} width={350} height={350} />
      <Link href="/">Go Back</Link>
    </div>
  )
}

// Estatico / dinamico
export async function getStaticProps({ params }) {
  const { id } = params
  const getPokemonById = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const data = await getPokemonById.json()

  return {
    props: {
      pokemon: data,
    },
  }
}

export async function getStaticPaths() {
  const paths = [{ params: { id: '1' } }, { params: { id: '2' } }]

  // return { paths: paths, fallback: true }
  return { paths: paths, fallback: 'blocking' }
}

/*
// Generar todo desde el lado del servidor
export async function getServerSideProps({ params }) {
  const { id } = params

  const getPokemonById = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

  const data = await getPokemonById.json()

  return {
    props: {
      pokemon: data,
    },
  }
}
*/
