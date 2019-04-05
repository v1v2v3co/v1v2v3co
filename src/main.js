import $ from 'jquery';
// import config from '../config.json';

const rnd = Math.floor(Math.random() * 99999);

const contentHtml = {
  image: assetUrl => `
    <img src="${assetUrl}" alt="Image"/>
  `,
  pdf: assetUrl => `
  <object width="80%" height="80%" type="application/pdf" data="${assetUrl}">
    <p>Insert your error message here, if the PDF cannot be displayed.</p>
  </object>
  `,
  video: assetUrl => `
    <video width="100%" height="100%" controls>
      <source src="${assetUrl}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  `,
  audio: assetUrl => ``,
};

let config = {};

function setLinks(v) {
  let href = ``;
  let newTab = false;
  if (config[v].mode === `set`) {
    if (config[v].setContent.type !== `link`) {
      href = `/pages/${v}`;
    } else {
      href = config[v].setContent.url;
      newTab = config[v].setContent.newTab;
    }
  } else {
    const randomItem = config[v].randomContent[Math.floor(Math.random() * config[v].randomContent.length)];
    if (randomItem.type !== `link`) {
      href = `/pages/${v}`;
    } else {
      href = randomItem.url;
      newTab = randomItem.newTab;
    }
  }
  $(`a[data-v="${v}"]`).attr(`href`, href);
  if (newTab) {
    $(`a[data-v="${v}"]`).attr(`target`, `_blank`);
  }
}

$(document).on(`click`, `.v-link`, function() {
  const v = $(this).attr(`data-v`);
  setLinks(v);
});

$(document).ready(async () => {
  config = await fetch(`https://kylepg.github.io/config.json?${rnd}`).then(res => res.json());
  for (let i = 1; i <= 3; i++) {
    const v = `v${i}`;
    setLinks(v);
  }
});

$(async () => {
  const configx = await fetch(`https://kylepg.github.io/config.json?${rnd}`).then(res => res.json());
  const v = $(`body`).attr(`data-v`);
  const mediaOptions = configx[v].randomContent.filter(item => item.type !== `link`);
  const randomItem = mediaOptions[Math.floor(Math.random() * configx[v].randomContent.length)];
  let html = contentHtml[randomItem.type](randomItem.assetUrl);
  // If it has a link (not null), make it clickable. by wrapping in
  if (randomItem.url !== null) {
    html = `<a href="${randomItem.url}" ${randomItem.newTab ? `target="_blank"` : ``}>${html}</a>${
      typeof randomItem.showClickImageGif !== `undefined` && randomItem.showClickImageGif ? `<img src="../../media/click-the-image.gif"/>` : ``
    }`;
  }
  $(`#content`).html(html);
});
