// Utilidades para procesamiento de texto
export function normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
      .replace(/[^\w\s]/g, ' ')        // Reemplaza signos de puntuación con espacios
      .trim();
  }
  
  export function getWords(text: string): string[] {
    return normalizeText(text)
      .split(/\s+/)
      .filter(word => word.length > 2); // Ignora palabras muy cortas
  }
  
  // Calcula similitud por palabras clave
  export function calculateKeywordMatch(words1: string[], words2: string[]): number {
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  }
  
  // Calcula similitud por subcadenas
  export function calculateSubstringMatch(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    let longestSubstring = 0;
    
    for (let i = 0; i < shorter.length; i++) {
      for (let j = i + 1; j <= shorter.length; j++) {
        const substring = shorter.substring(i, j);
        if (longer.includes(substring)) {
          longestSubstring = Math.max(longestSubstring, substring.length);
        }
      }
    }
    
    return longestSubstring / longer.length;
  }