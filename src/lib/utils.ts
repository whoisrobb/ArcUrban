import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAllChars = () => {
  const upperCase = Array.from(Array(26))
    .map((_, i) => String.fromCharCode(65 + i));
  const lowerCase = upperCase.map((char) => char.toLowerCase());
  const numbers = Array.from(Array(10))
    .map((_, i) => String.fromCharCode(48 + i));
  return [...upperCase, ...lowerCase, ...numbers];
}