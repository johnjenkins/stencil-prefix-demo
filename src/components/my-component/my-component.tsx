import { Component, Host, Prop, Element } from '@stencil/core';
import { h, transformTag } from '../../utils/h';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  @Element() el: HTMLElement;
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

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  onDidRender() {
    console.log('The internal component:', this.el.shadowRoot.querySelector(transformTag('my-component-internal')));
  }

  render() {
    return (
      <Host classs="my-component">
        <div>
          Hello, World! I'm {this.getText()}

          <my-component-internal />
        </div>
      </Host>
    )
  }
}
