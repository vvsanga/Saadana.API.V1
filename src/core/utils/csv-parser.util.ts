import { parse } from 'fast-csv';
import * as fs from 'fs';
import * as path from 'path';
import { DataSource, DeepPartial, EntityTarget, ObjectLiteral } from 'typeorm';

export class CsvParserUtil {
  static async read<T extends ObjectLiteral>(
    dataSource: DataSource,
    entity: EntityTarget<T>,
    fileName: string,
    transform?: (row: any) => DeepPartial<T>,
  ): Promise<void> {
    const repository = dataSource.getRepository(entity);
    const filePath = path.resolve(process.cwd(), 'public/meta/', fileName);
    const rows: DeepPartial<T>[] = []; // Fix: Use DeepPartial to match TypeORM Save signature

    return new Promise((resolve, reject) => {
      if (!fs.existsSync(filePath)) return reject(`File not found: ${filePath}`);

      fs.createReadStream(filePath)
        .pipe(parse({ headers: true, ignoreEmpty: true }))
        .on('error', reject)
        .on('data', (row) => {
          const data = transform ? transform(row) : (row as DeepPartial<T>);
          rows.push(data);
        })
        .on('end', async () => {
          try {
            if (rows.length > 0) {
              // 1. Convert plain objects to Entity instances
              // This step triggers the @BeforeInsert logic
              const entities = repository.create(rows);

              // 2. Save the entities
              await repository.save(entities, { chunk: 500 });
            }
            resolve();
          } catch (err) {
            reject(err);
          }
        });
    });
  }
}