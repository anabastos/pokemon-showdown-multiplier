// Listens to click and sends extractText msg
document.addEventListener('DOMContentLoaded', function() {
  const pokeButton = document.getElementById('update');

  chrome.storage.local.get('opponent', ({ opponent }) => {
    let opponentView = "";
    if (opponent.error !== undefined) {
      opponentView = `<h1>${opponent.error}</h1>`;
    } else {
      opponentView = `<h1>Opponent's ${opponent.name}</h1>
                  <ul id="multiplierList">
                    <li>
                      <bold class="attack">Attack:</bold>
                      testtesttestejsdhakjhdskjahdkjsah
                    </li>
                    <li>
                      <bold class="defense">Defense:</bold>
                      testtesttestejsdhakjhdskjahdkjsah
                    </li>
                  </ul>`;
    }

    updatePokemonData(opponentView, "opponent");
  });

  chrome.storage.local.get('trainer', ({ trainer }) => {
    let trainerView = "";
    if (trainer.error) {
      trainerView = `<h1>${trainer.error}</h1>`;
    } else {
      trainerView = `<h1>Trainer's ${trainer.name}</h1>
                  <ul id="multiplierList">
                    <li>
                      <bold class="attack">Attack:</bold>
                      testtesttestejsdhakjhdskjahdkjsah
                    </li>
                    <li>
                      <bold class="defense">Defense:</bold>
                      testtesttestejsdhakjhdskjahdkjsah
                    </li>
                  </ul>`;
    }

    updatePokemonData(trainerView, "trainer");
  });

  pokeButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'loadContents' });
  });
});

// Trigger contents first load
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  chrome.runtime.sendMessage({ action: 'loadContents' });
});

function updatePokemonData(view, owner) {
  const contentDiv = document.getElementById(owner);
  contentDiv.innerHTML = view;
}
