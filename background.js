chrome.runtime.onMessage.addListener(({ action, pokemonName, pokemonOwner }, sender, sendResponse) => {
  if (action === "loadContents") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'checkPokemons' });
    });
  }
  if (action === 'fetchPokemon') {
    const formattedPokemonName = pokemonName.toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${formattedPokemonName}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText || 'Failed to fetch');
        }
        return response.json();
      })
      .then(data => {
        sendResponse({[pokemonOwner]: data });
      })
      .catch(error => {
        sendResponse({[pokemonOwner]: { error: error.message }});
      });

    return true; // Will respond asynchronously
  }
});
