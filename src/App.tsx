import { SyntheticEvent, useState } from "react";
import "./App.css";

interface Pokemon {
  name: string;
  image: string;
}

function App() {
  const [age, setAge] = useState(1);
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);

  const [pokemon, setPokemon] = useState<Pokemon>({ name: "", image: "" });

  const chosenPokemonId = ((age + day) * month) % 1010;

  const getPokemon = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${chosenPokemonId}`
    );

    if (response?.ok) {
      const pokemon = await response.json();

      const pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

      setPokemon({
        name: pokemonName,
        image: pokemon.sprites.front_default,
      });
    } else {
      setPokemon({
        name: "Error with Pokeapi",
        image: "",
      });
    }
  };

  return (
    <div className="container">
      <h1>Pokéfinder</h1>
      <div className="pokemon">
        <p className="bold">
          {pokemon.name ? pokemon.name : "Enter your info"}
        </p>
        <div className="pokemon-image">
          {pokemon.image ? (
            <img src={pokemon.image} alt={pokemon.name + " image"} />
          ) : null}
        </div>
      </div>
      <form className="card" onSubmit={getPokemon}>
        <div className="input">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            required
            min={1}
            max={99}
            name="age"
            id="age"
            value={age}
            onChange={(e) => setAge(+e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="day">Day</label>
          <input
            type="number"
            required
            min={1}
            max={31}
            name="day"
            id="day"
            value={day}
            onChange={(e) => setDay(+e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="month">Month</label>
          <input
            type="number"
            required
            min={1}
            max={12}
            name="month"
            id="month"
            value={month}
            onChange={(e) => setMonth(+e.target.value)}
          />
        </div>
        <button type="submit" className="action">
          Get Pokemon
        </button>
      </form>
    </div>
  );
}

export default App;
