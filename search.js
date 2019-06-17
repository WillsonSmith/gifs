// deno run --allow-net=raw.githubusercontent.com search.ts

const fetch = require('node-fetch');

function searchGifs(searchTerm, list) {
  list.forEach(item => console.log(item.tags))
  // list.filter((item) => item.tags.some((tag) => tag.includes(searchTerm)));
}

(async () => {
  const list = await fetch(`https://raw.githubusercontent.com/willsonsmith/gifs/master/gifs.json`);
  const json = await list.json();
  
  console.log(json);
  console.log(searchGifs('roos', json));
})();
