import $ from 'jquery';
import config from '../config.json';

console.log(config);

$(document).on(`click`, `.v-link`, function() {
  const v = $(this).attr(`data-v`);
  let href = ``;
  let newTab = false;
  if (config[v].mode === `set`) {
    if (config[v].setContent.type !== `link`) {
      href = `pages/${v}`;
    } else {
      href = config[v].setContent.url;
      newTab = config[v].setContent.newTab;
    }
  } else {
    const randomItem = config[v].randomContent[Math.floor(Math.random() * config[v].randomContent.length)];
    if (randomItem.type !== `link`) {
      href = `pages/${v}`;
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

// On click of a v1/v2/v3 link...
//   If content is set, link to that.
//
//   If not, choose a random piece of content and go to that link.
// If the link is null, go to the v1/v2/v3 page.

// On load of the v1/v2/v3 page...
// Sort content by once with images (not null)
// Select one
// If it has a link (not null), make it clickable.
