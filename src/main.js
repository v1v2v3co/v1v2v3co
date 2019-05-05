import $ from 'jquery';
import Cookies from 'js-cookie';

const rnd = Math.floor(Math.random() * 99999);
const url = window.location.href;
if (Cookies.get(`v1v2v3_viewed`) === undefined) {
  Cookies.set(`v1v2v3_viewed`, []);
}
const viewed = JSON.parse(Cookies.get(`v1v2v3_viewed`));
console.log(viewed);

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

function setLinks(v, config) {
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
    let randomItem = ``;
    while (true) {
      randomItem = config[v].randomContent[Math.floor(Math.random() * config[v].randomContent.length)];
      if (!viewed.includes(randomItem.name)) {
        break;
      }
    }
    if (randomItem.type !== `link`) {
      href = `/pages/${v}`;
      $(`a[data-v="${v}"]`).attr(`data-content-name`, `page`);
    } else {
      href = randomItem.url;
      newTab = randomItem.newTab;
      // - Add cookie - //
      if (viewed.length === 30) {
        viewed.shift();
      }
      viewed.push(randomItem.name);
      Cookies.set(`v1v2v3_viewed`, viewed);
    }
  }
  $(`a[data-v="${v}"]`).attr(`href`, href);
  $(`a[data-v="${v}"]`).attr(`target`, `_self`);
  if (newTab) {
    $(`a[data-v="${v}"]`).attr(`target`, `_blank`);
  }
}

$(async () => {
  // * PAGE * //
  if (url.includes(`pages`)) {
    const config = await fetch(`./config.json?${rnd}`).then(res => res.json());
    let item = null;
    if (config.mode === `set`) {
      item = config.setContent;
    } else {
      const mediaOptions = config.randomContent.filter(i => i.type !== `link`);
      while (true) {
        item = mediaOptions[Math.floor(Math.random() * mediaOptions.length)];
        if (!viewed.includes(item.name)) {
          break;
        }
      }
    }
    // - Add cookie - //
    if (viewed.length === 30) {
      viewed.shift();
    }
    viewed.push(item.name);
    Cookies.set(`v1v2v3_viewed`, viewed);
    let html = contentHtml[item.type](item.assetUrl);
    // If it has a link (not null), make it clickable. by wrapping in
    if (item.url !== null) {
      html = `<a href="${item.url}" ${item.newTab ? `target="_blank"` : ``}>${html}</a>${
        typeof item.showClickImageGif !== `undefined` && item.showClickImageGif ? `<img src="../../media/click-the-image.gif"/>` : ``
      }`;
    }
    $(`#content`).html(html);
  } else {
    // * INDEX * //
    const config = {};
    const promises = [
      fetch(`../pages/v1/config.json?${rnd}`)
        .then(res => res.json())
        .then(res => {
          config.v1 = res;
        }),
      fetch(`../pages/v2/config.json?${rnd}`)
        .then(res => res.json())
        .then(res => {
          config.v2 = res;
        }),
      fetch(`../pages/v3/config.json?${rnd}`)
        .then(res => res.json())
        .then(res => {
          config.v3 = res;
        }),
    ];
    await Promise.all(promises);
    for (let i = 1; i <= 3; i++) {
      const v = `v${i}`;
      setLinks(v, config);
    }
    $(document).on(`click`, `.v-link`, function() {
      const v = $(this).attr(`data-v`);
      setTimeout(() => {
        setLinks(v, config);
      }, 1000);
    });
  }
});
