function extractMatches() {
  const regexOpponentPokemon = /sent out ([A-Za-z]+)!/g;
  const regexTrainerPokemon = /Go! ([A-Za-z]+)/g;

  const opponentPokemon = extractLastPokemon(regexOpponentPokemon);
  const trainerPokemon = extractLastPokemon(regexTrainerPokemon);

  return {opponent: opponentPokemon, trainer: trainerPokemon};
}

function extractLastPokemon(regex) {
  const bodyText = document.body.innerText;
  let lastMatch = null;
  let match;
  while ((match = regex.exec(bodyText)) !== null) {
    lastMatch = match[1]; // match[1] contains Pokemon name
  }
  return lastMatch;
}

// Listens to message to extractText
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "checkPokemons") {
    const pokemons = extractMatches();
    chrome.storage.local.set({ pokemons });
  }
});
