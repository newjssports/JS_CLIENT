import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/">
        <img
          src="./assets/images/logos/js.png"
          class="align-middle m-2"
          alt="logo" width="50" height="50"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
