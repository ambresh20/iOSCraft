import type { DSAProblem } from '../../types/dsa';

export const logicBuildingProblems: DSAProblem[] = [
  {
    id: 'for-loop-basics',
    title: 'For-Loop Basics',
    slug: 'for-loop-basics',
    topicId: 'logic-building',
    difficulty: 'Easy',
    category: 'Logic Building',
    tags: ['loops', 'fundamentals'],
    pattern: 'Iteration',
    readingTime: 5,
    description: 'Learn how to use Swift for-in loops to iterate over sequences and ranges.',
    problemStatement: 'Write a function that takes an integer N and returns an array containing the first N multiples of 3. Use a for-loop.',
    inputDescription: 'An integer N > 0.',
    outputDescription: 'An array of integers containing multiples of 3 (3, 6, 9...).',
    constraints: [
      '1 ≤ N ≤ 1000'
    ],
    examples: [
      { input: 'N = 4', output: '[3, 6, 9, 12]' },
      { input: 'N = 1', output: '[3]' }
    ],
    approaches: [
      {
        id: 'for-loop',
        title: 'Standard For-In Loop',
        intuition: 'We can iterate from 1 to N using a closed range (1...N) and multiply each number by 3.',
        code: `func firstNMultiplesOfThree(_ n: Int) -> [Int] {
    var result: [Int] = []
    for i in 1...n {
        result.append(i * 3)
    }
    return result
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)'
      }
    ],
    commonMistakes: [],
    relatedProblems: ['while-loop-basics']
  },
  {
    id: 'while-loop-basics',
    title: 'While-Loop Basics',
    slug: 'while-loop-basics',
    topicId: 'logic-building',
    difficulty: 'Easy',
    category: 'Logic Building',
    tags: ['loops', 'fundamentals'],
    pattern: 'Conditional Iteration',
    readingTime: 5,
    description: 'Learn how to use while loops for conditions where the number of iterations is unknown.',
    problemStatement: 'Write a function that counts how many digits an integer has by repeatedly dividing it by 10 using a while loop.',
    inputDescription: 'An integer N.',
    outputDescription: 'The number of digits in N.',
    constraints: [
      '-10^9 ≤ N ≤ 10^9'
    ],
    examples: [
      { input: 'N = 3452', output: '4' },
      { input: 'N = 0', output: '1' }
    ],
    approaches: [
      {
        id: 'while-loop',
        title: 'While Loop Division',
        intuition: 'Keep dividing the number by 10 until it reaches 0. Each division represents one digit.',
        code: `func countDigits(_ n: Int) -> Int {
    if n == 0 { return 1 }
    
    var num = abs(n)
    var count = 0
    
    while num > 0 {
        count += 1
        num /= 10
    }
    
    return count
}`,
        timeComplexity: 'O(log₁₀(N))',
        spaceComplexity: 'O(1)'
      }
    ],
    commonMistakes: [],
    relatedProblems: ['for-loop-basics', 'repeat-while-basics']
  },
  {
    id: 'repeat-while-basics',
    title: 'Repeat-While Basics',
    slug: 'repeat-while-basics',
    topicId: 'logic-building',
    difficulty: 'Easy',
    category: 'Logic Building',
    tags: ['loops', 'fundamentals'],
    pattern: 'Post-condition Iteration',
    readingTime: 4,
    description: 'Understand Swift\'s repeat-while loop (do-while in other languages).',
    problemStatement: 'Simulate rolling a 6-sided die until you roll a 6. Return the total number of rolls. Use a repeat-while loop to guarantee at least one roll.',
    inputDescription: 'None (random).',
    outputDescription: 'An integer representing the number of rolls.',
    constraints: [],
    examples: [
      { input: 'random rolls: 3, 2, 5, 6', output: '4' }
    ],
    approaches: [
      {
        id: 'repeat-while',
        title: 'Repeat-While Loop',
        intuition: 'Since we must roll at least once before checking the condition, repeat-while is the perfect tool.',
        code: `func rollUntilSix() -> Int {
    var rolls = 0
    var currentRoll = 0
    
    repeat {
        currentRoll = Int.random(in: 1...6)
        rolls += 1
    } while currentRoll != 6
    
    return rolls
}`,
        timeComplexity: 'O(1) expected',
        spaceComplexity: 'O(1)'
      }
    ],
    commonMistakes: [],
    relatedProblems: ['while-loop-basics']
  },
  {
    id: 'break-continue',
    title: 'Break and Continue',
    slug: 'break-continue',
    topicId: 'logic-building',
    difficulty: 'Easy',
    category: 'Logic Building',
    tags: ['control-flow', 'fundamentals'],
    pattern: 'Loop Control',
    readingTime: 6,
    description: 'Use break to exit loops early and continue to skip iterations.',
    problemStatement: 'Given an array of integers, return the sum of all positive numbers, but if you encounter a 0, stop summing and return the current sum immediately.',
    inputDescription: 'An array of integers.',
    outputDescription: 'The computed sum.',
    constraints: [
      '1 ≤ array.length ≤ 1000'
    ],
    examples: [
      { input: '[1, -2, 3, 0, 5]', output: '4 (1 + 3, stops at 0)' },
      { input: '[-1, -2, -3]', output: '0' }
    ],
    approaches: [
      {
        id: 'break-continue-approach',
        title: 'Using Break and Continue',
        intuition: 'Iterate through the array. Use continue to skip negative numbers, and break to exit the loop upon hitting 0.',
        code: `func sumPositiveUntilZero(_ nums: [Int]) -> Int {
    var sum = 0
    for num in nums {
        if num < 0 {
            continue // Skip negatives
        }
        if num == 0 {
            break // Stop entirely
        }
        sum += num
    }
    return sum
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ],
    commonMistakes: [],
    relatedProblems: ['for-loop-basics']
  },
  {
    id: 'nested-loops',
    title: 'Nested Loops',
    slug: 'nested-loops',
    topicId: 'logic-building',
    difficulty: 'Easy',
    category: 'Logic Building',
    tags: ['loops', 'matrix'],
    pattern: '2D Traversal',
    readingTime: 7,
    description: 'Master nested loops for 2D grids and combinatorics.',
    problemStatement: 'Generate a multiplication table for 1 through N. Return a 2D array where table[i][j] = (i+1) * (j+1).',
    inputDescription: 'An integer N.',
    outputDescription: 'An N x N 2D array.',
    constraints: [
      '1 ≤ N ≤ 20'
    ],
    examples: [
      { input: 'N = 2', output: '[[1, 2], [2, 4]]' }
    ],
    approaches: [
      {
        id: 'nested-for',
        title: 'Nested For Loops',
        intuition: 'Use an outer loop for rows and an inner loop for columns.',
        code: `func generateMultiplicationTable(_ n: Int) -> [[Int]] {
    var table: [[Int]] = []
    
    for i in 1...n {
        var row: [Int] = []
        for j in 1...n {
            row.append(i * j)
        }
        table.append(row)
    }
    
    return table
}`,
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(N²)'
      }
    ],
    commonMistakes: [],
    relatedProblems: ['star-patterns']
  },
  {
    id: 'star-patterns',
    title: 'Star Patterns',
    slug: 'star-patterns',
    topicId: 'logic-building',
    difficulty: 'Medium',
    category: 'Logic Building',
    tags: ['loops', 'patterns'],
    pattern: 'Pattern Printing',
    readingTime: 8,
    description: 'A classic logic building exercise: printing shapes using asterisks.',
    problemStatement: 'Print a right-angled triangle of stars of height N as an array of strings.',
    inputDescription: 'An integer N.',
    outputDescription: 'An array of strings where the i-th string has (i+1) stars.',
    constraints: [
      '1 ≤ N ≤ 50'
    ],
    examples: [
      { input: 'N = 3', output: '["*", "**", "***"]' }
    ],
    approaches: [
      {
        id: 'string-init',
        title: 'String Initialization',
        intuition: 'Swift allows repeating characters easily, but you can also use nested loops to manually build strings to practice logic.',
        code: `func generateTriangle(_ n: Int) -> [String] {
    var triangle: [String] = []
    
    for i in 1...n {
        // Logic building approach with nested loop
        var row = ""
        for _ in 1...i {
            row += "*"
        }
        triangle.append(row)
        
        // Alternatively using Swift's String initializer:
        // triangle.append(String(repeating: "*", count: i))
    }
    
    return triangle
}`,
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(N²)'
      }
    ],
    commonMistakes: [],
    relatedProblems: ['nested-loops']
  },
  {
    id: 'mathematical-series',
    title: 'Mathematical Series',
    slug: 'mathematical-series',
    topicId: 'logic-building',
    difficulty: 'Medium',
    category: 'Logic Building',
    tags: ['math', 'loops'],
    pattern: 'State Tracking',
    readingTime: 8,
    description: 'Generate number sequences based on specific mathematical rules.',
    problemStatement: 'Generate the first N terms of the Fibonacci sequence.',
    inputDescription: 'An integer N > 0.',
    outputDescription: 'An array of the first N Fibonacci numbers.',
    constraints: [
      '1 ≤ N ≤ 50'
    ],
    examples: [
      { input: 'N = 5', output: '[0, 1, 1, 2, 3]' },
      { input: 'N = 1', output: '[0]' }
    ],
    approaches: [
      {
        id: 'iterative-series',
        title: 'Iterative State Tracking',
        intuition: 'Keep track of the last two numbers to compute the next number.',
        code: `func generateFibonacci(_ n: Int) -> [Int] {
    if n == 1 { return [0] }
    
    var series = [0, 1]
    
    for i in 2..<n {
        let next = series[i - 1] + series[i - 2]
        series.append(next)
    }
    
    return series
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)'
      }
    ],
    commonMistakes: [],
    relatedProblems: ['for-loop-basics']
  },
  {
    id: 'mixed-logic',
    title: 'Mixed Logic',
    slug: 'mixed-logic',
    topicId: 'logic-building',
    difficulty: 'Medium',
    category: 'Logic Building',
    tags: ['math', 'loops', 'conditionals'],
    pattern: 'Multi-condition',
    readingTime: 8,
    description: 'Combine loops, conditionals, and math to solve complex problems.',
    problemStatement: 'Write the classic FizzBuzz. Return an array of strings from 1 to N. For multiples of 3, output "Fizz". For multiples of 5, output "Buzz". For multiples of both, output "FizzBuzz". Otherwise, output the number.',
    inputDescription: 'An integer N.',
    outputDescription: 'An array of strings.',
    constraints: [
      '1 ≤ N ≤ 1000'
    ],
    examples: [
      { input: 'N = 5', output: '["1", "2", "Fizz", "4", "Buzz"]' }
    ],
    approaches: [
      {
        id: 'modulo-logic',
        title: 'Modulo Conditionals',
        intuition: 'Use the modulo operator (%) to check for divisibility. Check for the most restrictive condition (divisible by both 3 and 5, or 15) first.',
        code: `func fizzBuzz(_ n: Int) -> [String] {
    var result: [String] = []
    
    for i in 1...n {
        if i % 15 == 0 {
            result.append("FizzBuzz")
        } else if i % 3 == 0 {
            result.append("Fizz")
        } else if i % 5 == 0 {
            result.append("Buzz")
        } else {
            result.append(String(i))
        }
    }
    
    return result
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)'
      }
    ],
    commonMistakes: [],
    relatedProblems: ['for-loop-basics']
  }
];
