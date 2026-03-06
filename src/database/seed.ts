import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module';
import { CsvParserUtil } from '../core/utils/csv-parser.util';
import { SeedRegistry } from './seed-registry';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);

    // Storage for parent-child ID mapping
    const codeToIdMap = new Map<string, number>();

    // Command line arguments for specific seeding (e.g., npm run seed Subjects)
    const args = process.argv.slice(2);

    try {
        const tasks = args.length > 0
            ? SeedRegistry.filter(t => args.includes(t.name) || args.includes(t.file))
            : SeedRegistry;

        console.log(`🚀 Starting execution for ${tasks.length} tasks...`);

        for (const task of tasks) {
            console.log(`⏳ Processing: ${task.name} (${task.file})...`);

            await CsvParserUtil.read(
                dataSource,
                task.entity,
                task.file,
                (row) => task.transform(row, codeToIdMap)
            );

            // If it's hierarchical, refresh the map so children can find these IDs
            if (task.level !== undefined) {
                const repo = dataSource.getRepository(task.entity);
                const saved = await repo.find({
                    where: { level: task.level },
                    select: ['id', 'code']
                });
                saved.forEach(item => {
                    if (item.code) codeToIdMap.set(item.code, item.id);
                });
                console.log(`🔗 Updated lookup map with ${saved.length} IDs for Level ${task.level}`);
            }
        }

        console.log('✅ Seeding completed successfully.');
    } catch (error: any) {
        console.error('❌ Seeding failed:', error.message || error);
        process.exit(1);
    } finally {
        await app.close();
        process.exit(0);
    }
}

bootstrap();