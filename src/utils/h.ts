/* eslint-disable @typescript-eslint/no-namespace */
import { h as stencilH } from '@stencil/core/internal';

/**
 * Transforms a tag name by adding a prefix if it's a custom element
 * @param tag 
 * @returns the transformed tag 
 */
export function transformTag(tag: string): string {
  if (!tagPrefix) return tag;
  const isMyCustomElement = tag.startsWith('my-');
  return isMyCustomElement ? `${tagPrefix}-${tag}` : tag;
}

/**
 * Augment Stencil's `h()` function to add a tag prefix
 * @param args incoming JSX arguments
 * @returns the result of the original `h()` function
 */
export function h(...args: Parameters<typeof stencilH>): ReturnType<typeof stencilH> {
  const tagName = args[0];
  if (!tagName || typeof tagName !== 'string' || !tagPrefix) {
    return stencilH(...args);
  }

  let newTagName = tagName;
  if (typeof tagName === 'string') {
    newTagName = transformTag(tagName);
  }

  const arr = args.slice(2);
  const tuple = [newTagName, args[1], arr] as const;

  return stencilH(...tuple);
}

let tagPrefix: string = '';

/**
 * Sets the tag prefix to be used when rendering custom elements
 * @param prefix the prefix to use
 * @returns the `transformTag` function
 */
export function setTagPrefix (prefix: string) {
  tagPrefix = prefix;
  return transformTag
}

/**
 * Gets the current tag prefix
 * @returns the current tag prefix 
 */
export function getTagPrefix() {
  return tagPrefix || '';
}

export namespace h {
  export import JSX = stencilH.JSX;
}