import csv from "csv-parser";
import { Readable } from "stream";

export async function parseCSVString(csvString: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const stream = Readable.from(csvString);
    const parsedData = [] as string[];

    stream
      .pipe(csv({ headers: false }))
      .on("data", (row) => {
        parsedData.push(...(Object.values(row ?? {}) as string[]));
      })
      .on("end", () => {
        resolve(parsedData);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
