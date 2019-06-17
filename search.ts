(async () => {
  const list = await fetch(`https://raw.githubusercontent.com/willsonsmith/gifs/master/gifs.json`);

  console.log(await list);
})();
