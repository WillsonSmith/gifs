const alfy = require('alfy');

const baseUrl = 'https://raw.githubusercontent.com/willsonsmith/gifs/master';

function searchGifs(searchTerm, list) {
  return list.filter((item) => item.tags.some((tag) => tag.includes(searchTerm)));
}

(async () => {
  const list = await alfy.fetch(`${baseUrl}/gifs.json`);
  
  
  const items = searchGifs(alfy.input, list).map(
    (item, index) => (
      {title: item.name, subtitle: '', arg: `${baseUrl}/gifs/${item.name}`}
    )
  );

  alfy.output(items);
})();
