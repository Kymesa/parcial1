const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("results");

searchButton.addEventListener("click", handleSearch);

async function handleSearch() {
  const query = searchInput.value;

  if (query.length === 0) {
    return (resultsContainer.innerHTML =
      "<p>Escribe el nombre de un país.</p>");
  }

  resultsContainer.innerHTML = "<p>Cargando...</p>";

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${query}`
    );

    if (response.ok === false) {
      throw new Error("País no encontrado");
    }

    const data = await response.json();

    resultsContainer.innerHTML = "";

    data.forEach((country) => {
      const capital = country.capital?.[0];
      const language = country.languages
        ? Object.values(country.languages)[0]
        : "";

      const countryCard = `
              <div class="card">
               <img src="${country.flags.png}" alt="Bandera de ${
        country.name.common
      }" />
                  <h2>${country.name.common}</h2>
                  <p><strong>Capital:</strong> ${capital}</p>
                  <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
                  <p><strong>Región:</strong> ${country.region}</p>
                  <p><strong>Idioma:</strong> ${language}</p>
              </div>
          `;
      resultsContainer.innerHTML += countryCard;
    });
  } catch (error) {
    resultsContainer.innerHTML = `<p>${error.message}</p>`;
  }
}
