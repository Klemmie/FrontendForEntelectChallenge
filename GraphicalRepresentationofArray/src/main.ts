import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import * as core from "@angular/core";
import * as browserd from "@angular/platform-browser-dynamic";
import * as common from "@angular/common";
import * as compiler from "@angular/compiler";
import * as browser from "@angular/platform-browser";

if (environment.production) {
  enableProdMode();
}else {
  window['@angular/core'] = core;
  window['@angular/common'] = common;
  window['@angular/compiler'] = compiler;
  window['@angular/platform-browser'] = browser;
  window['@angular/platform-browser-dynamic'] = browserd;
}

platformBrowserDynamic().bootstrapModule(AppModule);
