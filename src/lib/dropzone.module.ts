import { NgModule, ModuleWithProviders, InjectionToken, Optional, SkipSelf, Inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { DropzoneComponent } from './dropzone.component';
import { DropzoneDirective } from './dropzone.directive';
import { DropzoneConfig, DropzoneConfigInterface} from './dropzone.interfaces';

export const DROPZONE_GUARD = new InjectionToken('DROPZONE_GUARD');
export const DROPZONE_CONFIG = new InjectionToken('DROPZONE_CONFIG');

@NgModule({
  imports: [CommonModule],
  declarations: [DropzoneComponent, DropzoneDirective],
  exports: [CommonModule, DropzoneComponent, DropzoneDirective]
})
export class DropzoneModule {
  constructor (@Optional() @Inject(DROPZONE_GUARD) guard: any) {}

  static forRoot(config?: DropzoneConfigInterface): ModuleWithProviders {
    return {
      ngModule: DropzoneModule,
      providers: [
        {
          provide: DROPZONE_GUARD,
          useFactory: provideForRootGuard,
          deps: [
            [
              DropzoneConfig,
              new Optional(),
              new SkipSelf()
            ]
          ]
        },
        {
          provide: DROPZONE_CONFIG,
          useValue: config ? config : {}
        },
        {
          provide: DropzoneConfig,
          useFactory: provideDefaultConfig,
          deps: [
            DROPZONE_CONFIG
          ]
        }
      ]
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: DropzoneModule
    };
  }
}

export function provideForRootGuard(config: DropzoneConfig): any {
  if (config) {
    throw new Error(`
      Application called DropzoneModule.forRoot() twice.
      For submodules use DropzoneModule.forChild() instead.
    `);
  }

  return 'guarded';
}

export function provideDefaultConfig(config: DropzoneConfigInterface): DropzoneConfig {
  return new DropzoneConfig(config);
}
