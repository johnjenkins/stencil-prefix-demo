/**
 * @fileoverview entry point for your component library
 *
 * This is the entry point for your component library. Use this file to export utilities,
 * constants or data structure that accompany your components.
 *
 * DO NOT use this file to export your components. Instead, use the recommended approaches
 * to consume components of this package as outlined in the `README.md`.
 */

// @ts-expect-error - NAMESPACE isn't officially exported
import { NAMESPACE } from '@stencil/core';
import { setTagPrefix } from './utils/h';

export { format } from './utils/utils';
export type * from './components.d.ts';

/**
 * Registers a prefix to be used for all components in this library.
 * 
 * Automatically sets the tag prefix for all components if using the browser loader.
 * 
 * For bundler loader: 
 * return the tag transformer function for use with bundler loader e.g.
 * ```js
 * import { defineCustomElements } from '@my-lib/loader';
 * import { registerLibPrefix } from '@my-lib';
 * 
 * const transformTagName = registerLibPrefix('namespace-prefix');
 * 
 * defineCustomElements(window, {
 *   transformTagName
 * })
 * ```
 * 
 * @param prefix 
 * @returns 
 */
export function registerLibPrefix(prefix: string) {
  if (!window || !document) return;

  const tagTransform = setTagPrefix(prefix);

  // this automagically sets the tag prefix for all components if using the browser loader
  const autoLoaderScript = document.querySelector(
    `script[src$="/${NAMESPACE}.esm.js"]`
  );
  if (autoLoaderScript) {
    autoLoaderScript['data-opts'] = {
      transformTagName: tagTransform,
    };
  }
  return tagTransform;
}
export { getTagPrefix } from './utils/h';