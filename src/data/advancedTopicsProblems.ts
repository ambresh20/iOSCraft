import type { DSAProblem } from '../types/dsa';

export const advancedTopicsProblems: DSAProblem[] = [
  {
    id: 'time-complexity-basics',
    title: 'Time Complexity Basics',
    slug: 'time-complexity-basics',
    topicId: 'complexity',
    difficulty: 'Easy',
    category: 'Complexity Analysis',
    tags: ['theory', 'fundamentals'],
    pattern: 'Analysis',
    readingTime: 5,
    description: 'Learn how to analyze basic loops to determine their Big O time complexity.',
    problemStatement: 'Given a nested loop where the outer loop runs N times and the inner loop runs N times, what is the time complexity?',
    inputDescription: 'None. This is a conceptual problem.',
    outputDescription: 'O(N^2)',
    constraints: [],
    examples: [],
    approaches: [
      {
        id: 'nested-loops-analysis',
        title: 'Nested Loop Analysis',
        intuition: 'If an outer loop runs N times, and for each of those iterations an inner loop runs N times, the total operations are N * N.',
        code: `// Conceptual example:
func analyzeLoops(n: Int) {
    for i in 0..<n {
        for j in 0..<n {
            // O(1) operation
            print(i, j)
        }
    }
}`,
        timeComplexity: 'O(N^2)',
        spaceComplexity: 'O(1)'
      }
    ],
    commonMistakes: [],
    relatedProblems: []
  },
  {
    id: 'majority-element',
    title: 'Majority Element',
    slug: 'majority-element',
    topicId: 'array-patterns',
    difficulty: 'Easy',
    category: 'Array Patterns',
    tags: ['arrays', 'counting'],
    pattern: 'Boyer-Moore Voting',
    readingTime: 6,
    description: 'Find the element that appears more than ⌊n / 2⌋ times.',
    problemStatement: 'Given an array nums of size n, return the majority element. You may assume that the majority element always exists in the array.',
    inputDescription: 'An array of integers.',
    outputDescription: 'The majority element.',
    constraints: ['n == nums.length', '1 <= n <= 5 * 10^4'],
    examples: [
      { input: '[3,2,3]', output: '3' },
      { input: '[2,2,1,1,1,2,2]', output: '2' }
    ],
    approaches: [
      {
        id: 'boyer-moore',
        title: 'Boyer-Moore Voting Algorithm',
        intuition: 'Since the majority element appears more than n/2 times, if we increment a counter for the majority element and decrement for others, the count will remain positive.',
        code: `func majorityElement(_ nums: [Int]) -> Int {
    var count = 0
    var candidate = 0
    
    for num in nums {
        if count == 0 {
            candidate = num
        }
        count += (num == candidate) ? 1 : -1
    }
    
    return candidate
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ],
    commonMistakes: ['Trying to use a hash map, which takes O(N) space.'],
    relatedProblems: []
  },
  {
    id: 'longest-palindromic-substring',
    title: 'Longest Palindromic Substring',
    slug: 'longest-palindromic-substring',
    topicId: 'string-patterns',
    difficulty: 'Medium',
    category: 'String Patterns',
    tags: ['strings', 'two-pointers'],
    pattern: 'Expand Around Center',
    readingTime: 8,
    description: 'Find the longest substring which is a palindrome.',
    problemStatement: 'Given a string s, return the longest palindromic substring in s.',
    inputDescription: 'A string s.',
    outputDescription: 'The longest palindromic substring.',
    constraints: ['1 <= s.length <= 1000'],
    examples: [
      { input: 's = "babad"', output: '"bab" or "aba"' }
    ],
    approaches: [
      {
        id: 'expand-center',
        title: 'Expand Around Center',
        intuition: 'A palindrome mirrors around its center. There are 2n-1 such centers (including between characters). We can expand from each center.',
        code: `func longestPalindrome(_ s: String) -> String {
    let chars = Array(s)
    var start = 0
    var end = 0
    
    func expand(left: Int, right: Int) -> Int {
        var l = left, r = right
        while l >= 0 && r < chars.count && chars[l] == chars[r] {
            l -= 1
            r += 1
        }
        return r - l - 1
    }
    
    for i in 0..<chars.count {
        let len1 = expand(left: i, right: i)
        let len2 = expand(left: i, right: i + 1)
        let maxLen = max(len1, len2)
        
        if maxLen > end - start {
            start = i - (maxLen - 1) / 2
            end = i + maxLen / 2
        }
    }
    
    return String(chars[start...end])
}`,
        timeComplexity: 'O(N^2)',
        spaceComplexity: 'O(N) for converting string to array'
      }
    ],
    commonMistakes: [],
    relatedProblems: []
  },
  {
    id: 'kth-largest-element',
    title: 'Kth Largest Element',
    slug: 'kth-largest-element',
    topicId: 'heap',
    difficulty: 'Medium',
    category: 'Heap',
    tags: ['heap', 'sorting'],
    pattern: 'Top K Elements',
    readingTime: 7,
    description: 'Find the kth largest element in an unsorted array.',
    problemStatement: 'Given an integer array nums and an integer k, return the kth largest element in the array.',
    inputDescription: 'Array of integers nums, integer k.',
    outputDescription: 'The kth largest integer.',
    constraints: ['1 <= k <= nums.length <= 10^5'],
    examples: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' }
    ],
    approaches: [
      {
        id: 'sorting',
        title: 'Sorting (Simplest in Swift)',
        intuition: 'Sorting the array in descending order and taking the k-1 index.',
        code: `func findKthLargest(_ nums: [Int], _ k: Int) -> Int {
    let sorted = nums.sorted(by: >)
    return sorted[k - 1]
}`,
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(N) for sorted copy'
      }
    ],
    commonMistakes: [],
    relatedProblems: []
  },
  {
    id: 'implement-trie',
    title: 'Implement Trie',
    slug: 'implement-trie',
    topicId: 'trie',
    difficulty: 'Medium',
    category: 'Trie',
    tags: ['trie', 'design'],
    pattern: 'Prefix Tree',
    readingTime: 10,
    description: 'Implement a Trie (Prefix Tree) with insert, search, and startsWith methods.',
    problemStatement: 'Implement the Trie class to support inserting strings, searching for exact strings, and searching for string prefixes.',
    inputDescription: 'Series of method calls.',
    outputDescription: 'Booleans for search operations.',
    constraints: ['1 <= word.length <= 2000', 'word consists only of lowercase English letters.'],
    examples: [
      { input: 'insert("apple"), search("apple"), search("app")', output: 'null, true, false' }
    ],
    approaches: [
      {
        id: 'trie-dict',
        title: 'Dictionary Based TrieNode',
        intuition: 'Each node contains a dictionary of characters to child nodes, and a boolean indicating if a word ends here.',
        code: `class TrieNode {
    var children: [Character: TrieNode] = [:]
    var isWord: Bool = false
}

class Trie {
    private let root = TrieNode()
    
    func insert(_ word: String) {
        var node = root
        for char in word {
            if node.children[char] == nil {
                node.children[char] = TrieNode()
            }
            node = node.children[char]!
        }
        node.isWord = true
    }
    
    func search(_ word: String) -> Bool {
        var node = root
        for char in word {
            guard let next = node.children[char] else { return false }
            node = next
        }
        return node.isWord
    }
    
    func startsWith(_ prefix: String) -> Bool {
        var node = root
        for char in prefix {
            guard let next = node.children[char] else { return false }
            node = next
        }
        return true
    }
}`,
        timeComplexity: 'O(L) per operation where L is string length',
        spaceComplexity: 'O(N * L) for N words'
      }
    ],
    commonMistakes: [],
    relatedProblems: []
  },
  {
    id: 'jump-game',
    title: 'Jump Game',
    slug: 'jump-game',
    topicId: 'greedy',
    difficulty: 'Medium',
    category: 'Greedy',
    tags: ['greedy', 'arrays'],
    pattern: 'Greedy Choice',
    readingTime: 6,
    description: 'Determine if you can reach the last index of an array.',
    problemStatement: 'You are given an integer array nums. You are initially positioned at the array\'s first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index.',
    inputDescription: 'Array of integers.',
    outputDescription: 'Boolean.',
    constraints: ['1 <= nums.length <= 10^4'],
    examples: [
      { input: 'nums = [2,3,1,1,4]', output: 'true' },
      { input: 'nums = [3,2,1,0,4]', output: 'false' }
    ],
    approaches: [
      {
        id: 'greedy-jump',
        title: 'Track Max Reach',
        intuition: 'Keep track of the furthest index we can reach. If we iterate to an index that is beyond our current reach, we fail. If our reach ever meets or exceeds the last index, we succeed.',
        code: `func canJump(_ nums: [Int]) -> Bool {
    var maxReach = 0
    let lastIndex = nums.count - 1
    
    for i in 0..<nums.count {
        if i > maxReach { return false }
        maxReach = max(maxReach, i + nums[i])
        if maxReach >= lastIndex { return true }
    }
    return true
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ],
    commonMistakes: [],
    relatedProblems: []
  },
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    slug: 'merge-intervals',
    topicId: 'intervals',
    difficulty: 'Medium',
    category: 'Intervals',
    tags: ['arrays', 'sorting'],
    pattern: 'Overlapping Intervals',
    readingTime: 7,
    description: 'Merge all overlapping intervals into one list.',
    problemStatement: 'Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals.',
    inputDescription: 'Array of arrays of integers.',
    outputDescription: 'Merged array of intervals.',
    constraints: ['1 <= intervals.length <= 10^4'],
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' }
    ],
    approaches: [
      {
        id: 'sort-and-merge',
        title: 'Sort by Start Time',
        intuition: 'If we sort by start time, any overlapping intervals will be adjacent. We can build the result by comparing the current interval with the last interval in our result array.',
        code: `func merge(_ intervals: [[Int]]) -> [[Int]] {
    guard intervals.count > 1 else { return intervals }
    
    let sorted = intervals.sorted { $0[0] < $1[0] }
    var merged: [[Int]] = [sorted[0]]
    
    for i in 1..<sorted.count {
        let current = sorted[i]
        let lastMerged = merged.last!
        
        if current[0] <= lastMerged[1] {
            // Overlap exists, update end time
            let newEnd = max(lastMerged[1], current[1])
            merged[merged.count - 1][1] = newEnd
        } else {
            // No overlap
            merged.append(current)
        }
    }
    
    return merged
}`,
        timeComplexity: 'O(N log N) for sorting',
        spaceComplexity: 'O(N) for sorting space/result'
      }
    ],
    commonMistakes: [],
    relatedProblems: []
  },
  {
    id: 'spiral-matrix',
    title: 'Spiral Matrix',
    slug: 'spiral-matrix',
    topicId: 'matrix',
    difficulty: 'Medium',
    category: 'Matrix',
    tags: ['matrix', 'simulation'],
    pattern: 'Matrix Traversal',
    readingTime: 8,
    description: 'Return all elements of a matrix in spiral order.',
    problemStatement: 'Given an m x n matrix, return all elements of the matrix in spiral order.',
    inputDescription: 'An m x n matrix.',
    outputDescription: '1D array of integers.',
    constraints: ['1 <= m, n <= 10'],
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]' }
    ],
    approaches: [
      {
        id: 'boundary-simulation',
        title: 'Boundary Shrinking Simulation',
        intuition: 'Keep track of top, bottom, left, and right boundaries. Traverse each boundary and shrink it inwards.',
        code: `func spiralOrder(_ matrix: [[Int]]) -> [Int] {
    var result = [Int]()
    guard !matrix.isEmpty else { return result }
    
    var top = 0
    var bottom = matrix.count - 1
    var left = 0
    var right = matrix[0].count - 1
    
    while top <= bottom && left <= right {
        // Traverse Right
        for j in left...right { result.append(matrix[top][j]) }
        top += 1
        
        // Traverse Down
        if top <= bottom {
            for i in top...bottom { result.append(matrix[i][right]) }
            right -= 1
        }
        
        // Traverse Left
        if top <= bottom && left <= right {
            for j in stride(from: right, through: left, by: -1) { result.append(matrix[bottom][j]) }
            bottom -= 1
        }
        
        // Traverse Up
        if top <= bottom && left <= right {
            for i in stride(from: bottom, through: top, by: -1) { result.append(matrix[i][left]) }
            left += 1
        }
    }
    
    return result
}`,
        timeComplexity: 'O(M * N)',
        spaceComplexity: 'O(1) excluding output array'
      }
    ],
    commonMistakes: [],
    relatedProblems: []
  },
  {
    id: 'single-number',
    title: 'Single Number',
    slug: 'single-number',
    topicId: 'bit-manipulation',
    difficulty: 'Easy',
    category: 'Bit Manipulation',
    tags: ['bitwise', 'math'],
    pattern: 'XOR',
    readingTime: 4,
    description: 'Find the single non-duplicate number using XOR.',
    problemStatement: 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.',
    inputDescription: 'Array of integers.',
    outputDescription: 'Integer.',
    constraints: ['1 <= nums.length <= 3 * 10^4'],
    examples: [
      { input: 'nums = [4,1,2,1,2]', output: '4' }
    ],
    approaches: [
      {
        id: 'xor-magic',
        title: 'XOR Operation',
        intuition: 'XORing a number with itself results in 0 (a ^ a = 0). XORing a number with 0 results in the number (a ^ 0 = a). XOR is commutative and associative. Therefore, XORing all numbers will cancel out all duplicates and leave the single number.',
        code: `func singleNumber(_ nums: [Int]) -> Int {
    var result = 0
    for num in nums {
        result ^= num
    }
    return result
}`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)'
      }
    ],
    commonMistakes: [],
    relatedProblems: []
  }
];
