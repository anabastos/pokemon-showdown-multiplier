// Listens to click and sends extractText msg
document.addEventListener('DOMContentLoaded', function() {
  const pokeButton = document.getElementById('update');

  chrome.storage.local.get('pokemons', (data) => {
    updatePokemonData(data.pokemons);
  });

  pokeButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'loadContents' });
  });
});

// Trigger contents first load
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  chrome.runtime.sendMessage({ action: 'loadContents' });
});

function updatePokemonData(pokemons) {
  const { opponent, trainer } = pokemons || {};
  const contentDiv = document.getElementById('container');
  if (opponent && trainer) {
    contentDiv.innerHTML = `
                <div>
                  <h1>Opponent's ${opponent}</h1>
                  <ul id="multiplierList">
                    <li>
                      <bold class="attack">Attack:</bold>
                      testtesttestejsdhakjhdskjahdkjsah
                    </li>
                    <li>
                      <bold class="defense">Defense:</bold>
                      testtesttestejsdhakjhdskjahdkjsah
                    </li>
                  </ul>
                </div>
                <div>
                  <h1>Trainer ${trainer}</h1>
                  <ul id="multiplierList">
                    <li>
                      <bold class="attack">Attack:</bold>test
                      testtesttestejsdhakjhdskjahdkjsah
                    </li>
                    <li>
                      <bold class="defense">Defense:</bold>test
                      testtesttestejsdhakjhdskjahdkjsah
                    </li>
                  </ul>
                </div>
            `;
  } else {
    contentDiv.innerHTML = `<p>No Pokémon data available.</p>`;
  }
}
