import $ from 'jquery';
// import config from '../config.json';

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

$(document).on(`click`, `.v-link`, async function() {
  const config = await fetch(`https://cdn.jsdelivr.net/gh/kylepg/v1v2v3co_stage@latest/config.json`).then(res => res.json());
  const v = $(this).attr(`data-v`);
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
  if (newTab) {
    window.open(href, `_blank`);
  } else {
    window.location.href = href;
  }
});

$(async () => {
  const config = await fetch(`https://cdn.jsdelivr.net/gh/kylepg/v1v2v3co_stage@latest/config.json`).then(res => res.json());
  const v = $(`body`).attr(`data-v`);
  const mediaOptions = config[v].randomContent.filter(item => item.type !== `link`);
  const randomItem = mediaOptions[Math.floor(Math.random() * config[v].randomContent.length)];
  let html = contentHtml[randomItem.type](randomItem.assetUrl);
  // If it has a link (not null), make it clickable. by wrapping in
  if (randomItem.url !== null) {
    html = `<a href="${randomItem.url}" ${randomItem.newTab ? `target="_blank"` : ``}>${html}</a><img src="../../media/click-the-image.gif"/>`;
  }
  $(`#content`).html(html);
});
