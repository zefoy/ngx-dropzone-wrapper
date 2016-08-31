import { NgModule, ModuleWithProviders, OpaqueToken, Optional, SkipSelf } from "@angular/core";

import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';

import { DropzoneComponent } from './dropzone.component';
import { DropzoneConfig, DropzoneConfigInterface} from './dropzone.interfaces';

export const DROPZONE_CONFIG = new OpaqueToken('DROPZONE_CONFIG');

@NgModule({
	imports: [CommonModule, HttpModule],
	declarations: [DropzoneComponent],
	exports: [CommonModule, HttpModule, DropzoneComponent]
})
export class DropzoneModule {
	constructor (@Optional() @SkipSelf() parentModule: DropzoneModule) {
    if (parentModule) {
      throw new Error(`DropzoneModule is already loaded.
        Import it in the AppModule only!`);
    }
  }

	static forRoot(config: DropzoneConfigInterface): ModuleWithProviders {
		return {
			ngModule: DropzoneModule,
			providers: [
					{
						provide: DROPZONE_CONFIG,
						useValue: config ? config : {}
					},
					{
						provide: DropzoneConfig,
						useFactory: provideDropzoneConfig,
						deps: [
							DROPZONE_CONFIG
						]
					}
				]
		};
	}
}

export function provideDropzoneConfig(configInterface: DropzoneConfigInterface = {}) {
	const config = new DropzoneConfig(configInterface);

	return config;
}
