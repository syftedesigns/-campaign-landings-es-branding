import { Component, OnInit, DoCheck } from '@angular/core';
@Component({
  selector: 'app-menu-ads',
  templateUrl: './menu-ads.component.html',
  styleUrls: ['./menu-ads.component.css']
})
export class MenuAdsComponent implements OnInit, DoCheck {
  public URL_PATH: string = '';
  public URL_VIEW: string = '';
  constructor() { }

  ngOnInit() {
    this.URL_VIEW = window.location.href;
    this.LangMenu(window.location.href);
  }
  ngDoCheck() {
    const withBtn = document.getElementById('button-menu').offsetWidth;
    const elements: any = document.getElementsByClassName('mat-menu-panel');
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.width = `${withBtn}px`;
    }
  }
  LangMenu(PATH_URL: string): void {
    switch (PATH_URL) {
      case 'https://www.syftedesigns.com/campaign/es/applications/':
        this.URL_PATH = PATH_URL.replace('es/applications/', 'applications/');
      break;
      case 'https://www.syftedesigns.com/campaign/es/website/':
          this.URL_PATH = PATH_URL.replace('es/website/', 'website/');
      break;
      case 'https://www.syftedesigns.com/campaign/es/branding/':
            this.URL_PATH = PATH_URL.replace('es/branding/', 'branding/');
      break;
      case 'https://www.syftedesigns.com/campaign/es/ecommerce/':
              this.URL_PATH = PATH_URL.replace('es/ecommerce/', 'ecommerce/');
      break;
      case 'https://www.syftedesigns.com/campaign/es/marketing/':
            this.URL_PATH = PATH_URL.replace('es/marketing/', 'marketing/');
      break;
      default:
        console.log('Es local');
    }
  }
}
