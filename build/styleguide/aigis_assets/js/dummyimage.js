'use strict';

function createPlaceholderSVG(width, height) {
  return `
<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'>
  <rect x='0' y='0' width='100%' height='100%' fill='#bbb'/>
  <text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle' fill='#fff' font-size='20' font-weight='bold'>${width}×${height}</text>
</svg>`.replace(/\n\s*/, '').trim();
}


document.addEventListener(`DOMContentLoaded`, () => {
  const dummyImgs = [...document.querySelectorAll(`img[src^=__dummy__]`)];
  dummyImgs.forEach(img => {
    const srcValue = img.getAttribute(`src`).trim();
    const svgUrl = srcValue.replace(/__dummy__(\d+)x(\d+)/, (_, p1, p2) => {
      const svgSnippet = createPlaceholderSVG(p1, p2);
      return `data:image/svg+xml,${encodeURIComponent(svgSnippet)}`;
    });
    img.src = svgUrl;
  });
})
