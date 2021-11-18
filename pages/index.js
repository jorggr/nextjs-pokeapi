import Link from 'next/link'

const Pokemon = ({ pokemon }) => {
  const idPokemon = pokemon.url
    .split('/')
    .filter((item) => item)
    .pop()

  return (
    <div key={idPokemon}>
      <Link href={`/pokemon/${idPokemon}`}>{pokemon.name}</Link>
    </div>
  )
}

export default function Home({ pokemons }) {
  return (
    <section>
      <div>
        {pokemons.map((item) => (
          <Pokemon pokemon={item} key={item.name} />
        ))}
      </div>
    </section>
  )
}

export async function getStaticProps() {
  const URI = 'https://pokeapi.co/api/v2/pokemon?limit=50'

  const poke_data = await fetch(URI)
  const data = await poke_data.json()

  return {
    props: {
      pokemons: data.results,
    },
  }
}
