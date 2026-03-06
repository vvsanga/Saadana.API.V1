import * as fs from 'fs';
import * as path from 'path';

export type TTimestampFormat = 'date' | 'datetime' | 'datetime-ms' | 'iso';

function getExtensionFromUrlPath(url: string): string {
    try {
        const parsed = new URL(url);
        const ext = path.extname(parsed.pathname); // e.g., ".png"
        return ext ? ext.slice(1) : '';            // remove dot
    } catch {
        return '';
    }
}

export function GetTimestamp(format: TTimestampFormat = 'datetime', useSeparator = false): string {
    const now = new Date();
    let timestamp: string;

    switch (format) {
        case 'date':
            timestamp = now.toISOString().slice(0, 10).replace(/-/g, '');
            break;
        case 'datetime':
            timestamp = now.toISOString().replace(/[-:T]/g, '').slice(0, 15);
            if (useSeparator) timestamp = timestamp.slice(0, 8) + '_' + timestamp.slice(8);
            break;
        case 'datetime-ms':
            timestamp = now.toISOString().replace(/[-:T.Z]/g, '').slice(0, 17);
            if (useSeparator) timestamp = timestamp.slice(0, 8) + '_' + timestamp.slice(8);
            break;
        case 'iso':
        default:
            timestamp = now.toISOString().replace(/[:.]/g, '-');
            break;
    }

    return timestamp;
}

export async function GetFileExtension(url: string): Promise<string> {
    // 1. Try extension from URL
    const urlExt = getExtensionFromUrlPath(url);
    if (urlExt) return urlExt;

    // 2. Fallback to Content-Type
    try {
        const res = await fetch(url, { method: 'HEAD' });
        const contentType = res.headers.get('content-type'); // e.g., 'image/jpeg'
        if (contentType) {
            const parts = contentType.split('/');
            if (parts.length === 2) return parts[1]; // "jpeg", "png", etc.
        }
    } catch {
        // ignore
    }

    return ''; // unknown
}

export async function DownloadFile(url: string, targetFolder: string, baseFilename: string, fallbackExtension: string,
    options?: {
        format?: TTimestampFormat;      // optional, default 'datetime-ms'
        useSeparator?: boolean;         // optional, default false
    }): Promise<string> {
    const rootFolder = path.join(process.cwd(), 'assets');      // default root
    const folder = path.join(rootFolder, targetFolder);         // target inside assets
    fs.mkdirSync(folder, { recursive: true });

    const format = options?.format ?? 'datetime-ms';
    const useSeparator = options?.useSeparator ?? false;

    // Determine extension from URL or fallback
    const fileExt = (await GetFileExtension(url)) || fallbackExtension;
    const filename = `${baseFilename}.${fileExt}`;
    const filePath = path.join(folder, filename);

    // Archive old file if exists
    if (fs.existsSync(filePath)) {
        const archiveDir = path.join(folder, 'archive');
        fs.mkdirSync(archiveDir, { recursive: true });

        const { name, ext } = path.parse(filePath);
        const archivedFilePath = path.join(
            archiveDir,
            `${name}${GetTimestamp(format, useSeparator)}${ext}`
        );

        fs.renameSync(filePath, archivedFilePath);
    }

    // Download new file
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch file: ${res.status} ${res.statusText}`);

    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const relativePath = path.join(targetFolder, filename).replace(/\\/g, '/');
    return relativePath;
}
