const anchor = require("markdown-it-anchor");
const pluginInlineLinkFavicon = require("eleventy-plugin-inline-link-favicon");
const markdown_it_expandable = require("markdown-it-expandable");
const pluginTOC = require('@thedigitalman/eleventy-plugin-toc-a11y')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h1", "h2", "h3", "h4"],
    wrapperClass: 'toc',
});
  eleventyConfig.setDataDeepMerge(false);
  eleventyConfig.addPlugin(pluginInlineLinkFavicon)
  eleventyConfig.amendLibrary("md", mdLib => mdLib.use(markdown_it_expandable));
  eleventyConfig.amendLibrary("md", mdLib => mdLib.use(require('markdown-it-imsize')));
  eleventyConfig.amendLibrary("md", mdLib => mdLib.use(anchor, {
    permalink: anchor.permalink.linkAfterHeader({
      style: 'visually-hidden',
      assistiveText: title => `Permalink to “${title}”`,
      visuallyHiddenClass: 'sr-only',
      wrapper: ['<div class="anchor-wrapper">', '</div>']
    })
  }))
  return {
    passthroughFileCopy: true
  }
}