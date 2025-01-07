import intents from '../data/intents.json';
import type { IntentsData, Intent } from '../types/chat';
import {
  normalizeText,
  tokenize,
  calculateNGramSimilarity,
  calculateKeywordSimilarity,
  calculateLCSScore,
  calculateContextSimilarity
} from './nlpUtils';

interface MatchResult {
  intent: Intent;
  score: number;
  confidence: number;
}

// Calcula la puntuación compuesta para un patrón
function calculatePatternScore(userInput: string, pattern: string): number {
  const normalizedInput = normalizeText(userInput);
  const normalizedPattern = normalizeText(pattern);
  
  // Tokenización y eliminación de stopwords
  const inputTokens = tokenize(userInput);
  const patternTokens = tokenize(pattern);
  
  // Cálculo de diferentes métricas de similitud
  const ngramScore = calculateNGramSimilarity(normalizedInput, normalizedPattern);
  const keywordScore = calculateKeywordSimilarity(inputTokens, patternTokens);
  const lcsScore = calculateLCSScore(normalizedInput, normalizedPattern);
  const contextScore = calculateContextSimilarity(inputTokens, patternTokens);
  
  // Coincidencia exacta
  const exactMatch = normalizedInput === normalizedPattern ? 1 : 0;
  
  // Ponderación de las diferentes métricas
  return (
    exactMatch * 1.0 +      // Coincidencia exacta (peso: 100%)
    ngramScore * 0.4 +      // Similitud por n-gramas (peso: 40%)
    keywordScore * 0.3 +    // Similitud por palabras clave (peso: 30%)
    lcsScore * 0.2 +        // Similitud por secuencia común más larga (peso: 20%)
    contextScore * 0.1      // Similitud por contexto (peso: 10%)
  ) / 2;                    // Normalización a un valor entre 0 y 1
}

// Encuentra el mejor intent para una entrada
function findBestIntent(userInput: string, intents: Intent[]): MatchResult {
  let bestMatch: MatchResult = {
    intent: intents[0],
    score: 0,
    confidence: 0
  };

  // Calcular puntuaciones para cada intent
  const scores = intents.map(intent => {
    const patternScores = intent.patterns.map(pattern => 
      calculatePatternScore(userInput, pattern)
    );
    
    // Tomar la mejor puntuación de los patrones
    const maxScore = Math.max(...patternScores);
    
    // Calcular confianza basada en la distribución de puntuaciones
    const avgScore = patternScores.reduce((a, b) => a + b, 0) / patternScores.length;
    const confidence = maxScore / (avgScore + 0.0001); // Evitar división por cero
    
    return {
      intent,
      score: maxScore,
      confidence
    };
  });

  // Ordenar por puntuación y confianza
  scores.sort((a, b) => {
    if (Math.abs(a.score - b.score) < 0.1) { // Si las puntuaciones son similares
      return b.confidence - a.confidence;      // Decidir por confianza
    }
    return b.score - a.score;                 // Si no, decidir por puntuación
  });

  return scores[0];
}

export function findBestMatch(userInput: string): string {
  const data = intents as IntentsData;
  const { intent, score, confidence } = findBestIntent(userInput, data.intents);
  
  // Umbral dinámico basado en la confianza
  const threshold = 0.3 * (1 - Math.min(confidence, 0.5));
  
  if (score >= threshold) {
    const responses = intent.responses;
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  return "Lo siento, no entendí tu pregunta. ¿Podrías reformularla?";
}