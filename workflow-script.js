const alfy = require('alfy');

function searchGifs(searchTerm, list) {
  return list.filter((item) => item.tags.some((tag) => tag.includes(searchTerm)));
}

(async () => {
  const list = await alfy.fetch(`https://raw.githubusercontent.com/willsonsmith/gifs/master/gifs.json`);
  
  
  const items = searchGifs(alfy.input, list).map(
    (item, index) => (
      {title: item.name, subtitle: '', arg: `https://raw.githubusercontent.com/willsonsmith/gifs/master/gifs/${item.name}`}
    )
  );

  alfy.output(items);
})();
