// Utilidades avanzadas de procesamiento de lenguaje natural
import { removeStopwords } from './stopwords';

// Normalización avanzada de texto
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')  // Elimina acentos
    .replace(/[^\w\s]/g, ' ')         // Reemplaza signos de puntuación
    .replace(/\s+/g, ' ')             // Normaliza espacios
    .trim();
}

// Tokenización mejorada
export function tokenize(text: string): string[] {
  const normalized = normalizeText(text);
  const tokens = normalized.split(' ');
  return removeStopwords(tokens);
}

// Cálculo de similitud por n-gramas
export function calculateNGramSimilarity(str1: string, str2: string, n: number = 2): number {
  const getNGrams = (text: string, n: number) => {
    const ngrams = new Set<string>();
    for (let i = 0; i <= text.length - n; i++) {
      ngrams.add(text.slice(i, i + n));
    }
    return ngrams;
  };

  const s1 = getNGrams(normalizeText(str1), n);
  const s2 = getNGrams(normalizeText(str2), n);
  
  const intersection = new Set([...s1].filter(x => s2.has(x)));
  const union = new Set([...s1, ...s2]);
  
  return intersection.size / union.size;
}

// Similitud por coincidencia de palabras clave
export function calculateKeywordSimilarity(tokens1: string[], tokens2: string[]): number {
  const set1 = new Set(tokens1);
  const set2 = new Set(tokens2);
  
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  return intersection.size / union.size;
}

// Similitud por secuencia más larga común
export function calculateLCSScore(str1: string, str2: string): number {
  const matrix: number[][] = Array(str1.length + 1).fill(0)
    .map(() => Array(str2.length + 1).fill(0));
  
  let maxLength = 0;
  
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
        maxLength = Math.max(maxLength, matrix[i][j]);
      }
    }
  }
  
  return maxLength / Math.max(str1.length, str2.length);
}

// Similitud semántica por contexto
export function calculateContextSimilarity(context1: string[], context2: string[]): number {
  const commonContext = context1.filter(word => context2.includes(word));
  return commonContext.length / Math.max(context1.length, context2.length);
}