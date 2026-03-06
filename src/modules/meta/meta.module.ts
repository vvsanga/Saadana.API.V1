import { Module } from '@nestjs/common';
import { MetaEnglishModule } from './english/english.module';
import { MetaGeneralModule } from './general/meta-general.module';
import { MetaGeographyModule } from './geography/meta-geography.module';

@Module({
    imports: [
        MetaGeographyModule,
        MetaEnglishModule,
        MetaGeneralModule
    ]
})
export class MetaModule { }
