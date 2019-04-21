import $ from 'jquery';
import config from '../config.json';

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
};

let envConfig = config;
const url = window.location.href;
let loc = false;

// For local development.
if (url.includes(`localhost`) || url.includes(`.loc`)) {
  loc = true;
}

function setLinks(v) {
  let href = ``;
  let newTab = false;
  if (envConfig[v].mode === `set`) {
    if (envConfig[v].setContent.type !== `link`) {
      href = `/pages/${v}`;
    } else {
      href = envConfig[v].setContent.url;
      newTab = envConfig[v].setContent.newTab;
    }
  } else {
    const randomItem = envConfig[v].randomContent[Math.floor(Math.random() * envConfig[v].randomContent.length)];
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
  if (!loc) {
    envConfig = await fetch(`https://v1v2v3.co/envConfig.json?${rnd}`).then(res => res.json());
  }
  for (let i = 1; i <= 3; i++) {
    const v = `v${i}`;
    setLinks(v);
  }
});

$(async () => {
  if (!loc) {
    envConfig = await fetch(`https://v1v2v3.co/envConfig.json?${rnd}`).then(res => res.json());
  }
  const v = $(`body`).attr(`data-v`);
  let item = null;
  if (envConfig[v].mode === `set`) {
    item = envConfig[v].setContent;
  } else {
    const mediaOptions = envConfig[v].randomContent.filter(i => i.type !== `link`);
    item = mediaOptions[Math.floor(Math.random() * envConfig[v].randomContent.length)];
  }
  let html = contentHtml[item.type](item.assetUrl);
  // If it has a link (not null), make it clickable. by wrapping in
  if (item.url !== null) {
    html = `<a href="${item.url}" ${item.newTab ? `target="_blank"` : ``}>${html}</a>${
      typeof item.showClickImageGif !== `undefined` && item.showClickImageGif ? `<img src="../../media/click-the-image.gif"/>` : ``
    }`;
  }
  $(`#content`).html(html);
});
