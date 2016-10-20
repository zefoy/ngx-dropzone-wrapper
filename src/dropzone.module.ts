import { NgModule, ModuleWithProviders, OpaqueToken, Optional, SkipSelf, Inject } from '@angular/core';

import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { DropzoneComponent } from './dropzone.component';
import { DropzoneConfig, DropzoneConfigInterface} from './dropzone.interfaces';

export const DROPZONE_GUARD = new OpaqueToken('DROPZONE_GUARD');
export const DROPZONE_CONFIG = new OpaqueToken('DROPZONE_CONFIG');

@NgModule({
  imports: [CommonModule, HttpModule],
  declarations: [DropzoneComponent],
  exports: [CommonModule, HttpModule, DropzoneComponent]
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
          useFactory: () => new DropzoneConfig(DROPZONE_CONFIG),
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
