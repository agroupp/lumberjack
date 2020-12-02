import { InjectionToken } from '@angular/core';

import { isClass } from '@internal/test-util';

import {
  HttpDriverConfig,
  httpDriverConfigToken,
  HttpDriverOptions,
  HttpDriverRetryOptions,
  LumberjackHttpDriverModule,
} from './index';

describe('Configuration API', () => {
  describe('Interfaces', () => {
    it('exposes HttpDriverConfig', () => {
      const value: HttpDriverConfig | undefined = undefined;

      expect(value).toBeUndefined();
    });

    it('exposes HttpDriverRetryOptions', () => {
      const value: HttpDriverRetryOptions | undefined = undefined;

      expect(value).toBeUndefined();
    });
  });

  describe('Types', () => {
    it('exposes HttpDriverOptions', () => {
      const value: HttpDriverOptions | undefined = undefined;

      expect(value).toBeUndefined();
    });
  });

  describe('Dependency injection tokens', () => {
    it('exposes httpDriverConfigToken', () => {
      const sut = httpDriverConfigToken;

      expect(sut).toBeInstanceOf(InjectionToken);
    });
  });

  describe('Angular modules', () => {
    it(`exposes ${LumberjackHttpDriverModule.name}`, () => {
      const sut = LumberjackHttpDriverModule;

      expect(isClass(sut)).withContext(`${sut.name} is not a class`).toBeTrue();
    });
  });
});
