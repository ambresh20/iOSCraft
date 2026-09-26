import type { DSAProblem } from '../types/dsa';

export const dsaProblems: DSAProblem[] = [
  {
    id: 'dsa-001',
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    category: 'Arrays',
    tags: ['array', 'hash-map'],
    readingTime: 8,
    description: 'Find two numbers in an array that add up to a target sum.',
    problemStatement: 'Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    inputDescription: 'An array of integers nums and an integer target.',
    outputDescription: 'Return the indices of the two numbers that add up to target.',
    constraints: [
      '2 ≤ nums.length ≤ 10⁴',
      '-10⁹ ≤ nums[i] ≤ 10⁹',
      '-10⁹ ≤ target ≤ 10⁹',
      'Only one valid answer exists.',
    ],
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'nums[1] + nums[2] = 2 + 4 = 6' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]' },
    ],
    approaches: [
      {
        title: 'Brute Force',
        description: 'Check every pair of elements in the array.',
        code: `func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
    for i in 0..<nums.count {
        for j in (i + 1)..<nums.count {
            if nums[i] + nums[j] == target {
                return [i, j]
            }
        }
    }
    return [] // No solution found (per constraints, always has one)
}`,
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
      },
      {
        title: 'Hash Map (Optimal)',
        description: 'Use a dictionary to store each number\'s index. For each element, check if its complement (target - current) already exists in the dictionary.',
        code: `func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
    // Key: number value, Value: index in array
    var seen: [Int: Int] = [:]
    
    for (index, num) in nums.enumerated() {
        let complement = target - num
        
        if let complementIndex = seen[complement] {
            return [complementIndex, index]
        }
        
        seen[num] = index
    }
    
    return [] // Per constraints, always has a solution
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
    ],
    commonMistakes: [
      'Using the same element twice (check that indices are different).',
      'Returning values instead of indices.',
      'Not handling the case where the complement equals the current number (e.g., [3,3], target=6).',
    ],
    relatedProblems: ['three-sum', 'contains-duplicate', 'two-sum-ii'],
    publishedAt: '2024-01-10',
  },
  {
    id: 'dsa-002',
    title: 'Contains Duplicate',
    slug: 'contains-duplicate',
    difficulty: 'Easy',
    category: 'Arrays',
    tags: ['array', 'hash-set'],
    readingTime: 5,
    description: 'Determine if any value appears at least twice in an array.',
    problemStatement: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    inputDescription: 'An array of integers nums.',
    outputDescription: 'Return true if any element appears more than once, false otherwise.',
    constraints: [
      '1 ≤ nums.length ≤ 10⁵',
      '-10⁹ ≤ nums[i] ≤ 10⁹',
    ],
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true', explanation: '1 appears twice at indices 0 and 3.' },
      { input: 'nums = [1,2,3,4]', output: 'false', explanation: 'All elements are distinct.' },
      { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', output: 'true' },
    ],
    approaches: [
      {
        title: 'Sorting',
        description: 'Sort the array and check adjacent elements.',
        code: `func containsDuplicate(_ nums: [Int]) -> Bool {
    let sorted = nums.sorted()
    for i in 1..<sorted.count {
        if sorted[i] == sorted[i - 1] {
            return true
        }
    }
    return false
}`,
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(1) or O(n) depending on sort implementation',
      },
      {
        title: 'Hash Set (Optimal)',
        description: 'Use a Set to track seen numbers. A Set lookup is O(1) average.',
        code: `func containsDuplicate(_ nums: [Int]) -> Bool {
    var seen = Set<Int>()
    
    for num in nums {
        if seen.contains(num) {
            return true
        }
        seen.insert(num)
    }
    
    return false
}

// One-liner using Set property
func containsDuplicateOneliner(_ nums: [Int]) -> Bool {
    return Set(nums).count != nums.count
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
    ],
    commonMistakes: [
      'Using the one-liner without understanding it iterates the whole array.',
      'Forgetting that Swift\'s Set does not allow duplicates by definition.',
    ],
    relatedProblems: ['two-sum', 'valid-anagram', 'missing-number'],
    publishedAt: '2024-01-11',
  },
  {
    id: 'dsa-003',
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    difficulty: 'Easy',
    category: 'Strings',
    tags: ['string', 'hash-map', 'sorting'],
    readingTime: 6,
    description: 'Determine if two strings are anagrams of each other.',
    problemStatement: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram is a word or phrase formed by rearranging the letters of another, using all the original letters exactly once.',
    inputDescription: 'Two strings s and t.',
    outputDescription: 'Return true if t is an anagram of s, false otherwise.',
    constraints: [
      '1 ≤ s.length, t.length ≤ 5 × 10⁴',
      's and t consist of lowercase English letters.',
    ],
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' },
    ],
    approaches: [
      {
        title: 'Sorting',
        description: 'Sort both strings and compare. Anagrams will have identical sorted characters.',
        code: `func isAnagram(_ s: String, _ t: String) -> Bool {
    return s.sorted() == t.sorted()
}`,
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
      },
      {
        title: 'Character Frequency Map (Optimal)',
        description: 'Count character frequencies in both strings and compare.',
        code: `func isAnagram(_ s: String, _ t: String) -> Bool {
    guard s.count == t.count else { return false }
    
    var charCount: [Character: Int] = [:]
    
    // Increment for s, decrement for t
    for (charS, charT) in zip(s, t) {
        charCount[charS, default: 0] += 1
        charCount[charT, default: 0] -= 1
    }
    
    // All counts should be zero for a valid anagram
    return charCount.values.allSatisfy { $0 == 0 }
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1) — at most 26 lowercase letters',
      },
    ],
    commonMistakes: [
      'Forgetting to check that lengths are equal first (quick early exit).',
      'Not handling Unicode characters if the problem extends to all characters.',
    ],
    relatedProblems: ['contains-duplicate', 'group-anagrams'],
    publishedAt: '2024-01-12',
  },
  {
    id: 'dsa-004',
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
    difficulty: 'Easy',
    category: 'Arrays',
    tags: ['array', 'sliding-window', 'greedy'],
    readingTime: 7,
    description: 'Find the maximum profit from a single buy and sell of stock.',
    problemStatement: 'You are given an array prices where prices[i] is the price of a given stock on the i-th day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    inputDescription: 'An array of integers prices.',
    outputDescription: 'Return the maximum profit from a single buy-sell transaction.',
    constraints: [
      '1 ≤ prices.length ≤ 10⁵',
      '0 ≤ prices[i] ≤ 10⁴',
    ],
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price=1), sell on day 5 (price=6). Profit = 6-1 = 5.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'Prices decline every day; no profitable transaction possible.' },
    ],
    approaches: [
      {
        title: 'Brute Force',
        description: 'Try every pair of buy/sell days.',
        code: `func maxProfit(_ prices: [Int]) -> Int {
    var maxProfit = 0
    
    for i in 0..<prices.count {
        for j in (i + 1)..<prices.count {
            maxProfit = max(maxProfit, prices[j] - prices[i])
        }
    }
    
    return maxProfit
}`,
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
      },
      {
        title: 'One Pass — Track Minimum (Optimal)',
        description: 'Track the minimum price seen so far and compute potential profit at each step.',
        code: `func maxProfit(_ prices: [Int]) -> Int {
    var minPrice = Int.max
    var maxProfit = 0
    
    for price in prices {
        if price < minPrice {
            minPrice = price          // Found a better buy day
        } else {
            let profit = price - minPrice
            maxProfit = max(maxProfit, profit)  // Check if selling today is better
        }
    }
    
    return maxProfit
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    ],
    commonMistakes: [
      'Allowing selling before buying (j must be greater than i).',
      'Not initializing minPrice to Int.max or prices[0].',
      'Forgetting to return 0 when no profit is possible.',
    ],
    relatedProblems: ['two-sum', 'maximum-subarray'],
    publishedAt: '2024-01-13',
  },
  {
    id: 'dsa-005',
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'Easy',
    category: 'Stacks & Queues',
    tags: ['stack', 'string'],
    readingTime: 6,
    description: 'Determine if a string of brackets is valid.',
    problemStatement: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. An input string is valid if: Open brackets are closed by the same type of bracket, and open brackets are closed in the correct order.',
    inputDescription: 'A string s containing bracket characters.',
    outputDescription: 'Return true if the string is valid, false otherwise.',
    constraints: [
      '1 ≤ s.length ≤ 10⁴',
      's consists of parentheses only.',
    ],
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
      { input: 's = "([)]"', output: 'false' },
      { input: 's = "{[]}"', output: 'true' },
    ],
    approaches: [
      {
        title: 'Stack',
        description: 'Use a stack to track unmatched opening brackets. For each closing bracket, check if it matches the top of the stack.',
        code: `func isValid(_ s: String) -> Bool {
    var stack: [Character] = []
    
    let matchingBracket: [Character: Character] = [
        ")": "(",
        "]": "[",
        "}": "{"
    ]
    
    for char in s {
        if char == "(" || char == "[" || char == "{" {
            stack.append(char)
        } else {
            // Closing bracket
            guard let top = stack.last,
                  top == matchingBracket[char] else {
                return false
            }
            stack.removeLast()
        }
    }
    
    return stack.isEmpty  // Stack must be empty — all opened brackets were closed
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
    ],
    commonMistakes: [
      'Forgetting to check that the stack is empty at the end.',
      'Not handling the case where the stack is empty when a closing bracket is encountered.',
    ],
    relatedProblems: ['minimum-stack', 'generate-parentheses'],
    publishedAt: '2024-01-14',
  },
  {
    id: 'dsa-006',
    title: 'Binary Search',
    slug: 'binary-search',
    difficulty: 'Easy',
    category: 'Binary Search',
    tags: ['binary-search', 'array'],
    readingTime: 7,
    description: 'Search for a target value in a sorted array.',
    problemStatement: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.',
    inputDescription: 'A sorted array of integers nums and an integer target.',
    outputDescription: 'Return the index of target, or -1 if not found.',
    constraints: [
      '1 ≤ nums.length ≤ 10⁴',
      '-10⁴ < nums[i], target < 10⁴',
      'All the integers in nums are unique.',
      'nums is sorted in ascending order.',
    ],
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists at index 4.' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist.' },
    ],
    approaches: [
      {
        title: 'Binary Search (Iterative)',
        description: 'Maintain left and right pointers. On each step, compute the middle and eliminate half the search space.',
        code: `func search(_ nums: [Int], _ target: Int) -> Int {
    var left = 0
    var right = nums.count - 1
    
    while left <= right {
        // Use this to avoid integer overflow
        let mid = left + (right - left) / 2
        
        if nums[mid] == target {
            return mid
        } else if nums[mid] < target {
            left = mid + 1   // Target is in right half
        } else {
            right = mid - 1  // Target is in left half
        }
    }
    
    return -1  // Target not found
}`,
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
      },
      {
        title: 'Binary Search (Recursive)',
        description: 'Recursive implementation of binary search.',
        code: `func search(_ nums: [Int], _ target: Int) -> Int {
    return binarySearch(nums, target, left: 0, right: nums.count - 1)
}

func binarySearch(_ nums: [Int], _ target: Int, left: Int, right: Int) -> Int {
    guard left <= right else { return -1 }
    
    let mid = left + (right - left) / 2
    
    if nums[mid] == target {
        return mid
    } else if nums[mid] < target {
        return binarySearch(nums, target, left: mid + 1, right: right)
    } else {
        return binarySearch(nums, target, left: left, right: mid - 1)
    }
}`,
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(log n) — recursive call stack',
      },
    ],
    commonMistakes: [
      'Using (left + right) / 2 instead of left + (right - left) / 2 — can overflow for large arrays.',
      'Using left < right instead of left <= right — misses when target is the last remaining element.',
      'Off-by-one errors in left = mid + 1 vs left = mid.',
    ],
    relatedProblems: ['search-in-rotated-sorted-array', 'find-minimum-in-rotated-array'],
    publishedAt: '2024-01-15',
  },
  {
    id: 'dsa-007',
    title: 'Three Sum',
    slug: 'three-sum',
    difficulty: 'Medium',
    category: 'Arrays',
    tags: ['array', 'two-pointers', 'sorting'],
    readingTime: 10,
    description: 'Find all unique triplets in an array that sum to zero.',
    problemStatement: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, j != k, and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets.',
    inputDescription: 'An array of integers nums.',
    outputDescription: 'Return all unique triplets that sum to zero.',
    constraints: [
      '3 ≤ nums.length ≤ 3000',
      '-10⁵ ≤ nums[i] ≤ 10⁵',
    ],
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
      { input: 'nums = [0,1,1]', output: '[]' },
      { input: 'nums = [0,0,0]', output: '[[0,0,0]]' },
    ],
    approaches: [
      {
        title: 'Brute Force',
        description: 'Check all possible triplets — three nested loops.',
        code: `func threeSum(_ nums: [Int]) -> [[Int]] {
    var result: Set<[Int]> = []
    
    for i in 0..<nums.count {
        for j in (i+1)..<nums.count {
            for k in (j+1)..<nums.count {
                if nums[i] + nums[j] + nums[k] == 0 {
                    result.insert([nums[i], nums[j], nums[k]].sorted())
                }
            }
        }
    }
    
    return Array(result)
}`,
        timeComplexity: 'O(n³)',
        spaceComplexity: 'O(n) for result set',
      },
      {
        title: 'Sort + Two Pointers (Optimal)',
        description: 'Sort the array, fix one element, then use two pointers to find pairs that sum to its negation.',
        code: `func threeSum(_ nums: [Int]) -> [[Int]] {
    let sorted = nums.sorted()
    var result: [[Int]] = []
    
    for i in 0..<sorted.count - 2 {
        // Skip duplicate values for the fixed element
        if i > 0 && sorted[i] == sorted[i - 1] { continue }
        
        // Optimization: if smallest three elements > 0, no solution possible
        if sorted[i] > 0 { break }
        
        var left = i + 1
        var right = sorted.count - 1
        
        while left < right {
            let sum = sorted[i] + sorted[left] + sorted[right]
            
            if sum == 0 {
                result.append([sorted[i], sorted[left], sorted[right]])
                
                // Skip duplicates
                while left < right && sorted[left] == sorted[left + 1] { left += 1 }
                while left < right && sorted[right] == sorted[right - 1] { right -= 1 }
                
                left += 1
                right -= 1
            } else if sum < 0 {
                left += 1
            } else {
                right -= 1
            }
        }
    }
    
    return result
}`,
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(n) for the sorted array and result',
      },
    ],
    commonMistakes: [
      'Not handling duplicate triplets in the result.',
      'Forgetting to skip duplicate values for the outer pointer.',
      'Incorrect two-pointer convergence when duplicates are adjacent.',
    ],
    relatedProblems: ['two-sum', 'container-with-most-water', 'four-sum'],
    publishedAt: '2024-01-16',
  },
  {
    id: 'dsa-008',
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    difficulty: 'Medium',
    category: 'Linked Lists',
    tags: ['linked-list', 'recursion', 'iteration'],
    readingTime: 8,
    description: 'Reverse a singly linked list.',
    problemStatement: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    inputDescription: 'The head of a singly linked list.',
    outputDescription: 'Return the head of the reversed linked list.',
    constraints: [
      '0 ≤ number of nodes ≤ 5000',
      '-5000 ≤ Node.val ≤ 5000',
    ],
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' },
      { input: 'head = []', output: '[]' },
    ],
    approaches: [
      {
        title: 'Iterative',
        description: 'Traverse the list, reversing each pointer as you go.',
        code: `class ListNode {
    var val: Int
    var next: ListNode?
    init(_ val: Int) { self.val = val }
}

func reverseList(_ head: ListNode?) -> ListNode? {
    var prev: ListNode? = nil
    var current = head
    
    while current != nil {
        let nextNode = current?.next  // Save next node
        current?.next = prev          // Reverse the pointer
        prev = current                // Move prev forward
        current = nextNode            // Move current forward
    }
    
    return prev  // prev is now the new head
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      {
        title: 'Recursive',
        description: 'Recursively reverse the rest of the list and fix the pointer.',
        code: `func reverseListRecursive(_ head: ListNode?) -> ListNode? {
    // Base case: empty or single node
    guard let head = head, head.next != nil else {
        return head
    }
    
    // Recursively reverse the rest
    let newHead = reverseListRecursive(head.next)
    
    // head.next still points to the node after head (now last in reversed sublist)
    head.next?.next = head  // Make that node point back to head
    head.next = nil         // head is now the tail
    
    return newHead
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n) — recursive call stack',
      },
    ],
    commonMistakes: [
      'Losing the reference to the next node before reversing the pointer.',
      'Forgetting to set head.next = nil in the recursive approach, causing a cycle.',
      'Returning current instead of prev in the iterative approach.',
    ],
    relatedProblems: ['merge-two-sorted-lists', 'palindrome-linked-list'],
    publishedAt: '2024-01-17',
  },
  {
    id: 'dsa-009',
    title: 'Number of Islands',
    slug: 'number-of-islands',
    difficulty: 'Medium',
    category: 'Graphs',
    tags: ['graph', 'dfs', 'bfs', 'matrix'],
    readingTime: 10,
    description: 'Count the number of islands in a 2D grid.',
    problemStatement: 'Given an m x n 2D binary grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
    inputDescription: 'A 2D grid of \'1\' and \'0\' characters.',
    outputDescription: 'Return the number of islands.',
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 ≤ m, n ≤ 300',
      'grid[i][j] is \'0\' or \'1\'.',
    ],
    examples: [
      {
        input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: '1',
      },
      {
        input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        output: '3',
      },
    ],
    approaches: [
      {
        title: 'DFS (Depth-First Search)',
        description: 'When we find a \'1\', start a DFS to mark all connected land as visited, then increment count.',
        code: `func numIslands(_ grid: [[Character]]) -> Int {
    var grid = grid  // Make mutable copy
    var count = 0
    
    for row in 0..<grid.count {
        for col in 0..<grid[row].count {
            if grid[row][col] == "1" {
                count += 1
                dfs(&grid, row: row, col: col)
            }
        }
    }
    
    return count
}

func dfs(_ grid: inout [[Character]], row: Int, col: Int) {
    // Bounds check and water/visited check
    guard row >= 0, row < grid.count,
          col >= 0, col < grid[row].count,
          grid[row][col] == "1" else {
        return
    }
    
    grid[row][col] = "0"  // Mark as visited
    
    // Explore all 4 directions
    dfs(&grid, row: row - 1, col: col)
    dfs(&grid, row: row + 1, col: col)
    dfs(&grid, row: row, col: col - 1)
    dfs(&grid, row: row, col: col + 1)
}`,
        timeComplexity: 'O(m × n)',
        spaceComplexity: 'O(m × n) — recursion stack in worst case',
      },
    ],
    commonMistakes: [
      'Not marking cells as visited, causing infinite recursion.',
      'Only checking horizontal or only vertical neighbors — you need all 4 directions.',
      'Modifying the original grid — create a mutable copy or use a separate visited set.',
    ],
    relatedProblems: ['max-area-of-island', 'surrounded-regions', 'word-search'],
    publishedAt: '2024-01-18',
  },
  {
    id: 'dsa-010',
    title: 'Trapping Rain Water',
    slug: 'trapping-rain-water',
    difficulty: 'Hard',
    category: 'Arrays',
    tags: ['array', 'two-pointers', 'dynamic-programming', 'stack'],
    readingTime: 14,
    description: 'Calculate how much rainwater can be trapped between elevation bars.',
    problemStatement: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    inputDescription: 'An array of non-negative integers height.',
    outputDescription: 'Return the total amount of water that can be trapped.',
    constraints: [
      'n == height.length',
      '1 ≤ n ≤ 2 × 10⁴',
      '0 ≤ height[i] ≤ 10⁵',
    ],
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
      { input: 'height = [4,2,0,3,2,5]', output: '9' },
    ],
    approaches: [
      {
        title: 'Brute Force',
        description: 'For each position, find the max height to its left and right. Water trapped = min(leftMax, rightMax) - height[i].',
        code: `func trap(_ height: [Int]) -> Int {
    var total = 0
    let n = height.count
    
    for i in 0..<n {
        let leftMax = height[0...i].max()!
        let rightMax = height[i...].max()!
        total += min(leftMax, rightMax) - height[i]
    }
    
    return total
}`,
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
      },
      {
        title: 'Precomputed Arrays',
        description: 'Precompute maxLeft and maxRight arrays in O(n), then calculate trapped water.',
        code: `func trap(_ height: [Int]) -> Int {
    let n = height.count
    var leftMax = [Int](repeating: 0, count: n)
    var rightMax = [Int](repeating: 0, count: n)
    
    // Fill leftMax
    leftMax[0] = height[0]
    for i in 1..<n {
        leftMax[i] = max(leftMax[i - 1], height[i])
    }
    
    // Fill rightMax
    rightMax[n - 1] = height[n - 1]
    for i in stride(from: n - 2, through: 0, by: -1) {
        rightMax[i] = max(rightMax[i + 1], height[i])
    }
    
    // Calculate trapped water
    var total = 0
    for i in 0..<n {
        total += min(leftMax[i], rightMax[i]) - height[i]
    }
    
    return total
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
      {
        title: 'Two Pointers (Optimal)',
        description: 'Use two pointers to avoid extra space by tracking max heights on the fly.',
        code: `func trap(_ height: [Int]) -> Int {
    var left = 0
    var right = height.count - 1
    var leftMax = 0
    var rightMax = 0
    var total = 0
    
    while left < right {
        if height[left] < height[right] {
            if height[left] >= leftMax {
                leftMax = height[left]
            } else {
                total += leftMax - height[left]
            }
            left += 1
        } else {
            if height[right] >= rightMax {
                rightMax = height[right]
            } else {
                total += rightMax - height[right]
            }
            right -= 1
        }
    }
    
    return total
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    ],
    commonMistakes: [
      'Using the wrong formula — it\'s min(leftMax, rightMax) - height[i], not max.',
      'Not initializing leftMax and rightMax correctly.',
      'Off-by-one errors in the two-pointer bounds.',
    ],
    relatedProblems: ['container-with-most-water', 'largest-rectangle-in-histogram'],
    publishedAt: '2024-01-19',
  },
];

export const dsaCategories = [
  'All',
  'Arrays',
  'Strings',
  'Hash Maps & Sets',
  'Two Pointers',
  'Sliding Window',
  'Binary Search',
  'Sorting Algorithms',
  'Recursion & Backtracking',
  'Linked Lists',
  'Stacks & Queues',
  'Trees & BSTs',
  'Heaps',
  'Graphs',
  'Dynamic Programming',
  'Greedy Algorithms',
  'Bit Manipulation',
];

export function getDSAProblem(slug: string): DSAProblem | undefined {
  return dsaProblems.find(p => p.slug === slug);
}

export function getProblemsByCategory(category: string): DSAProblem[] {
  if (category === 'All') return dsaProblems;
  return dsaProblems.filter(p => p.category === category);
}

export function getProblemsByDifficulty(difficulty: string): DSAProblem[] {
  if (difficulty === 'all') return dsaProblems;
  return dsaProblems.filter(p => p.difficulty === difficulty);
}
