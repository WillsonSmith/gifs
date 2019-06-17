const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const stringifyAligned = require('json-align');

const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);

const gifConfig = 'gifs.json';

const getGifsList = async () => {
  const file = await readFile(path.join(__dirname, gifConfig));
  return JSON.parse(file);
}

const getSavedGifs = async () => {
  const directoryPath = path.join(__dirname, 'gifs');
  const files = await readdir(directoryPath);
  return files;
}

const getTagsFromName = (name) => {
  return name.split('-');
}

const buildNewGifList = (gifList) => {
  return gifList.map((gif) => {
    const extension = path.extname(gif);
    const name = path.basename(gif, extension);
    return {
      name: gif,
      description: '',
      tags: getTagsFromName(name),
    }
  });
}

(async() => {
  const gifs = await getSavedGifs();
  const gifList = await getGifsList();
  const savedGifNames = gifList.map(gif => gif.name);

  const newGifs = gifs.filter((gif) => {
    return !savedGifNames.includes(gif);
  });

  const newGifObject = [
    ...gifList,
    ...buildNewGifList(newGifs)
  ];

  const lessRemovedGifs = newGifObject.filter((gif) => {
    return gifs.includes(gif.name);
  });

  writeFile(gifConfig, stringifyAligned(lessRemovedGifs));

})();
