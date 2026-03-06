export const safeStringify = (obj: any): string => {
  try {
    // Simple one-liner for most objects
    return JSON.stringify(obj);
  } catch (error) {
    // If it fails (circular reference), we manually clean it
    const cache = new Set();
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.has(value)) return '[Circular]';
        cache.add(value);
      }
      return value;
    });
  }
};