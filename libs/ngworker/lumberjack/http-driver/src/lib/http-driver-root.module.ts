import { HttpClient } from '@angular/common/http';
import { Inject, NgModule, NgZone, Optional, SkipSelf } from '@angular/core';

import { LogDriverConfig, logDriverConfigToken, logDriverToken } from '@ngworker/lumberjack';

import { HttpDriverConfig, httpDriverConfigToken } from './http-driver-config.token';
import { HttpDriver } from './http.driver';

export function httpDriverFactory(
  http: HttpClient,
  logDriverConfig: LogDriverConfig,
  httpDriverConfig: HttpDriverConfig,
  ngZone: NgZone
): HttpDriver {
  const config: HttpDriverConfig = {
    ...logDriverConfig,
    ...httpDriverConfig,
  };

  return new HttpDriver(http, config, ngZone);
}

@NgModule({
  providers: [
    {
      deps: [HttpClient, logDriverConfigToken, httpDriverConfigToken, NgZone],
      multi: true,
      provide: logDriverToken,
      useFactory: httpDriverFactory,
    },
  ],
})
export class HttpDriverRootModule {
  constructor(
    // tslint:disable: no-any no-null-keyword
    @Optional()
    @SkipSelf()
    @Inject(HttpDriverRootModule)
    maybeNgModuleFromParentInjector: HttpDriverRootModule = null as any
    // tslint:disable: no-any no-null-keyword
  ) {
    if (maybeNgModuleFromParentInjector) {
      throw new Error(
        'HttpDriverModule.forRoot registered in multiple injectors. Only call it from your root injector such as in AppModule.'
      );
    }
  }
}
