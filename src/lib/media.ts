import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Finds an image or video under public/ at build time, so screenshot slots stay
 * hidden until the file exists. Returns its URL and pixel size (avoids layout shift).
 */
export type Media = { src: string; width: number; height: number; video: boolean };

const publicDir = join(process.cwd(), "public");

function pngSize(buffer: Buffer) {
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function jpegSize(buffer: Buffer) {
  let offset = 2;
  while (offset < buffer.length) {
    const marker = buffer.readUInt16BE(offset);
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xffc0 && marker <= 0xffc3) return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) };
    offset += 2 + length;
  }
  return null;
}

function webpSize(buffer: Buffer) {
  const chunk = buffer.toString("ascii", 12, 16);
  if (chunk === "VP8X") return { width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3) };
  if (chunk === "VP8 ") return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
  if (chunk === "VP8L") { const bits = buffer.readUInt32LE(21); return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 }; }
  return null;
}

export function findMedia(file: string, video = false): Media | null {
  if (video) {
    const path = join(publicDir, `${file}.mp4`);
    return existsSync(path) ? { src: `/${file}.mp4`, width: 1080, height: 1920, video: true } : null;
  }
  for (const extension of ["webp", "png", "jpg"]) {
    const path = join(publicDir, `${file}.${extension}`);
    if (!existsSync(path)) continue;
    const buffer = readFileSync(path);
    const size = extension === "png" ? pngSize(buffer) : extension === "jpg" ? jpegSize(buffer) : webpSize(buffer);
    if (size) return { src: `/${file}.${extension}`, ...size, video: false };
  }
  return null;
}
