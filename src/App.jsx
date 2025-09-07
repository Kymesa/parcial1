import { useEffect, useState } from "react";
import "./App.css";

export const App = () => {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (input.length >= 1) {
      setLoading(true);
      setError("");
      try {
        const responded = await fetch(
          `https://restcountries.com/v3.1/name/${input}`
        );

        if (responded.ok) {
          const data = await responded.json();
          setCountries(data);
        } else {
          setError("País no encontrado");
          setCountries([]);
        }
      } catch (err) {
        setCountries([]);
        setError(err.message);
      }
    } else {
      setCountries([]);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [input]);

  return (
    <div className="container">
      <h1>Buscador de informacion de paises</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Escribe un país..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {loading ? <p>Cargando...</p> : null}
      {error ? <p className="error">{error}</p> : null}

      <div className="results">
        {countries.map((c) => (
          <div key={c.cca3} className="card">
            <img src={c.flags.png} alt={c.name.common} />
            <h2>{c.name.common}</h2>
            <p>
              <strong>Capital:</strong> {c.capital?.[0] || "No disponible"}
            </p>
            <p>
              <strong>Población:</strong> {c.population.toLocaleString()}
            </p>
            <p>
              <strong>Región:</strong> {c.region}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
