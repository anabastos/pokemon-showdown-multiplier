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
  const contentDiv = document.getElementById('content');
  if (opponent && trainer) {
    contentDiv.innerHTML = `
                <h1>Battle Info</h1>
                <p>Opponent's Pokémon: ${opponent}</p>
                <p>Trainer Pokémon: ${trainer}</p>
            `;
  } else {
    contentDiv.innerHTML = `<p>No Pokémon data available.</p>`;
  }
}
