// LCM Calculation utilities

export interface LCMResult {
  lcm: number;
  primeFactorization: PrimeFactorizationSteps;
  divisionMethod: DivisionMethodSteps;
  listMultiples: ListMultiplesSteps;
}

export interface PrimeFactorizationSteps {
  factorizations: Array<{
    number: number;
    factors: number[];
    factorString: string;
    exponentialForm: string;
  }>;
  combinedFactors: string;
  calculation: string;
  lcm: number;
}

export interface DivisionMethodSteps {
  divisionTable: Array<{
    divisor: number;
    quotients: number[];
  }>;
  divisorsProduct: string;
  lcm: number;
}

export interface ListMultiplesSteps {
  multiplesLists: Array<{
    number: number;
    multiples: number[];
  }>;
  commonMultiple: number;
  lcm: number;
}

// Helper: Get prime factors of a number
function getPrimeFactors(n: number): number[] {
  const factors: number[] = [];
  let num = n;
  
  for (let i = 2; i <= num; i++) {
    while (num % i === 0) {
      factors.push(i);
      num = num / i;
    }
  }
  
  return factors;
}

// Helper: Convert factors to exponential form
function toExponentialForm(factors: number[]): string {
  const counts = new Map<number, number>();
  
  factors.forEach(f => {
    counts.set(f, (counts.get(f) || 0) + 1);
  });
  
  const parts: string[] = [];
  counts.forEach((count, base) => {
    if (count === 1) {
      parts.push(`${base}`);
    } else {
      parts.push(`${base}<sup>${count}</sup>`);
    }
  });
  
  return parts.join(' × ');
}

// Helper: GCD for LCM calculation
function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Calculate LCM of array using GCD
function calculateLCM(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  if (numbers.length === 1) return numbers[0];
  
  let lcm = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    lcm = (lcm * numbers[i]) / gcd(lcm, numbers[i]);
  }
  
  return lcm;
}

// Method 1: Prime Factorization
function calculatePrimeFactorization(numbers: number[]): PrimeFactorizationSteps {
  const factorizations = numbers.map(num => {
    const factors = getPrimeFactors(num);
    const factorString = factors.join(' × ');
    const exponentialForm = toExponentialForm(factors);
    
    return {
      number: num,
      factors,
      factorString,
      exponentialForm
    };
  });
  
  // Get all unique prime factors
  const allPrimes = new Set<number>();
  factorizations.forEach(f => {
    f.factors.forEach(prime => allPrimes.add(prime));
  });
  
  // For each prime, find the maximum power across all numbers
  const maxPowers = new Map<number, number>();
  
  Array.from(allPrimes).forEach(prime => {
    let maxPower = 0;
    
    factorizations.forEach(f => {
      const power = f.factors.filter(p => p === prime).length;
      maxPower = Math.max(maxPower, power);
    });
    
    maxPowers.set(prime, maxPower);
  });
  
  // Build combined factors string
  const combinedParts: string[] = [];
  const calculationParts: number[] = [];
  
  Array.from(maxPowers.entries())
    .sort((a, b) => a[0] - b[0])
    .forEach(([prime, power]) => {
      if (power === 1) {
        combinedParts.push(`${prime}`);
      } else {
        combinedParts.push(`${prime}<sup>${power}</sup>`);
      }
      calculationParts.push(Math.pow(prime, power));
    });
  
  const combinedFactors = combinedParts.join(' × ');
  const calculation = calculationParts.join(' × ');
  const lcm = calculateLCM(numbers);
  
  return {
    factorizations,
    combinedFactors,
    calculation,
    lcm
  };
}

// Method 2: Division Method
function calculateDivisionMethod(numbers: number[]): DivisionMethodSteps {
  const divisionTable: Array<{ divisor: number; quotients: number[] }> = [];
  let currentNumbers = [...numbers];
  
  // Keep dividing until all numbers become 1
  while (currentNumbers.some(n => n > 1)) {
    let divisor = 2;
    
    // Find the smallest prime that divides at least one number
    while (divisor <= Math.max(...currentNumbers)) {
      if (currentNumbers.some(n => n % divisor === 0)) {
        break;
      }
      divisor++;
    }
    
    // Divide numbers by divisor if possible, otherwise keep the same
    const quotients = currentNumbers.map(n => 
      n % divisor === 0 ? n / divisor : n
    );
    
    divisionTable.push({ divisor, quotients });
    currentNumbers = quotients;
  }
  
  const divisors = divisionTable.map(row => row.divisor);
  const divisorsProduct = divisors.join(' × ');
  const lcm = divisors.reduce((acc, d) => acc * d, 1);
  
  return {
    divisionTable,
    divisorsProduct,
    lcm
  };
}

// Method 3: List of Multiples
function calculateListMultiples(numbers: number[]): ListMultiplesSteps {
  const lcm = calculateLCM(numbers);
  const maxMultiplesToShow = 10;
  
  const multiplesLists = numbers.map(num => {
    const multiples: number[] = [];
    for (let i = 1; multiples.length < maxMultiplesToShow; i++) {
      const multiple = num * i;
      multiples.push(multiple);
      if (multiple >= lcm && multiples.length >= 3) break;
    }
    
    return {
      number: num,
      multiples
    };
  });
  
  return {
    multiplesLists,
    commonMultiple: lcm,
    lcm
  };
}

// Main calculation function
export function calculateLCMWithMethods(numbers: number[]): LCMResult {
  if (numbers.length === 0 || numbers.some(n => n <= 0)) {
    throw new Error('Please enter valid positive numbers');
  }
  
  const lcm = calculateLCM(numbers);
  const primeFactorization = calculatePrimeFactorization(numbers);
  const divisionMethod = calculateDivisionMethod(numbers);
  const listMultiples = calculateListMultiples(numbers);
  
  return {
    lcm,
    primeFactorization,
    divisionMethod,
    listMultiples
  };
}

// Parse comma-separated input
export function parseNumberInput(input: string): number[] {
  const parts = input.split(',').map(s => s.trim()).filter(s => s.length > 0);
  
  if (parts.length < 2) {
    throw new Error('Please enter at least two numbers separated by commas');
  }
  
  // Validate each part is a valid positive integer (only digits, no decimals or letters)
  const validIntegerPattern = /^\d+$/;
  
  for (const part of parts) {
    if (!validIntegerPattern.test(part)) {
      throw new Error(`Invalid number: "${part}". Please enter only positive whole numbers`);
    }
  }
  
  const numbers = parts.map(p => Number(p));
  
  // Additional check for zero or negative (shouldn't happen with regex, but safety check)
  if (numbers.some(n => n <= 0)) {
    throw new Error('Please enter only positive numbers (greater than 0)');
  }
  
  return numbers;
}
