import React, { useEffect, useState } from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";

function PokemonPage() {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch("http://localhost:3001/pokemon");
      const data = await response.json();
      setPokemon(data);
    };

    fetchPokemon();
  }, []);

  const handleAddPokemon = (newPokemon) => {
    setPokemon([...pokemon, newPokemon]);
  };

  const pokemonsToDisplay = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h1>Pokemon Searcher</h1>
      <br />
      <PokemonForm onAddPokemon={handleAddPokemon} />
      <br />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <br />
      <PokemonCollection pokemon={pokemonsToDisplay} />
    </Container>
  );
}

export default PokemonPage;
