import { Component, Host, Prop } from '@stencil/core';
import { h } from '../../utils/h';

@Component({
  tag: 'my-component-internal',
  styleUrl: 'my-component-internal.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  render() {
    return (
      <Host class="my-component-internal">
        <div>
          This is an internal component
        </div>
      </Host>
    )
  }
}
