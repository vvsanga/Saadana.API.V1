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
    const filePath = path.resolve(process.cwd(), 'src/database/seed-data/', fileName);
    const rows: DeepPartial<T>[] = [];

    // Line counter for logging (start at 1 for header)
    let currentLine = 1;

    return new Promise((resolve, reject) => {
      if (!fs.existsSync(filePath)) return reject(`File not found: ${filePath}`);

      fs.createReadStream(filePath)
        .pipe(parse({ headers: true, ignoreEmpty: true, trim: true }))
        .on('error', (error: any) => {
          // DETAILED ERROR LOGGING
          console.error('\n' + '='.repeat(50));
          console.error(`❌ CSV PARSE ERROR in: ${fileName}`);
          console.error(`📍 Approximate Line: ${currentLine + 1}`);
          console.error(`❗ Reason: ${error.message}`);

          // If the error has the raw row data attached (fast-csv does this)
          if (error.data) {
            console.error(`📄 Problematic Data: ${JSON.stringify(error.data)}`);
          }
          console.error('='.repeat(50) + '\n');

          reject(error);
        })
        .on('data', (row) => {
          currentLine++; // Increment for every successful row parsed
          const data = transform ? transform(row) : (row as DeepPartial<T>);
          rows.push(data);
        })
        .on('end', async () => {
          try {
            if (rows.length > 0) {
              const entities = repository.create(rows);
              await repository.save(entities, { chunk: 500 });
              console.log(`✅ Successfully seeded ${rows.length} records from ${fileName}`);
            }
            resolve();
          } catch (err) {
            console.error(`❌ TypeORM Save Error in ${fileName}:`, err);
            reject(err);
          }
        });
    });
  }
}
