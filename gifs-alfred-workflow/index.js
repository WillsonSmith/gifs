const alfy = require('alfy');

const baseUrl = 'https://raw.githubusercontent.com/willsonsmith/gifs/master';

function searchGifs(searchTerm, list) {
  return list.filter((item) => item.tags.some((tag) => tag.includes(searchTerm)));
}

function createObject(item) {
  return {title: item.name, subtitle: '', arg: `${baseUrl}/gifs/${item.name}`}
}

(async () => {
  const list = await alfy.fetch(`${baseUrl}/gifs.json`);
  
  if (!alfy.input) {
    alfy.output(list.map(createObject))

  } else {
    const items = searchGifs(alfy.input, list).map(createObject);

    alfy.output(items);
  }
})();
