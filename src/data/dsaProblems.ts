import type { DSAProblem } from '../types/dsa';

// ============================================================
// DSA PROBLEMS — Swift implementations with full approach detail
// ============================================================

export const dsaProblems: DSAProblem[] = [
  // ─── ARRAYS ──────────────────────────────────────────────
  {
    id: 'two-sum',
    title: 'Two Sum',
    slug: 'two-sum',
    topicId: 'arrays',
    topicIds: ['arrays', 'hashing'],
    difficulty: 'Easy',
    category: 'Arrays',
    tags: ['array', 'hash-map'],
    pattern: 'Hashing',
    readingTime: 8,
    description: 'Find two numbers in an array that add up to a target sum.',
    problemStatement: 'Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    inputDescription: 'An array of integers nums and an integer target.',
    outputDescription: 'Return the indices of the two numbers that add up to target.',
    constraints: [
      '2 ≤ nums.length ≤ 10⁴',
      '-10⁹ ≤ nums[i] ≤ 10⁹',
      '-10⁹ ≤ target ≤ 10⁹',
      'Only one valid answer exists.',
    ],
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9, so we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'nums[1] + nums[2] = 2 + 4 = 6.' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]', explanation: 'Both 3s at index 0 and 1 sum to 6.' },
    ],
    keyObservations: [
      'For each number x, we need to find (target - x) in the array.',
      'A hash map lets us check if the complement exists in O(1).',
      'We must store the index (not just the value) to return the answer.',
    ],
    approaches: [
      {
        id: 'brute-force',
        title: 'Brute Force',
        intuition: 'Check every possible pair of indices (i, j) where i < j. If nums[i] + nums[j] equals the target, return those indices.',
        algorithm: [
          'Iterate with outer index i from 0 to n-1.',
          'Iterate with inner index j from i+1 to n-1.',
          'If nums[i] + nums[j] == target, return [i, j].',
          'Per constraints, a solution always exists.',
        ],
        code: `func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
    for i in 0..<nums.count {
        for j in (i + 1)..<nums.count {
            if nums[i] + nums[j] == target {
                return [i, j]
            }
        }
    }
    return [] // Guaranteed to find a solution per constraints
}`,
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        complexityExplanation: 'Two nested loops over n elements give O(n²). No extra space is used.',
        limitations: ['Too slow for large inputs (n = 10⁴ means ~50 million operations).'],
      },
      {
        id: 'hash-map',
        title: 'Hash Map (Optimal)',
        intuition: 'As we iterate, store each number\'s index in a dictionary. For the current number, check if its complement (target - current) was already seen. This converts the inner loop into a O(1) dictionary lookup.',
        algorithm: [
          'Initialize an empty dictionary `seen: [Int: Int]`.',
          'Enumerate nums with index and value.',
          'Compute complement = target - num.',
          'If complement exists in `seen`, return [seen[complement]!, index].',
          'Otherwise, store seen[num] = index and continue.',
        ],
        code: `func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
    // Key: number value, Value: index in the array
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
        complexityExplanation: 'Single pass through n elements. The dictionary stores up to n entries.',
      },
    ],
    edgeCases: [
      'Same element used twice: the problem says you cannot use the same element twice, but identical values at different indices are fine (e.g., [3,3], target=6).',
      'Negative numbers: the hash map approach handles negatives correctly.',
    ],
    commonMistakes: [
      'Returning values instead of indices.',
      'Allowing the same index to be used twice when checking the complement.',
      'Using sorted() before hashing — this invalidates the original indices.',
    ],
    relatedProblems: ['three-sum', 'contains-duplicate', 'two-sum-ii'],
    sourceUrl: 'https://leetcode.com/problems/two-sum/',
    publishedAt: '2024-01-10',
  },

  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    slug: 'contains-duplicate',
    topicId: 'arrays',
    topicIds: ['arrays', 'hashing'],
    difficulty: 'Easy',
    category: 'Arrays',
    tags: ['array', 'hash-set'],
    pattern: 'Hashing',
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
      { input: 'nums = [1,2,3,1]', output: 'true', explanation: '1 appears at index 0 and 3.' },
      { input: 'nums = [1,2,3,4]', output: 'false', explanation: 'All elements are distinct.' },
      { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', output: 'true' },
    ],
    keyObservations: [
      'We just need to detect the first duplicate — we don\'t need to find all of them.',
      'A Set automatically rejects duplicates, making it perfect here.',
    ],
    approaches: [
      {
        id: 'sorting',
        title: 'Sorting',
        intuition: 'If we sort the array, any duplicates must be adjacent. A single pass then finds them.',
        algorithm: [
          'Sort the array.',
          'Iterate from index 1 to n-1.',
          'If sorted[i] == sorted[i-1], return true.',
          'Return false after the loop.',
        ],
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
        spaceComplexity: 'O(n)',
        complexityExplanation: 'Sorting takes O(n log n). Swift\'s sort creates a new array so O(n) space.',
        limitations: ['Sorting is unnecessary overhead when we only need to detect a duplicate.'],
      },
      {
        id: 'hash-set',
        title: 'Hash Set (Optimal)',
        intuition: 'Insert each number into a Set. If insertion fails (the number already exists), we found a duplicate.',
        algorithm: [
          'Initialize an empty Set<Int>.',
          'For each number in nums: if the set contains it, return true; otherwise insert it.',
          'Return false if no duplicates are found.',
        ],
        code: `func containsDuplicate(_ nums: [Int]) -> Bool {
    var seen = Set<Int>()
    
    for num in nums {
        if seen.contains(num) {
            return true  // Found a duplicate — early exit
        }
        seen.insert(num)
    }
    
    return false
}

// Concise one-liner (less efficient — processes entire array)
func containsDuplicateConcise(_ nums: [Int]) -> Bool {
    return Set(nums).count != nums.count
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        complexityExplanation: 'Single pass with O(1) average-case set operations. Up to O(n) elements in the set.',
      },
    ],
    edgeCases: [
      'Single element array: always returns false.',
      'All elements identical: returns true on the second element.',
    ],
    commonMistakes: [
      'Using the one-liner without understanding it scans the whole array — no early exit.',
      'Comparing to n-1 instead of n in the set size check.',
    ],
    relatedProblems: ['two-sum', 'valid-anagram', 'group-anagrams'],
    sourceUrl: 'https://leetcode.com/problems/contains-duplicate/',
    publishedAt: '2024-01-11',
  },

  {
    id: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
    topicId: 'arrays',
    topicIds: ['arrays', 'sliding-window'],
    difficulty: 'Easy',
    category: 'Arrays',
    tags: ['array', 'sliding-window', 'greedy'],
    pattern: 'Sliding Window / Greedy',
    readingTime: 7,
    description: 'Find the maximum profit from a single buy and sell of stock.',
    problemStatement: 'You are given an array prices where prices[i] is the price of a given stock on the i-th day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve. If you cannot achieve any profit, return 0.',
    inputDescription: 'An array of integers prices representing stock prices per day.',
    outputDescription: 'The maximum profit from one buy-sell transaction (0 if no profit is possible).',
    constraints: [
      '1 ≤ prices.length ≤ 10⁵',
      '0 ≤ prices[i] ≤ 10⁴',
    ],
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price=1), sell on day 5 (price=6). Profit = 6-1 = 5.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'Prices decline every day; no profitable transaction exists.' },
    ],
    keyObservations: [
      'We must buy before we sell, so we need min price on the left and max price on the right.',
      'We can scan left-to-right, tracking the minimum price seen so far and computing profit at each step.',
    ],
    approaches: [
      {
        id: 'brute-force',
        title: 'Brute Force',
        intuition: 'Try every possible buy/sell pair and track the maximum profit.',
        algorithm: ['Try all pairs (i, j) where i < j.', 'Track max of prices[j] - prices[i].'],
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
        limitations: ['Too slow for n = 10⁵.'],
      },
      {
        id: 'one-pass-greedy',
        title: 'One Pass — Track Minimum Price (Optimal)',
        intuition: 'As we scan left-to-right, we greedily track the lowest price seen so far. At each price, if it\'s lower than our buy day, we update. Otherwise we check if selling today beats our best profit.',
        algorithm: [
          'Initialize minPrice = Int.max, maxProfit = 0.',
          'For each price in prices:',
          '  If price < minPrice, update minPrice.',
          '  Else update maxProfit = max(maxProfit, price - minPrice).',
          'Return maxProfit.',
        ],
        code: `func maxProfit(_ prices: [Int]) -> Int {
    var minPrice = Int.max
    var maxProfit = 0
    
    for price in prices {
        if price < minPrice {
            minPrice = price          // Found a better buy day
        } else {
            let profit = price - minPrice
            maxProfit = max(maxProfit, profit) // Check if selling today is better
        }
    }
    
    return maxProfit
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        complexityExplanation: 'Single linear scan. Two variables only.',
      },
    ],
    edgeCases: [
      'Monotonically decreasing prices: returns 0 correctly.',
      'Single element: no valid transaction, returns 0.',
    ],
    commonMistakes: [
      'Allowing selling before buying.',
      'Initializing minPrice to prices[0] without handling empty arrays.',
      'Forgetting to return 0 when all prices decline.',
    ],
    relatedProblems: ['maximum-subarray', 'two-sum'],
    sourceUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    publishedAt: '2024-01-13',
  },

  {
    id: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    slug: 'product-of-array-except-self',
    topicId: 'arrays',
    difficulty: 'Medium',
    category: 'Arrays',
    tags: ['array', 'prefix-product'],
    pattern: 'Prefix / Suffix',
    readingTime: 10,
    description: 'Return an array where each element is the product of all other elements.',
    problemStatement: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. You must solve it without using the division operator and in O(n) time.',
    inputDescription: 'An integer array nums.',
    outputDescription: 'An array where answer[i] equals the product of all nums except nums[i].',
    constraints: [
      '2 ≤ nums.length ≤ 10⁵',
      '-30 ≤ nums[i] ≤ 30',
      'The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.',
    ],
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]', explanation: 'answer[0]=2*3*4=24, answer[1]=1*3*4=12, etc.' },
      { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]' },
    ],
    keyObservations: [
      'answer[i] = product of all elements to the left of i × product of all elements to the right of i.',
      'We can compute prefix and suffix products in two passes without division.',
    ],
    approaches: [
      {
        id: 'prefix-suffix',
        title: 'Prefix and Suffix Products',
        intuition: 'For each index i, the answer is (product of all elements before i) × (product of all elements after i). Compute these with two array passes.',
        algorithm: [
          'Create prefix array where prefix[i] = product of nums[0..i-1].',
          'Create suffix array where suffix[i] = product of nums[i+1..n-1].',
          'Return [prefix[i] * suffix[i]] for each i.',
        ],
        code: `func productExceptSelf(_ nums: [Int]) -> [Int] {
    let n = nums.count
    var prefix = [Int](repeating: 1, count: n)
    var suffix = [Int](repeating: 1, count: n)
    var result = [Int](repeating: 1, count: n)
    
    // Fill prefix products (product of all elements to the LEFT of i)
    for i in 1..<n {
        prefix[i] = prefix[i - 1] * nums[i - 1]
    }
    
    // Fill suffix products (product of all elements to the RIGHT of i)
    for i in stride(from: n - 2, through: 0, by: -1) {
        suffix[i] = suffix[i + 1] * nums[i + 1]
    }
    
    // Multiply prefix and suffix for the answer
    for i in 0..<n {
        result[i] = prefix[i] * suffix[i]
    }
    
    return result
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        complexityExplanation: 'Three linear passes. Two extra arrays of size n.',
      },
      {
        id: 'optimized-space',
        title: 'Optimized — O(1) Extra Space',
        intuition: 'Use the result array itself to hold prefix products in the first pass. Then multiply by a running suffix product in the second pass.',
        algorithm: [
          'result[i] = prefix product up to i, computed left-to-right.',
          'Second pass right-to-left: multiply result[i] by running suffix product, then update suffix.',
        ],
        code: `func productExceptSelf(_ nums: [Int]) -> [Int] {
    let n = nums.count
    var result = [Int](repeating: 1, count: n)
    
    // First pass: result[i] = product of all elements to the LEFT of i
    var prefix = 1
    for i in 0..<n {
        result[i] = prefix
        prefix *= nums[i]
    }
    
    // Second pass: multiply by suffix product (product to the RIGHT of i)
    var suffix = 1
    for i in stride(from: n - 1, through: 0, by: -1) {
        result[i] *= suffix
        suffix *= nums[i]
    }
    
    return result
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        complexityExplanation: 'Output array is not counted as extra space. Only two extra integer variables.',
      },
    ],
    commonMistakes: [
      'Using division: fails when there are zeros in the array.',
      'Off-by-one errors in prefix/suffix boundaries.',
      'Not initializing prefix/suffix accumulators to 1.',
    ],
    relatedProblems: ['trapping-rain-water', 'maximum-subarray'],
    sourceUrl: 'https://leetcode.com/problems/product-of-array-except-self/',
    publishedAt: '2024-01-20',
  },

  {
    id: 'maximum-subarray',
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    topicId: 'arrays',
    topicIds: ['arrays', 'dynamic-programming', 'sliding-window'],
    difficulty: 'Medium',
    category: 'Arrays',
    tags: ['array', 'dynamic-programming', 'kadane'],
    pattern: "Kadane's Algorithm",
    readingTime: 8,
    description: 'Find the contiguous subarray with the largest sum.',
    problemStatement: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    inputDescription: 'An integer array nums.',
    outputDescription: 'The sum of the subarray with the largest sum.',
    constraints: [
      '1 ≤ nums.length ≤ 10⁵',
      '-10⁴ ≤ nums[i] ≤ 10⁴',
    ],
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum = 6.' },
      { input: 'nums = [1]', output: '1' },
      { input: 'nums = [5,4,-1,7,8]', output: '23' },
    ],
    keyObservations: [
      "At each position, decide: should we extend the existing subarray or start a new one?",
      "If the running sum becomes negative, it only hurts us to carry it forward.",
    ],
    approaches: [
      {
        id: 'brute-force',
        title: 'Brute Force',
        intuition: 'Try all possible subarrays and compute their sums.',
        algorithm: ['For each start index i, accumulate sum extending right.', 'Track the global maximum.'],
        code: `func maxSubArray(_ nums: [Int]) -> Int {
    var maxSum = Int.min
    for i in 0..<nums.count {
        var currentSum = 0
        for j in i..<nums.count {
            currentSum += nums[j]
            maxSum = max(maxSum, currentSum)
        }
    }
    return maxSum
}`,
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        limitations: ['Quadratic time is too slow for n = 10⁵.'],
      },
      {
        id: 'kadane',
        title: "Kadane's Algorithm (Optimal)",
        intuition: "Maintain a running sum. If it goes negative, reset it to 0 (starting fresh is better). Track the maximum sum seen.",
        algorithm: [
          'Initialize maxSum = nums[0] (handles all-negative arrays).',
          'Initialize currentSum = 0.',
          'For each num: currentSum += num, maxSum = max(maxSum, currentSum).',
          'If currentSum < 0, reset currentSum = 0.',
        ],
        code: `func maxSubArray(_ nums: [Int]) -> Int {
    var maxSum = nums[0]   // Must handle all-negative arrays
    var currentSum = 0
    
    for num in nums {
        currentSum += num
        maxSum = max(maxSum, currentSum)
        
        // If current sum is negative, it can only decrease future sums
        if currentSum < 0 {
            currentSum = 0
        }
    }
    
    return maxSum
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        complexityExplanation: 'Single linear pass with two integer variables.',
      },
    ],
    commonMistakes: [
      'Initializing maxSum to 0 instead of Int.min or nums[0] — fails for all-negative arrays.',
      'Resetting currentSum before updating maxSum.',
    ],
    relatedProblems: ['best-time-to-buy-and-sell-stock', 'product-of-array-except-self'],
    sourceUrl: 'https://leetcode.com/problems/maximum-subarray/',
    publishedAt: '2024-01-21',
  },

  {
    id: 'three-sum',
    title: 'Three Sum',
    slug: 'three-sum',
    topicId: 'arrays',
    topicIds: ['arrays', 'two-pointers'],
    difficulty: 'Medium',
    category: 'Arrays',
    tags: ['array', 'two-pointers', 'sorting'],
    pattern: 'Sort + Two Pointers',
    readingTime: 10,
    description: 'Find all unique triplets in an array that sum to zero.',
    problemStatement: 'Given an integer array nums, return all unique triplets [nums[i], nums[j], nums[k]] such that i ≠ j ≠ k and nums[i] + nums[j] + nums[k] == 0.',
    inputDescription: 'An array of integers nums.',
    outputDescription: 'All unique triplets that sum to zero.',
    constraints: [
      '3 ≤ nums.length ≤ 3000',
      '-10⁵ ≤ nums[i] ≤ 10⁵',
    ],
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
      { input: 'nums = [0,1,1]', output: '[]' },
      { input: 'nums = [0,0,0]', output: '[[0,0,0]]' },
    ],
    keyObservations: [
      'Sort the array to allow two-pointer and easy duplicate skipping.',
      'Fix the first element with an outer loop, then solve Two Sum II for the remaining subarray.',
    ],
    approaches: [
      {
        id: 'brute-force',
        title: 'Brute Force',
        intuition: 'Check all possible triplets with three nested loops.',
        algorithm: ['Triple nested loops over all i < j < k.', 'Use a set to avoid duplicate triplets.'],
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
        spaceComplexity: 'O(n)',
        limitations: ['Way too slow for n = 3000.'],
      },
      {
        id: 'sort-two-pointers',
        title: 'Sort + Two Pointers (Optimal)',
        intuition: 'Sort the array. For each element nums[i], use two pointers (left, right) on the remaining subarray to find pairs that sum to -nums[i]. Skip duplicates carefully.',
        algorithm: [
          'Sort nums.',
          'For each i from 0 to n-3: skip if duplicate, break if nums[i] > 0.',
          'Set left = i+1, right = n-1.',
          'While left < right: if sum == 0, record triplet and skip duplicates on both sides.',
          'Else move pointers inward.',
        ],
        code: `func threeSum(_ nums: [Int]) -> [[Int]] {
    let sorted = nums.sorted()
    var result: [[Int]] = []
    
    for i in 0..<sorted.count - 2 {
        // Skip duplicate values for the fixed element
        if i > 0 && sorted[i] == sorted[i - 1] { continue }
        
        // If smallest possible triplet > 0, no more solutions
        if sorted[i] > 0 { break }
        
        var left = i + 1
        var right = sorted.count - 1
        
        while left < right {
            let sum = sorted[i] + sorted[left] + sorted[right]
            
            if sum == 0 {
                result.append([sorted[i], sorted[left], sorted[right]])
                // Skip duplicates for left and right
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
        spaceComplexity: 'O(n)',
        complexityExplanation: 'Sorting takes O(n log n). The two-pointer scan is O(n) per outer element, giving O(n²) overall.',
      },
    ],
    commonMistakes: [
      'Not skipping duplicate fixed elements in the outer loop.',
      'Forgetting to skip duplicates for left and right after finding a triplet.',
      'Using i < sorted.count instead of i < sorted.count - 2 in the outer loop bound.',
    ],
    relatedProblems: ['two-sum', 'container-with-most-water'],
    sourceUrl: 'https://leetcode.com/problems/3sum/',
    publishedAt: '2024-01-16',
  },

  {
    id: 'container-with-most-water',
    title: 'Container With Most Water',
    slug: 'container-with-most-water',
    topicId: 'arrays',
    topicIds: ['arrays', 'two-pointers'],
    difficulty: 'Medium',
    category: 'Arrays',
    tags: ['array', 'two-pointers', 'greedy'],
    pattern: 'Two Pointers',
    readingTime: 8,
    description: 'Find two vertical lines that together with the x-axis form a container holding the most water.',
    problemStatement: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the i-th line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container that contains the most water.',
    inputDescription: 'An integer array height.',
    outputDescription: 'The maximum amount of water a container can store.',
    constraints: [
      'n == height.length',
      '2 ≤ n ≤ 10⁵',
      '0 ≤ height[i] ≤ 10⁴',
    ],
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', explanation: 'Lines at index 1 (height 8) and index 8 (height 7). Water = min(8,7) * (8-1) = 49.' },
      { input: 'height = [1,1]', output: '1' },
    ],
    keyObservations: [
      'Area = min(height[left], height[right]) * (right - left).',
      'Moving the pointer at the shorter height could increase the area. Moving the taller one never helps.',
    ],
    approaches: [
      {
        id: 'brute-force',
        title: 'Brute Force',
        intuition: 'Try all pairs of lines.',
        algorithm: ['Nested loops over all pairs (i, j).', 'Compute area for each and track maximum.'],
        code: `func maxArea(_ height: [Int]) -> Int {
    var maxWater = 0
    for i in 0..<height.count {
        for j in (i + 1)..<height.count {
            let water = min(height[i], height[j]) * (j - i)
            maxWater = max(maxWater, water)
        }
    }
    return maxWater
}`,
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        limitations: ['TLE for n = 10⁵.'],
      },
      {
        id: 'two-pointers',
        title: 'Two Pointers (Optimal)',
        intuition: 'Start with the widest possible container (left=0, right=n-1). The width can only decrease as we move pointers inward. So always move the shorter line — keeping the taller one gives the best chance of a larger area.',
        algorithm: [
          'Initialize left=0, right=n-1, maxWater=0.',
          'While left < right: compute area, update maxWater.',
          'Move the pointer with the smaller height inward.',
        ],
        code: `func maxArea(_ height: [Int]) -> Int {
    var left = 0
    var right = height.count - 1
    var maxWater = 0
    
    while left < right {
        let water = min(height[left], height[right]) * (right - left)
        maxWater = max(maxWater, water)
        
        // Move the shorter line — it's the bottleneck
        if height[left] < height[right] {
            left += 1
        } else {
            right -= 1
        }
    }
    
    return maxWater
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    ],
    commonMistakes: [
      'Moving the taller line instead of the shorter one.',
      'Using max instead of min when computing the water level.',
    ],
    relatedProblems: ['trapping-rain-water', 'three-sum'],
    sourceUrl: 'https://leetcode.com/problems/container-with-most-water/',
    publishedAt: '2024-01-22',
  },

  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    slug: 'trapping-rain-water',
    topicId: 'arrays',
    topicIds: ['arrays', 'two-pointers', 'dynamic-programming'],
    difficulty: 'Hard',
    category: 'Arrays',
    tags: ['array', 'two-pointers', 'dynamic-programming', 'stack'],
    pattern: 'Two Pointers / Prefix-Suffix',
    readingTime: 14,
    description: 'Calculate how much rainwater can be trapped between elevation bars.',
    problemStatement: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    inputDescription: 'An array of non-negative integers height.',
    outputDescription: 'The total amount of water that can be trapped.',
    constraints: [
      'n == height.length',
      '1 ≤ n ≤ 2 × 10⁴',
      '0 ≤ height[i] ≤ 10⁵',
    ],
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
      { input: 'height = [4,2,0,3,2,5]', output: '9' },
    ],
    keyObservations: [
      'Water above position i = min(maxLeftHeight, maxRightHeight) - height[i].',
      'Precompute left/right maximums, or use two pointers to avoid extra space.',
    ],
    approaches: [
      {
        id: 'precomputed',
        title: 'Precomputed Left/Right Max Arrays',
        intuition: 'For each bar, the water it holds is bounded by the tallest bar to its left and the tallest to its right. Precompute these in two passes.',
        algorithm: [
          'leftMax[i] = max height from 0 to i.',
          'rightMax[i] = max height from i to n-1.',
          'water[i] = min(leftMax[i], rightMax[i]) - height[i].',
          'Sum all water[i].',
        ],
        code: `func trap(_ height: [Int]) -> Int {
    let n = height.count
    var leftMax = [Int](repeating: 0, count: n)
    var rightMax = [Int](repeating: 0, count: n)
    
    leftMax[0] = height[0]
    for i in 1..<n {
        leftMax[i] = max(leftMax[i - 1], height[i])
    }
    
    rightMax[n - 1] = height[n - 1]
    for i in stride(from: n - 2, through: 0, by: -1) {
        rightMax[i] = max(rightMax[i + 1], height[i])
    }
    
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
        id: 'two-pointers',
        title: 'Two Pointers — O(1) Space (Optimal)',
        intuition: 'Use two pointers. Whichever side has the smaller max height determines the water at that pointer — because we know the other side is at least as tall. Process the smaller side and advance that pointer.',
        algorithm: [
          'Initialize left=0, right=n-1, leftMax=0, rightMax=0, total=0.',
          'While left < right: if height[left] < height[right], process left pointer; else process right.',
          'Processing left: if height[left] >= leftMax, update leftMax. Else add leftMax - height[left] to total. Advance left.',
          'Mirror for right.',
        ],
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
        complexityExplanation: 'Single pass with two pointers. Only four integer variables used.',
      },
    ],
    commonMistakes: [
      'Using max instead of min for the water level formula.',
      'Not initializing leftMax and rightMax correctly.',
      'Off-by-one errors at the pointer boundaries.',
    ],
    relatedProblems: ['container-with-most-water', 'maximum-subarray'],
    sourceUrl: 'https://leetcode.com/problems/trapping-rain-water/',
    publishedAt: '2024-01-19',
  },

  // ─── STRINGS ──────────────────────────────────────────────
  {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    topicId: 'strings',
    topicIds: ['strings', 'hashing'],
    difficulty: 'Easy',
    category: 'Strings',
    tags: ['string', 'hash-map', 'sorting'],
    pattern: 'Frequency Map',
    readingTime: 6,
    description: 'Determine if two strings are anagrams of each other.',
    problemStatement: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram is formed by rearranging the letters of another word using all original letters exactly once.',
    inputDescription: 'Two strings s and t.',
    outputDescription: 'true if t is an anagram of s, false otherwise.',
    constraints: [
      '1 ≤ s.length, t.length ≤ 5 × 10⁴',
      's and t consist of lowercase English letters.',
    ],
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' },
    ],
    keyObservations: [
      'If lengths differ, they cannot be anagrams.',
      'Two strings are anagrams if and only if their character frequency maps are identical.',
    ],
    approaches: [
      {
        id: 'sorting',
        title: 'Sorting',
        intuition: 'Anagrams have the same characters. If we sort both strings, they become identical.',
        algorithm: ['Sort both strings.', 'Return s.sorted() == t.sorted().'],
        code: `func isAnagram(_ s: String, _ t: String) -> Bool {
    return s.sorted() == t.sorted()
}`,
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        limitations: ['Sorting is unnecessary overhead when a frequency map is simpler and faster.'],
      },
      {
        id: 'frequency-map',
        title: 'Character Frequency Map (Optimal)',
        intuition: 'Count characters in s (+1) and t (-1) in a single dictionary. If all counts are zero at the end, they\'re anagrams.',
        algorithm: [
          'Early return false if lengths differ.',
          'Zip s and t, increment charCount for s character, decrement for t character.',
          'Return true if all values in charCount are 0.',
        ],
        code: `func isAnagram(_ s: String, _ t: String) -> Bool {
    guard s.count == t.count else { return false }
    
    var charCount: [Character: Int] = [:]
    
    // Increment for s, decrement for t in one pass
    for (charS, charT) in zip(s, t) {
        charCount[charS, default: 0] += 1
        charCount[charT, default: 0] -= 1
    }
    
    // All counts must be zero for a valid anagram
    return charCount.values.allSatisfy { $0 == 0 }
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        complexityExplanation: 'O(1) space because the dictionary stores at most 26 lowercase letters.',
      },
    ],
    commonMistakes: [
      'Forgetting the length check — anagrams must use all characters exactly once.',
      'Not handling Unicode if the problem extends beyond ASCII.',
    ],
    relatedProblems: ['contains-duplicate', 'group-anagrams', 'valid-palindrome'],
    sourceUrl: 'https://leetcode.com/problems/valid-anagram/',
    publishedAt: '2024-01-12',
  },

  {
    id: 'valid-palindrome',
    title: 'Valid Palindrome',
    slug: 'valid-palindrome',
    topicId: 'strings',
    topicIds: ['strings', 'two-pointers'],
    difficulty: 'Easy',
    category: 'Strings',
    tags: ['string', 'two-pointers'],
    pattern: 'Two Pointers',
    readingTime: 6,
    description: 'Determine if a string is a palindrome considering only alphanumeric characters.',
    problemStatement: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.',
    inputDescription: 'A string s.',
    outputDescription: 'true if s is a palindrome, false otherwise.',
    constraints: [
      '1 ≤ s.length ≤ 2 × 10⁵',
      's consists only of printable ASCII characters.',
    ],
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: 'false' },
      { input: 's = " "', output: 'true', explanation: 'After removing non-alphanumerics, the string is empty — an empty string is a palindrome.' },
    ],
    keyObservations: [
      'Use two pointers moving inward. Skip non-alphanumeric characters.',
      'Compare case-insensitively.',
    ],
    approaches: [
      {
        id: 'clean-and-compare',
        title: 'Filter and Compare',
        intuition: 'Clean the string first (keep only alphanumeric, lowercased), then compare it to its reverse.',
        algorithm: [
          'Filter characters keeping only isLetter and isNumber.',
          'Lowercase all.',
          'Return cleaned == String(cleaned.reversed()).',
        ],
        code: `func isPalindrome(_ s: String) -> Bool {
    let cleaned = s.lowercased().filter { $0.isLetter || $0.isNumber }
    return cleaned == String(cleaned.reversed())
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        limitations: ['Creates extra strings — O(n) additional space.'],
      },
      {
        id: 'two-pointers',
        title: 'Two Pointers — In-Place (Optimal)',
        intuition: 'Skip non-alphanumeric characters with two pointers without creating new strings. Compare characters at both ends, moving inward.',
        algorithm: [
          'Convert to array of Characters for O(1) index access.',
          'Initialize left=0, right=n-1.',
          'Skip non-alphanumeric from both ends.',
          'Compare lowercased chars; if mismatch, return false.',
          'Return true after pointers cross.',
        ],
        code: `func isPalindrome(_ s: String) -> Bool {
    let chars = Array(s)
    var left = 0
    var right = chars.count - 1
    
    while left < right {
        // Skip non-alphanumeric characters
        while left < right && !chars[left].isLetter && !chars[left].isNumber {
            left += 1
        }
        while left < right && !chars[right].isLetter && !chars[right].isNumber {
            right -= 1
        }
        
        // Case-insensitive comparison
        if chars[left].lowercased() != chars[right].lowercased() {
            return false
        }
        
        left += 1
        right -= 1
    }
    
    return true
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        complexityExplanation: 'Converting String to Array is O(n). Pointers together traverse at most n characters. Using String.Index directly avoids the Array conversion but is less readable.',
      },
    ],
    commonMistakes: [
      'Not skipping non-alphanumeric characters before comparing.',
      'Forgetting case-insensitive comparison.',
      'Accessing String with integer index — Swift String requires Index arithmetic.',
    ],
    relatedProblems: ['valid-anagram', 'longest-substring-without-repeating'],
    sourceUrl: 'https://leetcode.com/problems/valid-palindrome/',
    publishedAt: '2024-02-01',
  },

  {
    id: 'longest-substring-without-repeating',
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating',
    topicId: 'strings',
    topicIds: ['strings', 'sliding-window', 'hashing'],
    difficulty: 'Medium',
    category: 'Strings',
    tags: ['string', 'sliding-window', 'hash-map'],
    pattern: 'Sliding Window',
    readingTime: 9,
    description: 'Find the length of the longest substring without repeating characters.',
    problemStatement: 'Given a string s, find the length of the longest substring without repeating characters.',
    inputDescription: 'A string s.',
    outputDescription: 'The length of the longest substring without duplicate characters.',
    constraints: [
      '0 ≤ s.length ≤ 5 × 10⁴',
      's consists of English letters, digits, symbols and spaces.',
    ],
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: '"abc" is the longest substring without repeating characters.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with length 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: '"wke" is the longest, length 3.' },
    ],
    keyObservations: [
      'Use a sliding window. Expand right; when we see a repeat, shrink from the left.',
      'Store the most recent index of each character in a dictionary to jump left pointer efficiently.',
    ],
    approaches: [
      {
        id: 'brute-force',
        title: 'Brute Force',
        intuition: 'Check every possible substring.',
        algorithm: ['For all pairs (i, j), check if substring has no repeats.', 'Track max length.'],
        code: `func lengthOfLongestSubstring(_ s: String) -> Int {
    let chars = Array(s)
    var maxLen = 0
    for i in 0..<chars.count {
        var seen = Set<Character>()
        for j in i..<chars.count {
            if seen.contains(chars[j]) { break }
            seen.insert(chars[j])
            maxLen = max(maxLen, j - i + 1)
        }
    }
    return maxLen
}`,
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(min(n, m))',
        limitations: ['Slow for large strings.'],
      },
      {
        id: 'sliding-window',
        title: 'Sliding Window with Index Map (Optimal)',
        intuition: 'Keep track of the last seen index of each character. When a duplicate is found in the current window, jump the left pointer to just after the duplicate\'s previous position.',
        algorithm: [
          'Dictionary lastSeen maps character → most recent index.',
          'left=0, maxLen=0.',
          'For each (right, char): if char is in lastSeen and lastSeen[char] >= left, set left = lastSeen[char]+1.',
          'Update lastSeen[char] = right.',
          'maxLen = max(maxLen, right - left + 1).',
        ],
        code: `func lengthOfLongestSubstring(_ s: String) -> Int {
    let chars = Array(s)
    var lastSeen: [Character: Int] = [:]
    var left = 0
    var maxLen = 0
    
    for (right, char) in chars.enumerated() {
        // If character was seen inside current window, shrink from left
        if let prevIndex = lastSeen[char], prevIndex >= left {
            left = prevIndex + 1
        }
        
        lastSeen[char] = right
        maxLen = max(maxLen, right - left + 1)
    }
    
    return maxLen
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(min(n, m))',
        complexityExplanation: 'Where m is the alphabet size. Single pass; dictionary holds at most window-size entries.',
      },
    ],
    commonMistakes: [
      'Moving left to lastSeen[char]+1 without checking if prevIndex >= left — can move left backward!',
      'Forgetting to always update lastSeen even if we didn\'t move the left pointer.',
    ],
    relatedProblems: ['valid-anagram', 'valid-palindrome'],
    sourceUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    publishedAt: '2024-02-02',
  },

  {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    slug: 'group-anagrams',
    topicId: 'strings',
    topicIds: ['strings', 'hashing'],
    difficulty: 'Medium',
    category: 'Strings',
    tags: ['string', 'hash-map', 'sorting'],
    pattern: 'Grouping by Key',
    readingTime: 8,
    description: 'Group an array of strings by their anagram equivalency.',
    problemStatement: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.',
    inputDescription: 'An array of strings strs.',
    outputDescription: 'Groups of strings that are anagrams of each other.',
    constraints: [
      '1 ≤ strs.length ≤ 10⁴',
      '0 ≤ strs[i].length ≤ 100',
      'strs[i] consists of lowercase English letters.',
    ],
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', output: '[[""]]' },
      { input: 'strs = ["a"]', output: '[["a"]]' },
    ],
    keyObservations: [
      'Anagrams have identical sorted character sequences — use sorted string as the grouping key.',
      'Use a dictionary mapping sorted-key → array of anagram strings.',
    ],
    approaches: [
      {
        id: 'sorted-key',
        title: 'Sort-Based Grouping',
        intuition: 'Sort each string alphabetically. Anagrams will produce identical sorted strings, which we use as dictionary keys.',
        algorithm: [
          'Initialize groups: [String: [String]] = [:].',
          'For each str, compute key = String(str.sorted()).',
          'Append str to groups[key].',
          'Return Array(groups.values).',
        ],
        code: `func groupAnagrams(_ strs: [String]) -> [[String]] {
    var groups: [String: [String]] = [:]
    
    for str in strs {
        let key = String(str.sorted())  // Sorted string is the anagram key
        groups[key, default: []].append(str)
    }
    
    return Array(groups.values)
}`,
        timeComplexity: 'O(n × k log k)',
        spaceComplexity: 'O(n × k)',
        complexityExplanation: 'n strings each sorted in O(k log k) where k is the average string length.',
      },
      {
        id: 'frequency-key',
        title: 'Frequency Count Key',
        intuition: 'Instead of sorting, encode each string as a 26-element frequency tuple. Anagrams produce identical tuples. This avoids the log factor.',
        algorithm: [
          'For each str, build a 26-element array counting each letter.',
          'Use this count array (as a string representation) as the key.',
          'Group strings by their frequency key.',
        ],
        code: `func groupAnagrams(_ strs: [String]) -> [[String]] {
    var groups: [String: [String]] = [:]
    
    for str in strs {
        var count = [Int](repeating: 0, count: 26)
        let aVal = Int(("a" as UnicodeScalar).value)
        
        for char in str.unicodeScalars {
            count[Int(char.value) - aVal] += 1
        }
        
        // Encode count array as a string key
        let key = count.map { String($0) }.joined(separator: ",")
        groups[key, default: []].append(str)
    }
    
    return Array(groups.values)
}`,
        timeComplexity: 'O(n × k)',
        spaceComplexity: 'O(n × k)',
        complexityExplanation: 'Linear per string — no sorting. The key is built in O(k) per string.',
      },
    ],
    commonMistakes: [
      'Using the original string as key instead of the sorted version.',
      'Forgetting that the order of groups in the output does not matter.',
    ],
    relatedProblems: ['valid-anagram', 'contains-duplicate'],
    sourceUrl: 'https://leetcode.com/problems/group-anagrams/',
    publishedAt: '2024-02-03',
  },

  // ─── BINARY SEARCH ──────────────────────────────────────
  {
    id: 'binary-search',
    title: 'Binary Search',
    slug: 'binary-search',
    topicId: 'binary-search',
    difficulty: 'Easy',
    category: 'Binary Search',
    tags: ['binary-search', 'array'],
    pattern: 'Classic Binary Search',
    readingTime: 7,
    description: 'Search for a target value in a sorted array in O(log n).',
    problemStatement: 'Given an array of integers nums sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1.',
    inputDescription: 'A sorted array of integers and an integer target.',
    outputDescription: 'Index of target, or -1 if not found.',
    constraints: [
      '1 ≤ nums.length ≤ 10⁴',
      '-10⁴ < nums[i], target < 10⁴',
      'All integers in nums are unique.',
      'nums is sorted in ascending order.',
    ],
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists at index 4.' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist.' },
    ],
    keyObservations: [
      'Each step eliminates half the search space.',
      'Use left + (right - left) / 2 to avoid integer overflow.',
    ],
    approaches: [
      {
        id: 'iterative',
        title: 'Iterative Binary Search',
        intuition: 'Maintain left and right boundaries. Compute mid and eliminate the half that cannot contain the target.',
        algorithm: [
          'left = 0, right = n-1.',
          'While left <= right: mid = left + (right - left) / 2.',
          'If nums[mid] == target, return mid.',
          'If nums[mid] < target, left = mid + 1.',
          'Else right = mid - 1.',
          'Return -1.',
        ],
        code: `func search(_ nums: [Int], _ target: Int) -> Int {
    var left = 0
    var right = nums.count - 1
    
    while left <= right {
        let mid = left + (right - left) / 2  // Avoids integer overflow
        
        if nums[mid] == target {
            return mid
        } else if nums[mid] < target {
            left = mid + 1   // Target is in the right half
        } else {
            right = mid - 1  // Target is in the left half
        }
    }
    
    return -1
}`,
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        complexityExplanation: 'Each iteration halves the search space. Starting with n elements, we need at most log₂(n) steps.',
      },
      {
        id: 'recursive',
        title: 'Recursive Binary Search',
        intuition: 'Recursively divide the array, solving the subproblem on the relevant half.',
        algorithm: [
          'Base case: left > right → return -1.',
          'Compute mid. If match, return mid.',
          'Recurse on left or right half based on comparison.',
        ],
        code: `func search(_ nums: [Int], _ target: Int) -> Int {
    return binarySearch(nums, target, left: 0, right: nums.count - 1)
}

private func binarySearch(_ nums: [Int], _ target: Int, left: Int, right: Int) -> Int {
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
        spaceComplexity: 'O(log n)',
        complexityExplanation: 'O(log n) recursive call stack frames.',
      },
    ],
    commonMistakes: [
      'Using (left + right) / 2 — can overflow for very large indices.',
      'Using left < right instead of left <= right — misses the single-element case.',
      'Off-by-one in left = mid+1 vs left = mid.',
    ],
    relatedProblems: ['search-in-rotated-sorted-array', 'find-minimum-in-rotated-array'],
    sourceUrl: 'https://leetcode.com/problems/binary-search/',
    publishedAt: '2024-01-15',
  },

  {
    id: 'search-in-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    slug: 'search-in-rotated-sorted-array',
    topicId: 'binary-search',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['binary-search', 'array'],
    pattern: 'Modified Binary Search',
    readingTime: 10,
    description: 'Search a target in a rotated sorted array in O(log n).',
    problemStatement: 'There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k. Given the array and a target, return the index of target, or -1 if not found.',
    inputDescription: 'A rotated sorted array nums and target integer.',
    outputDescription: 'Index of target or -1.',
    constraints: [
      '1 ≤ nums.length ≤ 5000',
      '-10⁴ ≤ nums[i] ≤ 10⁴',
      'All values in nums are unique.',
      'nums is an ascending array that is possibly rotated.',
    ],
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' },
      { input: 'nums = [1], target = 0', output: '-1' },
    ],
    keyObservations: [
      'One of the two halves (left or right of mid) is always sorted in a rotated array.',
      'Determine which half is sorted, then check if target falls in that sorted half.',
    ],
    approaches: [
      {
        id: 'binary-search-rotated',
        title: 'Modified Binary Search',
        intuition: 'At any mid point, one side must be fully sorted. Determine which side and use it to decide where to search.',
        algorithm: [
          'left=0, right=n-1.',
          'While left<=right: compute mid.',
          'If nums[mid]==target, return mid.',
          'If left half is sorted (nums[left] <= nums[mid]):',
          '  If target in [nums[left], nums[mid]), search left half.',
          '  Else search right half.',
          'Else (right half is sorted):',
          '  If target in (nums[mid], nums[right]], search right half.',
          '  Else search left half.',
        ],
        code: `func search(_ nums: [Int], _ target: Int) -> Int {
    var left = 0
    var right = nums.count - 1
    
    while left <= right {
        let mid = left + (right - left) / 2
        
        if nums[mid] == target { return mid }
        
        // Determine which half is sorted
        if nums[left] <= nums[mid] {
            // Left half is sorted
            if target >= nums[left] && target < nums[mid] {
                right = mid - 1  // Target is in the sorted left half
            } else {
                left = mid + 1   // Target is in the right half
            }
        } else {
            // Right half is sorted
            if target > nums[mid] && target <= nums[right] {
                left = mid + 1   // Target is in the sorted right half
            } else {
                right = mid - 1  // Target is in the left half
            }
        }
    }
    
    return -1
}`,
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        complexityExplanation: 'Still halves the search space on each iteration. Rotation does not change the O(log n) bound.',
      },
    ],
    commonMistakes: [
      'Forgetting the = in nums[left] <= nums[mid] (handles the left==mid case for single elements).',
      'Mixing up inclusive/exclusive bounds in the target range checks.',
    ],
    relatedProblems: ['binary-search', 'find-minimum-in-rotated-array'],
    sourceUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    publishedAt: '2024-02-10',
  },

  {
    id: 'find-minimum-in-rotated-array',
    title: 'Find Minimum in Rotated Sorted Array',
    slug: 'find-minimum-in-rotated-array',
    topicId: 'binary-search',
    difficulty: 'Medium',
    category: 'Binary Search',
    tags: ['binary-search', 'array'],
    pattern: 'Modified Binary Search',
    readingTime: 8,
    description: 'Find the minimum element in a rotated sorted array.',
    problemStatement: 'Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element.',
    inputDescription: 'A rotated sorted array nums of unique integers.',
    outputDescription: 'The minimum element in nums.',
    constraints: [
      'n == nums.length',
      '1 ≤ n ≤ 5000',
      '-5000 ≤ nums[i] ≤ 5000',
      'All integers in nums are unique.',
    ],
    examples: [
      { input: 'nums = [3,4,5,1,2]', output: '1', explanation: 'The minimum is 1.' },
      { input: 'nums = [4,5,6,7,0,1,2]', output: '0' },
      { input: 'nums = [11,13,15,17]', output: '11', explanation: 'Array not rotated; minimum is the first element.' },
    ],
    keyObservations: [
      'The minimum is at the rotation pivot.',
      'If nums[mid] > nums[right], the minimum is in the right half. Otherwise it\'s in the left half (including mid).',
    ],
    approaches: [
      {
        id: 'binary-search-min',
        title: 'Binary Search on Rotation Pivot',
        intuition: 'The minimum is the only element smaller than its predecessor. Use binary search: if the right half is "lower" than mid, the minimum is there; otherwise shrink from the left.',
        algorithm: [
          'left=0, right=n-1.',
          'While left < right: mid = left + (right-left)/2.',
          'If nums[mid] > nums[right]: minimum is in right half → left = mid + 1.',
          'Else: minimum is in left half including mid → right = mid.',
          'Return nums[left].',
        ],
        code: `func findMin(_ nums: [Int]) -> Int {
    var left = 0
    var right = nums.count - 1
    
    while left < right {
        let mid = left + (right - left) / 2
        
        if nums[mid] > nums[right] {
            // Minimum must be in the right half (after mid)
            left = mid + 1
        } else {
            // Minimum is in the left half including mid
            right = mid
        }
    }
    
    return nums[left]  // left == right, pointing to the minimum
}`,
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
      },
    ],
    commonMistakes: [
      'Comparing nums[mid] to nums[left] — compare to nums[right] for cleaner logic.',
      'Using left <= right (loop never terminates when left = right).',
    ],
    relatedProblems: ['binary-search', 'search-in-rotated-sorted-array'],
    sourceUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
    publishedAt: '2024-02-11',
  },

  // ─── LINKED LISTS ─────────────────────────────────────────
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    topicId: 'linked-lists',
    difficulty: 'Easy',
    category: 'Linked Lists',
    tags: ['linked-list', 'recursion', 'iteration'],
    pattern: 'In-Place Pointer Manipulation',
    readingTime: 8,
    description: 'Reverse a singly linked list.',
    problemStatement: 'Given the head of a singly linked list, reverse the list, and return the reversed list\'s head.',
    inputDescription: 'The head of a singly linked list.',
    outputDescription: 'The head of the reversed linked list.',
    constraints: [
      '0 ≤ number of nodes ≤ 5000',
      '-5000 ≤ Node.val ≤ 5000',
    ],
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' },
      { input: 'head = []', output: '[]' },
    ],
    keyObservations: [
      'We need to reverse each pointer (next) while traversing.',
      'We must save the next node before overwriting the pointer.',
    ],
    approaches: [
      {
        id: 'iterative',
        title: 'Iterative',
        intuition: 'Track three pointers: prev (initially nil), current, and next. At each step, reverse the pointer and advance all three.',
        algorithm: [
          'prev = nil, current = head.',
          'While current != nil: save nextNode = current.next, reverse current.next = prev, advance prev = current, current = nextNode.',
          'Return prev (the new head).',
        ],
        code: `class ListNode {
    var val: Int
    var next: ListNode?
    init(_ val: Int) { self.val = val }
}

func reverseList(_ head: ListNode?) -> ListNode? {
    var prev: ListNode? = nil
    var current = head
    
    while current != nil {
        let nextNode = current?.next  // 1. Save next
        current?.next = prev          // 2. Reverse the pointer
        prev = current                // 3. Advance prev
        current = nextNode            // 4. Advance current
    }
    
    return prev  // prev is now the new head
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
      {
        id: 'recursive',
        title: 'Recursive',
        intuition: 'Recursively reverse the tail. Then make the tail\'s last node point back to the current head, and set head.next = nil.',
        algorithm: [
          'Base case: empty or single node → return head.',
          'Recurse: newHead = reverseList(head.next).',
          'head.next?.next = head (reverse the pointer).',
          'head.next = nil (cut the old pointer).',
          'Return newHead.',
        ],
        code: `func reverseListRecursive(_ head: ListNode?) -> ListNode? {
    guard let head = head, head.next != nil else {
        return head  // Base case: empty or single node
    }
    
    // Recursively reverse the rest of the list
    let newHead = reverseListRecursive(head.next)
    
    // head.next still points to the node just after head (now the tail of the reversed sublist)
    head.next?.next = head  // Make that node point back to head
    head.next = nil         // head is now the tail, so its next is nil
    
    return newHead
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        complexityExplanation: 'O(n) recursive call stack frames.',
      },
    ],
    commonMistakes: [
      'Losing the reference to the next node before reversing the pointer.',
      'Forgetting head.next = nil in the recursive approach — causes a cycle.',
      'Returning current instead of prev in the iterative approach.',
    ],
    relatedProblems: ['merge-two-sorted-lists', 'linked-list-cycle'],
    sourceUrl: 'https://leetcode.com/problems/reverse-linked-list/',
    publishedAt: '2024-01-17',
  },

  {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    slug: 'merge-two-sorted-lists',
    topicId: 'linked-lists',
    difficulty: 'Easy',
    category: 'Linked Lists',
    tags: ['linked-list', 'recursion', 'iteration'],
    pattern: 'Two Pointer / Merge',
    readingTime: 7,
    description: 'Merge two sorted linked lists into a single sorted list.',
    problemStatement: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list by splicing together the nodes of the two lists. Return the head of the merged list.',
    inputDescription: 'Heads of two sorted linked lists list1 and list2.',
    outputDescription: 'Head of the merged sorted linked list.',
    constraints: [
      '0 ≤ number of nodes in each list ≤ 50',
      '-100 ≤ Node.val ≤ 100',
      'Both lists are sorted in non-decreasing order.',
    ],
    examples: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
      { input: 'list1 = [], list2 = []', output: '[]' },
      { input: 'list1 = [], list2 = [0]', output: '[0]' },
    ],
    keyObservations: [
      'Use a dummy head node to avoid edge cases with the first node.',
      'At each step, pick the smaller node and advance that list\'s pointer.',
    ],
    approaches: [
      {
        id: 'iterative',
        title: 'Iterative with Dummy Head',
        intuition: 'Use a dummy node to simplify list construction. Advance a current pointer, always attaching the smaller of the two list heads.',
        algorithm: [
          'Create dummy node. current = dummy.',
          'While both lists have nodes: attach the smaller head, advance that list.',
          'Attach any remaining nodes from the non-empty list.',
          'Return dummy.next.',
        ],
        code: `func mergeTwoLists(_ list1: ListNode?, _ list2: ListNode?) -> ListNode? {
    let dummy = ListNode(0)
    var current: ListNode? = dummy
    var l1 = list1
    var l2 = list2
    
    while l1 != nil && l2 != nil {
        if l1!.val <= l2!.val {
            current?.next = l1
            l1 = l1?.next
        } else {
            current?.next = l2
            l2 = l2?.next
        }
        current = current?.next
    }
    
    // Attach the remaining nodes (one list may be longer)
    current?.next = l1 ?? l2
    
    return dummy.next
}`,
        timeComplexity: 'O(m + n)',
        spaceComplexity: 'O(1)',
        complexityExplanation: 'Where m and n are the lengths of list1 and list2. Single pass; only a dummy node as extra space.',
      },
      {
        id: 'recursive',
        title: 'Recursive',
        intuition: 'Recursively select the smaller head and merge the rest.',
        algorithm: [
          'If either list is nil, return the other.',
          'If list1.val <= list2.val: list1.next = merge(list1.next, list2). Return list1.',
          'Else: list2.next = merge(list1, list2.next). Return list2.',
        ],
        code: `func mergeTwoListsRecursive(_ list1: ListNode?, _ list2: ListNode?) -> ListNode? {
    // Base cases
    guard let l1 = list1 else { return list2 }
    guard let l2 = list2 else { return list1 }
    
    if l1.val <= l2.val {
        l1.next = mergeTwoListsRecursive(l1.next, l2)
        return l1
    } else {
        l2.next = mergeTwoListsRecursive(l1, l2.next)
        return l2
    }
}`,
        timeComplexity: 'O(m + n)',
        spaceComplexity: 'O(m + n)',
        complexityExplanation: 'Recursive call stack depth is proportional to total nodes.',
      },
    ],
    commonMistakes: [
      'Forgetting to attach the remaining non-empty list at the end.',
      'Not using a dummy node — leads to complex head selection logic.',
    ],
    relatedProblems: ['reverse-linked-list', 'linked-list-cycle'],
    sourceUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    publishedAt: '2024-02-15',
  },

  {
    id: 'linked-list-cycle',
    title: 'Linked List Cycle',
    slug: 'linked-list-cycle',
    topicId: 'linked-lists',
    difficulty: 'Easy',
    category: 'Linked Lists',
    tags: ['linked-list', 'two-pointers', 'fast-slow-pointer'],
    pattern: 'Fast/Slow Pointers (Floyd\'s)',
    readingTime: 7,
    description: 'Detect if a linked list has a cycle.',
    problemStatement: 'Given the head of a linked list, determine if the linked list has a cycle in it. A cycle exists if some node in the list can be reached again by continuously following the next pointer.',
    inputDescription: 'The head of a linked list.',
    outputDescription: 'true if the linked list has a cycle, false otherwise.',
    constraints: [
      '0 ≤ number of nodes ≤ 10⁴',
      '-10⁵ ≤ Node.val ≤ 10⁵',
    ],
    examples: [
      { input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: 'There is a cycle: the tail connects back to node at index 1.' },
      { input: 'head = [1,2], pos = 0', output: 'true' },
      { input: 'head = [1], pos = -1', output: 'false' },
    ],
    keyObservations: [
      'Floyd\'s cycle detection: a slow pointer (1 step) and a fast pointer (2 steps) will eventually meet inside a cycle.',
      'If fast reaches nil, there is no cycle.',
    ],
    approaches: [
      {
        id: 'hash-set',
        title: 'Hash Set',
        intuition: 'Store visited nodes in a set. If we encounter a node we\'ve already seen, there\'s a cycle.',
        algorithm: ['Traverse list. Insert each node\'s ObjectIdentifier in a set.', 'If node already in set, return true.', 'Return false if nil reached.'],
        code: `func hasCycle(_ head: ListNode?) -> Bool {
    var visited = Set<ObjectIdentifier>()
    var current = head
    
    while let node = current {
        let id = ObjectIdentifier(node)
        if visited.contains(id) { return true }
        visited.insert(id)
        current = node.next
    }
    
    return false
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        limitations: ['Uses O(n) extra space for the visited set.'],
      },
      {
        id: 'floyd',
        title: "Floyd's Cycle Detection — Two Pointers (Optimal)",
        intuition: 'Use a slow pointer (1 step) and a fast pointer (2 steps). In a cycle, fast will eventually lap slow and they will meet. If fast reaches nil, no cycle exists.',
        algorithm: [
          'slow = head, fast = head.',
          'While fast != nil && fast.next != nil:',
          '  slow = slow.next, fast = fast.next.next.',
          '  If slow === fast, return true.',
          'Return false.',
        ],
        code: `func hasCycle(_ head: ListNode?) -> Bool {
    var slow = head
    var fast = head
    
    while fast != nil && fast?.next != nil {
        slow = slow?.next        // Move 1 step
        fast = fast?.next?.next  // Move 2 steps
        
        if slow === fast {        // Reference equality (same object)
            return true
        }
    }
    
    return false  // fast reached the end — no cycle
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        complexityExplanation: 'Two pointers traverse at most n + cycle_length steps. Only two pointer variables.',
      },
    ],
    commonMistakes: [
      'Using == (value equality) instead of === (reference equality) for node comparison in Swift.',
      'Checking fast === slow before advancing — they start at the same node so they\'d always "meet" immediately.',
    ],
    relatedProblems: ['reverse-linked-list', 'merge-two-sorted-lists'],
    sourceUrl: 'https://leetcode.com/problems/linked-list-cycle/',
    publishedAt: '2024-02-16',
  },

  // ─── STACKS & QUEUES ─────────────────────────────────────
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    topicId: 'stacks-queues',
    difficulty: 'Easy',
    category: 'Stacks & Queues',
    tags: ['stack', 'string'],
    pattern: 'Stack',
    readingTime: 6,
    description: 'Determine if a string of brackets is valid.',
    problemStatement: "Given a string s containing only '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of bracket in the correct order, and every open bracket has a corresponding close bracket.",
    inputDescription: 'A string s containing bracket characters.',
    outputDescription: 'true if the string is valid, false otherwise.',
    constraints: [
      '1 ≤ s.length ≤ 10⁴',
      's consists of parentheses characters only.',
    ],
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
      { input: 's = "([)]"', output: 'false' },
      { input: 's = "{[]}"', output: 'true' },
    ],
    keyObservations: [
      'Opening brackets must be closed in LIFO order — a stack models this perfectly.',
      'When we see a closing bracket, the top of the stack must be its matching opener.',
    ],
    approaches: [
      {
        id: 'stack',
        title: 'Stack',
        intuition: 'Push opening brackets onto the stack. For each closing bracket, verify it matches the top of the stack. At the end, the stack must be empty.',
        algorithm: [
          'Create a matching map: closing → opening bracket.',
          'For each character:',
          '  If opening bracket, push to stack.',
          '  If closing bracket: if stack empty or top != matching opener, return false. Else pop.',
          'Return stack.isEmpty.',
        ],
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
            // Closing bracket — check top of stack
            guard let top = stack.last,
                  top == matchingBracket[char] else {
                return false
            }
            stack.removeLast()
        }
    }
    
    return stack.isEmpty  // All opened brackets must be closed
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        complexityExplanation: 'Single pass through the string. Stack holds at most n/2 elements.',
      },
    ],
    commonMistakes: [
      'Forgetting to check stack.isEmpty at the end — "((((" would incorrectly pass without this.',
      'Not handling the case where the stack is empty when a closing bracket is encountered.',
    ],
    relatedProblems: ['minimum-stack'],
    sourceUrl: 'https://leetcode.com/problems/valid-parentheses/',
    publishedAt: '2024-01-14',
  },

  {
    id: 'minimum-stack',
    title: 'Min Stack',
    slug: 'minimum-stack',
    topicId: 'stacks-queues',
    difficulty: 'Medium',
    category: 'Stacks & Queues',
    tags: ['stack', 'design'],
    pattern: 'Augmented Stack',
    readingTime: 8,
    description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in O(1).',
    problemStatement: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Implement the MinStack class with push, pop, top, and getMin operations, all in O(1).',
    inputDescription: 'Operations and values for push, pop, top, getMin.',
    outputDescription: 'Results of top and getMin operations.',
    constraints: [
      '-2³¹ ≤ val ≤ 2³¹ - 1',
      'pop, top, and getMin operations are always called on non-empty stacks.',
      'At most 3 × 10⁴ calls will be made to push, pop, top, and getMin.',
    ],
    examples: [
      { input: 'MinStack(), push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()', output: '-3, 0, -2', explanation: 'After push(-2), push(0), push(-3): min is -3. After pop: top is 0, min is -2.' },
    ],
    keyObservations: [
      'A second "min stack" tracks the minimum at every state. When we push, also push to minStack if new value <= current min.',
      'When we pop, also pop from minStack if popped value equals current min.',
    ],
    approaches: [
      {
        id: 'two-stacks',
        title: 'Two Stacks',
        intuition: 'Maintain a parallel minStack that only pushes a new minimum when a new element is <= the current minimum. Both stacks are popped in sync.',
        algorithm: [
          'push(val): push to stack. If minStack empty or val <= minStack.top, also push to minStack.',
          'pop(): pop from stack. If popped == minStack.top, also pop from minStack.',
          'top(): return stack.last.',
          'getMin(): return minStack.last.',
        ],
        code: `class MinStack {
    private var stack: [Int] = []
    private var minStack: [Int] = []  // Tracks minimum at each state
    
    func push(_ val: Int) {
        stack.append(val)
        // Push to minStack if it's empty or val is a new minimum
        if minStack.isEmpty || val <= minStack.last! {
            minStack.append(val)
        }
    }
    
    func pop() {
        if let top = stack.last, top == minStack.last {
            minStack.removeLast()  // Also pop from minStack if it was the minimum
        }
        stack.removeLast()
    }
    
    func top() -> Int {
        return stack.last!
    }
    
    func getMin() -> Int {
        return minStack.last!
    }
}`,
        timeComplexity: 'O(1) for all operations',
        spaceComplexity: 'O(n)',
        complexityExplanation: 'Each operation is O(1). In the worst case (all pushes with decreasing values), minStack also has n elements.',
      },
    ],
    commonMistakes: [
      'Using < instead of <= when pushing to minStack — fails when pushing duplicate minimums (e.g., push(2), push(2), pop() → getMin() should return 2).',
      'Checking stack equality instead of value equality when deciding to pop minStack.',
    ],
    relatedProblems: ['valid-parentheses'],
    sourceUrl: 'https://leetcode.com/problems/min-stack/',
    publishedAt: '2024-02-20',
  },

  // ─── TREES ─────────────────────────────────────────────────
  {
    id: 'max-depth-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    slug: 'max-depth-binary-tree',
    topicId: 'trees',
    difficulty: 'Easy',
    category: 'Trees & BSTs',
    tags: ['tree', 'dfs', 'bfs', 'recursion'],
    pattern: 'DFS / Tree Recursion',
    readingTime: 6,
    description: 'Find the maximum depth of a binary tree.',
    problemStatement: 'Given the root of a binary tree, return its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
    inputDescription: 'The root of a binary tree.',
    outputDescription: 'The maximum depth (height) of the tree.',
    constraints: [
      '0 ≤ number of nodes ≤ 10⁴',
      '-100 ≤ Node.val ≤ 100',
    ],
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '3' },
      { input: 'root = [1,null,2]', output: '2' },
    ],
    keyObservations: [
      'The depth of a node is 1 + max(depth of left subtree, depth of right subtree).',
      'This naturally maps to a simple recursive DFS.',
    ],
    approaches: [
      {
        id: 'recursive-dfs',
        title: 'Recursive DFS',
        intuition: 'The depth of the tree rooted at any node is 1 (for the current node) plus the maximum depth of its left and right subtrees.',
        algorithm: [
          'Base case: if root is nil, return 0.',
          'Return 1 + max(maxDepth(root.left), maxDepth(root.right)).',
        ],
        code: `class TreeNode {
    var val: Int
    var left: TreeNode?
    var right: TreeNode?
    init(_ val: Int) { self.val = val }
}

func maxDepth(_ root: TreeNode?) -> Int {
    guard let root = root else { return 0 }  // Base case: nil node has depth 0
    
    let leftDepth = maxDepth(root.left)
    let rightDepth = maxDepth(root.right)
    
    return 1 + max(leftDepth, rightDepth)
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
        complexityExplanation: 'Every node is visited once. Space is the recursion stack depth — O(log n) for balanced trees, O(n) for skewed trees.',
      },
      {
        id: 'iterative-bfs',
        title: 'Iterative BFS (Level Order)',
        intuition: 'Count the number of levels using BFS. Each level represents one unit of depth.',
        algorithm: [
          'Use a queue starting with root.',
          'For each level, process all nodes in queue and enqueue their children.',
          'Increment depth counter for each level.',
        ],
        code: `func maxDepth(_ root: TreeNode?) -> Int {
    guard let root = root else { return 0 }
    
    var queue: [TreeNode] = [root]
    var depth = 0
    
    while !queue.isEmpty {
        depth += 1
        let levelSize = queue.count
        
        // Process all nodes at the current level
        for _ in 0..<levelSize {
            let node = queue.removeFirst()
            if let left = node.left { queue.append(left) }
            if let right = node.right { queue.append(right) }
        }
    }
    
    return depth
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(w)',
        complexityExplanation: 'O(w) where w is the maximum width of the tree (the widest level). For a complete binary tree, this is O(n/2) = O(n).',
      },
    ],
    commonMistakes: [
      'Forgetting the base case (nil node returns 0, not 1).',
      'Using queue.removeFirst() on a Swift Array is O(n) — acceptable here but use a proper Deque for large inputs.',
    ],
    relatedProblems: ['invert-binary-tree', 'binary-tree-level-order', 'validate-bst'],
    sourceUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
    publishedAt: '2024-02-25',
  },

  {
    id: 'invert-binary-tree',
    title: 'Invert Binary Tree',
    slug: 'invert-binary-tree',
    topicId: 'trees',
    difficulty: 'Easy',
    category: 'Trees & BSTs',
    tags: ['tree', 'dfs', 'bfs', 'recursion'],
    pattern: 'DFS / Tree Recursion',
    readingTime: 5,
    description: 'Invert a binary tree (mirror it).',
    problemStatement: 'Given the root of a binary tree, invert the tree, and return its root.',
    inputDescription: 'The root of a binary tree.',
    outputDescription: 'The root of the inverted binary tree.',
    constraints: [
      '0 ≤ number of nodes ≤ 100',
      '-100 ≤ Node.val ≤ 100',
    ],
    examples: [
      { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
      { input: 'root = [2,1,3]', output: '[2,3,1]' },
    ],
    keyObservations: [
      'Inverting a tree = swapping every node\'s left and right children recursively.',
    ],
    approaches: [
      {
        id: 'recursive',
        title: 'Recursive DFS',
        intuition: 'Swap left and right children, then recursively invert both subtrees.',
        algorithm: [
          'Base case: if root is nil, return nil.',
          'Swap root.left and root.right.',
          'Recursively invertTree(root.left) and invertTree(root.right).',
          'Return root.',
        ],
        code: `func invertTree(_ root: TreeNode?) -> TreeNode? {
    guard let root = root else { return nil }
    
    // Swap the children
    let temp = root.left
    root.left = root.right
    root.right = temp
    
    // Recursively invert both subtrees
    invertTree(root.left)
    invertTree(root.right)
    
    return root
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
        complexityExplanation: 'Every node visited once. Stack depth equals tree height.',
      },
    ],
    commonMistakes: [
      'Recursing first and swapping after — produces incorrect results (the subtrees get inverted then un-inverted when you swap).',
    ],
    relatedProblems: ['max-depth-binary-tree', 'binary-tree-level-order'],
    sourceUrl: 'https://leetcode.com/problems/invert-binary-tree/',
    publishedAt: '2024-02-26',
  },

  {
    id: 'binary-tree-level-order',
    title: 'Binary Tree Level Order Traversal',
    slug: 'binary-tree-level-order',
    topicId: 'trees',
    difficulty: 'Medium',
    category: 'Trees & BSTs',
    tags: ['tree', 'bfs', 'queue'],
    pattern: 'BFS / Level Order',
    readingTime: 7,
    description: 'Return the level order traversal of a binary tree\'s values.',
    problemStatement: 'Given the root of a binary tree, return the level order traversal of its nodes\' values (i.e., from left to right, level by level).',
    inputDescription: 'The root of a binary tree.',
    outputDescription: 'A 2D array where each inner array contains the values at that level.',
    constraints: [
      '0 ≤ number of nodes ≤ 2000',
      '-1000 ≤ Node.val ≤ 1000',
    ],
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
      { input: 'root = [1]', output: '[[1]]' },
      { input: 'root = []', output: '[]' },
    ],
    keyObservations: [
      'BFS naturally processes nodes level by level.',
      'Track the number of nodes at each level (queue size at start of each iteration).',
    ],
    approaches: [
      {
        id: 'bfs',
        title: 'BFS with Queue',
        intuition: 'Use a queue for BFS. At the start of each BFS iteration, the queue contains exactly all nodes at the current level. Process them all before moving to the next level.',
        algorithm: [
          'Start queue with root.',
          'While queue is not empty: snapshot levelSize = queue.count.',
          'Process levelSize nodes, collecting values and enqueuing children.',
          'Append level values to result.',
        ],
        code: `func levelOrder(_ root: TreeNode?) -> [[Int]] {
    guard let root = root else { return [] }
    
    var result: [[Int]] = []
    var queue: [TreeNode] = [root]
    
    while !queue.isEmpty {
        let levelSize = queue.count  // Nodes at this level
        var levelValues: [Int] = []
        
        for _ in 0..<levelSize {
            let node = queue.removeFirst()
            levelValues.append(node.val)
            
            if let left = node.left { queue.append(left) }
            if let right = node.right { queue.append(right) }
        }
        
        result.append(levelValues)
    }
    
    return result
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(w)',
        complexityExplanation: 'Where w is the maximum width of the tree. Every node is processed once.',
      },
    ],
    commonMistakes: [
      'Not capturing levelSize before the inner loop — queue grows as we add children.',
      'Using removeFirst() on Array is O(n); prefer a proper Deque for performance on large trees.',
    ],
    relatedProblems: ['max-depth-binary-tree', 'invert-binary-tree', 'validate-bst'],
    sourceUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    publishedAt: '2024-02-27',
  },

  {
    id: 'validate-bst',
    title: 'Validate Binary Search Tree',
    slug: 'validate-bst',
    topicId: 'trees',
    difficulty: 'Medium',
    category: 'Trees & BSTs',
    tags: ['tree', 'dfs', 'bst', 'inorder'],
    pattern: 'DFS with Bounds',
    readingTime: 9,
    description: 'Determine if a binary tree is a valid binary search tree.',
    problemStatement: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST). A BST is valid if: the left subtree contains only nodes with keys strictly less than the node\'s key, the right subtree contains only nodes with keys strictly greater, and both subtrees are also valid BSTs.',
    inputDescription: 'The root of a binary tree.',
    outputDescription: 'true if the tree is a valid BST, false otherwise.',
    constraints: [
      '1 ≤ number of nodes ≤ 10⁴',
      '-2³¹ ≤ Node.val ≤ 2³¹ - 1',
    ],
    examples: [
      { input: 'root = [2,1,3]', output: 'true' },
      { input: 'root = [5,1,4,null,null,3,6]', output: 'false', explanation: 'Node 4 in the right subtree is less than root 5.' },
    ],
    keyObservations: [
      'A node\'s value must be within a valid range (min, max) determined by all ancestor nodes.',
      'Every node in a left subtree must be less than its ancestor, not just its direct parent.',
    ],
    approaches: [
      {
        id: 'dfs-bounds',
        title: 'DFS with Valid Range Bounds',
        intuition: 'Pass valid (min, max) bounds to each recursive call. Left children must be less than the current node (new upper bound). Right children must be greater (new lower bound).',
        algorithm: [
          'Recursive helper: validate(node, minVal, maxVal).',
          'Base case: nil node is valid.',
          'If node.val <= minVal or node.val >= maxVal, return false.',
          'Recurse: validate(left, minVal, node.val) && validate(right, node.val, maxVal).',
          'Initial call: validate(root, Int.min, Int.max).',
        ],
        code: `func isValidBST(_ root: TreeNode?) -> Bool {
    return validate(root, min: Int.min, max: Int.max)
}

private func validate(_ node: TreeNode?, min: Int, max: Int) -> Bool {
    guard let node = node else { return true }
    
    // Node value must be strictly within (min, max)
    guard node.val > min && node.val < max else { return false }
    
    // Left subtree: values must be < node.val (new upper bound)
    // Right subtree: values must be > node.val (new lower bound)
    return validate(node.left, min: min, max: node.val)
        && validate(node.right, min: node.val, max: max)
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
        complexityExplanation: 'Every node visited once. Stack depth equals tree height.',
      },
      {
        id: 'inorder',
        title: 'Inorder Traversal',
        intuition: 'A valid BST\'s inorder traversal (left-root-right) produces a strictly increasing sequence. Check that each inorder value is greater than the previous.',
        algorithm: [
          'Perform inorder traversal tracking the previously seen value.',
          'If current node.val <= previous, the BST is invalid.',
          'Otherwise update previous and continue.',
        ],
        code: `func isValidBST(_ root: TreeNode?) -> Bool {
    var previousValue: Int? = nil
    
    func inorder(_ node: TreeNode?) -> Bool {
        guard let node = node else { return true }
        
        // Check left subtree
        if !inorder(node.left) { return false }
        
        // Check current node: must be greater than previous inorder value
        if let prev = previousValue, node.val <= prev {
            return false
        }
        previousValue = node.val
        
        // Check right subtree
        return inorder(node.right)
    }
    
    return inorder(root)
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
      },
    ],
    commonMistakes: [
      'Only comparing each node to its direct parent (doesn\'t catch invalid nodes deeper in a subtree).',
      'Using Int.min/Int.max as bounds can fail for node values at those extremes — use optional bounds instead.',
    ],
    relatedProblems: ['max-depth-binary-tree', 'binary-tree-level-order'],
    sourceUrl: 'https://leetcode.com/problems/validate-binary-search-tree/',
    publishedAt: '2024-02-28',
  },

  // ─── GRAPHS ──────────────────────────────────────────────
  {
    id: 'number-of-islands',
    title: 'Number of Islands',
    slug: 'number-of-islands',
    topicId: 'graphs',
    difficulty: 'Medium',
    category: 'Graphs',
    tags: ['graph', 'dfs', 'bfs', 'matrix'],
    pattern: 'Grid DFS/BFS',
    readingTime: 10,
    description: 'Count the number of islands in a 2D grid.',
    problemStatement: "Given an m×n 2D binary grid of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    inputDescription: "A 2D grid of '1' (land) and '0' (water) characters.",
    outputDescription: 'The number of distinct islands.',
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 ≤ m, n ≤ 300',
      "grid[i][j] is '0' or '1'.",
    ],
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3' },
    ],
    keyObservations: [
      'For each unvisited land cell, do a DFS/BFS to mark the entire island, then increment count.',
      'Marking visited cells as \'0\' avoids needing a separate visited set.',
    ],
    approaches: [
      {
        id: 'dfs',
        title: 'DFS — Flood Fill',
        intuition: 'Scan the grid. When we find a \'1\', increment the island count and use DFS to mark all connected land cells as visited (set to \'0\').',
        algorithm: [
          'Iterate every cell (row, col).',
          'If grid[row][col] == "1": count += 1, dfs(grid, row, col).',
          'DFS: mark current as "0", recurse in all 4 directions.',
        ],
        code: `func numIslands(_ grid: [[Character]]) -> Int {
    var grid = grid  // Make a mutable copy
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

private func dfs(_ grid: inout [[Character]], row: Int, col: Int) {
    // Bounds and water/visited check
    guard row >= 0, row < grid.count,
          col >= 0, col < grid[row].count,
          grid[row][col] == "1" else { return }
    
    grid[row][col] = "0"  // Mark as visited
    
    // Explore all 4 directions
    dfs(&grid, row: row - 1, col: col)
    dfs(&grid, row: row + 1, col: col)
    dfs(&grid, row: row, col: col - 1)
    dfs(&grid, row: row, col: col + 1)
}`,
        timeComplexity: 'O(m × n)',
        spaceComplexity: 'O(m × n)',
        complexityExplanation: 'Every cell is visited at most once. Recursion stack in worst case (all land) is O(m×n).',
      },
    ],
    commonMistakes: [
      'Not marking cells as visited — causes infinite recursion.',
      'Only checking horizontal or only vertical neighbors.',
      'Forgetting to make the grid mutable (`var grid = grid`).',
    ],
    relatedProblems: ['clone-graph', 'course-schedule'],
    sourceUrl: 'https://leetcode.com/problems/number-of-islands/',
    publishedAt: '2024-01-18',
  },

  {
    id: 'clone-graph',
    title: 'Clone Graph',
    slug: 'clone-graph',
    topicId: 'graphs',
    difficulty: 'Medium',
    category: 'Graphs',
    tags: ['graph', 'dfs', 'bfs', 'hash-map'],
    pattern: 'DFS with Memoization',
    readingTime: 10,
    description: 'Return a deep copy of an undirected graph.',
    problemStatement: 'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node contains a value and a list of neighbors.',
    inputDescription: 'A reference to a node in the graph.',
    outputDescription: 'A reference to the cloned node in the deep copied graph.',
    constraints: [
      '0 ≤ number of nodes ≤ 100',
      '1 ≤ Node.val ≤ 100',
      'Node.val is unique for each node.',
      'There are no repeated edges or self-loops.',
    ],
    examples: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]', explanation: 'Deep copy of the 4-node graph.' },
    ],
    keyObservations: [
      'We need to avoid re-cloning already cloned nodes — use a hash map of original → clone.',
      'DFS naturally traverses the graph; memoization prevents infinite loops in cycles.',
    ],
    approaches: [
      {
        id: 'dfs-memoization',
        title: 'DFS with Hash Map',
        intuition: 'Use a dictionary mapping each original node to its clone. Before cloning a node, check if it\'s already in the map. Recursively clone all neighbors.',
        algorithm: [
          'cloned: [Node: Node] dictionary.',
          'dfs(node): if node in cloned, return cloned[node].',
          'Create clone of node.',
          'For each neighbor: clone.neighbors.append(dfs(neighbor)).',
          'Return clone.',
        ],
        code: `class Node {
    var val: Int
    var neighbors: [Node?]
    init(_ val: Int) { self.val = val; self.neighbors = [] }
}

func cloneGraph(_ node: Node?) -> Node? {
    guard let node = node else { return nil }
    var cloned: [ObjectIdentifier: Node] = [:]
    
    func dfs(_ original: Node) -> Node {
        let id = ObjectIdentifier(original)
        if let existing = cloned[id] { return existing }
        
        let clone = Node(original.val)
        cloned[id] = clone  // Register before recursing (handles cycles)
        
        for neighbor in original.neighbors {
            if let n = neighbor {
                clone.neighbors.append(dfs(n))
            }
        }
        
        return clone
    }
    
    return dfs(node)
}`,
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        complexityExplanation: 'Every node and edge is visited once. The hash map stores V entries.',
      },
    ],
    commonMistakes: [
      'Not registering the clone in the map BEFORE recursing into neighbors — causes infinite loop on cycles.',
      'Using value equality instead of reference equality (ObjectIdentifier) for node identification.',
    ],
    relatedProblems: ['number-of-islands', 'course-schedule'],
    sourceUrl: 'https://leetcode.com/problems/clone-graph/',
    publishedAt: '2024-03-01',
  },

  {
    id: 'course-schedule',
    title: 'Course Schedule',
    slug: 'course-schedule',
    topicId: 'graphs',
    difficulty: 'Medium',
    category: 'Graphs',
    tags: ['graph', 'dfs', 'topological-sort', 'cycle-detection'],
    pattern: 'Cycle Detection (Topological Sort)',
    readingTime: 12,
    description: 'Determine if all courses can be finished given prerequisites.',
    problemStatement: 'There are numCourses courses labeled 0 to numCourses-1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates you must take course bi first if you want to take course ai. Return true if you can finish all courses.',
    inputDescription: 'numCourses and a prerequisites array.',
    outputDescription: 'true if it is possible to finish all courses, false otherwise.',
    constraints: [
      '1 ≤ numCourses ≤ 2000',
      '0 ≤ prerequisites.length ≤ 5000',
      'prerequisites[i].length == 2',
      '0 ≤ ai, bi < numCourses',
      'All pairs are unique.',
    ],
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true', explanation: 'Take course 0 first, then course 1.' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: 'Cycle: 0 requires 1 and 1 requires 0.' },
    ],
    keyObservations: [
      'The problem reduces to: does the directed graph of prerequisites have a cycle?',
      'If it does, we cannot finish all courses (circular dependency).',
    ],
    approaches: [
      {
        id: 'dfs-cycle-detection',
        title: 'DFS Cycle Detection',
        intuition: 'Build an adjacency list. DFS from each unvisited node, tracking nodes in the current path. If we revisit a node in the current path, we found a cycle.',
        algorithm: [
          'Build adjacency list: course → [prerequisites].',
          'State array: 0=unvisited, 1=visiting (in current path), 2=visited (completed).',
          'For each unvisited course: DFS and detect back edges (state==1).',
          'Return true if no cycle found.',
        ],
        code: `func canFinish(_ numCourses: Int, _ prerequisites: [[Int]]) -> Bool {
    // Build adjacency list
    var graph = [Int: [Int]](minimumCapacity: numCourses)
    for prereq in prerequisites {
        graph[prereq[0], default: []].append(prereq[1])
    }
    
    // 0 = unvisited, 1 = visiting (in current DFS path), 2 = visited (safe)
    var state = [Int](repeating: 0, count: numCourses)
    
    func dfs(_ course: Int) -> Bool {
        if state[course] == 1 { return false }  // Cycle detected
        if state[course] == 2 { return true }   // Already verified safe
        
        state[course] = 1  // Mark as visiting
        
        for prereq in graph[course, default: []] {
            if !dfs(prereq) { return false }
        }
        
        state[course] = 2  // Mark as fully visited (safe)
        return true
    }
    
    for course in 0..<numCourses {
        if !dfs(course) { return false }
    }
    
    return true
}`,
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V + E)',
        complexityExplanation: 'V = numCourses, E = prerequisites.count. Each node and edge visited once.',
      },
    ],
    commonMistakes: [
      'Not resetting the visiting state after backtracking — use 3 states (unvisited, visiting, done) not just a visited boolean.',
      'Forgetting to handle disconnected components — the outer loop must check all courses.',
    ],
    relatedProblems: ['number-of-islands', 'clone-graph'],
    sourceUrl: 'https://leetcode.com/problems/course-schedule/',
    publishedAt: '2024-03-02',
  },

  // ─── DYNAMIC PROGRAMMING ─────────────────────────────────
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    topicId: 'dynamic-programming',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    tags: ['dynamic-programming', 'memoization', 'fibonacci'],
    pattern: 'DP - Fibonacci Sequence',
    readingTime: 7,
    description: 'Count the number of ways to climb n stairs taking 1 or 2 steps at a time.',
    problemStatement: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    inputDescription: 'An integer n representing the number of stairs.',
    outputDescription: 'The number of distinct ways to reach the top.',
    constraints: ['1 ≤ n ≤ 45'],
    examples: [
      { input: 'n = 2', output: '2', explanation: '1+1 or 2.' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, or 2+1.' },
    ],
    keyObservations: [
      'To reach step n, you come from step n-1 (one step) or step n-2 (two steps).',
      'ways(n) = ways(n-1) + ways(n-2) — the Fibonacci recurrence.',
    ],
    approaches: [
      {
        id: 'recursion-memoization',
        title: 'Recursion with Memoization',
        intuition: 'The naive recursion recomputes the same subproblems many times. Cache results in a dictionary.',
        algorithm: [
          'memo: [Int: Int] = [:].',
          'If n <= 2, return n.',
          'If in memo, return memo[n].',
          'Compute and cache: memo[n] = climbStairs(n-1) + climbStairs(n-2).',
        ],
        code: `func climbStairs(_ n: Int) -> Int {
    var memo: [Int: Int] = [:]
    
    func dp(_ steps: Int) -> Int {
        if steps <= 2 { return steps }
        if let cached = memo[steps] { return cached }
        
        let result = dp(steps - 1) + dp(steps - 2)
        memo[steps] = result
        return result
    }
    
    return dp(n)
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        complexityExplanation: 'Each subproblem computed once. O(n) memo entries and O(n) call stack.',
      },
      {
        id: 'bottom-up-dp',
        title: 'Bottom-Up DP (Tabulation)',
        intuition: 'Build the answer iteratively from base cases up to n. This avoids recursion overhead.',
        algorithm: [
          'dp[1] = 1, dp[2] = 2.',
          'For i from 3 to n: dp[i] = dp[i-1] + dp[i-2].',
          'Return dp[n].',
        ],
        code: `func climbStairs(_ n: Int) -> Int {
    if n <= 2 { return n }
    
    var dp = [Int](repeating: 0, count: n + 1)
    dp[1] = 1
    dp[2] = 2
    
    for i in 3...n {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    
    return dp[n]
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
      {
        id: 'space-optimized',
        title: 'Space-Optimized — O(1)',
        intuition: 'We only need the last two values at each step. Use two variables instead of a full array.',
        algorithm: ['Initialize prev=1, curr=2.', 'For i from 3 to n: next = prev + curr; prev = curr; curr = next.', 'Return curr.'],
        code: `func climbStairs(_ n: Int) -> Int {
    if n <= 2 { return n }
    
    var prev = 1   // ways(n-2)
    var curr = 2   // ways(n-1)
    
    for _ in 3...n {
        let next = prev + curr
        prev = curr
        curr = next
    }
    
    return curr
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    ],
    commonMistakes: [
      'Off-by-one: dp[1]=1, dp[2]=2 (not dp[0]=1, dp[1]=1 unless you add a base case for n=0=1).',
    ],
    relatedProblems: ['house-robber', 'coin-change'],
    sourceUrl: 'https://leetcode.com/problems/climbing-stairs/',
    publishedAt: '2024-03-10',
  },

  {
    id: 'house-robber',
    title: 'House Robber',
    slug: 'house-robber',
    topicId: 'dynamic-programming',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['dynamic-programming', 'array'],
    pattern: 'DP - Linear with Skip',
    readingTime: 8,
    description: 'Maximize the amount stolen from houses without robbing adjacent ones.',
    problemStatement: 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected, so you cannot rob two adjacent houses. Given an integer array nums representing the amount of money at each house, return the maximum amount you can rob tonight.',
    inputDescription: 'An integer array nums of house money amounts.',
    outputDescription: 'The maximum money robable without hitting adjacent houses.',
    constraints: [
      '1 ≤ nums.length ≤ 100',
      '0 ≤ nums[i] ≤ 400',
    ],
    examples: [
      { input: 'nums = [1,2,3,1]', output: '4', explanation: 'Rob house 1 (1) + house 3 (3) = 4.' },
      { input: 'nums = [2,7,9,3,1]', output: '12', explanation: 'Rob house 1 (2) + house 3 (9) + house 5 (1) = 12.' },
    ],
    keyObservations: [
      'At each house, decide: rob it (add to max from 2 houses ago) or skip it (take max from previous house).',
      'dp[i] = max(dp[i-1], dp[i-2] + nums[i]).',
    ],
    approaches: [
      {
        id: 'bottom-up-dp',
        title: 'Bottom-Up DP',
        intuition: 'For each house, the maximum money is the better of: skip it (same as prev), or rob it (nums[i] + best from i-2).',
        algorithm: [
          'Handle edge cases: empty array, single house.',
          'dp[0] = nums[0], dp[1] = max(nums[0], nums[1]).',
          'For i from 2: dp[i] = max(dp[i-1], dp[i-2] + nums[i]).',
          'Return dp[n-1].',
        ],
        code: `func rob(_ nums: [Int]) -> Int {
    let n = nums.count
    if n == 1 { return nums[0] }
    
    var dp = [Int](repeating: 0, count: n)
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    
    for i in 2..<n {
        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
    }
    
    return dp[n - 1]
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
      },
      {
        id: 'space-optimized',
        title: 'Space-Optimized — O(1)',
        intuition: 'Like climbing stairs, we only need the previous two DP values.',
        algorithm: ['prev2 = nums[0], prev1 = max(nums[0], nums[1]).', 'For i from 2: curr = max(prev1, prev2 + nums[i]); advance prev2 = prev1, prev1 = curr.', 'Return prev1.'],
        code: `func rob(_ nums: [Int]) -> Int {
    let n = nums.count
    if n == 1 { return nums[0] }
    
    var prev2 = nums[0]
    var prev1 = max(nums[0], nums[1])
    
    for i in 2..<n {
        let current = max(prev1, prev2 + nums[i])
        prev2 = prev1
        prev1 = current
    }
    
    return prev1
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    ],
    commonMistakes: [
      'Setting dp[1] = nums[1] instead of max(nums[0], nums[1]) — missing the option to rob only house 0.',
      'Off-by-one when indexing into nums vs dp.',
    ],
    relatedProblems: ['climbing-stairs', 'coin-change'],
    sourceUrl: 'https://leetcode.com/problems/house-robber/',
    publishedAt: '2024-03-11',
  },

  {
    id: 'coin-change',
    title: 'Coin Change',
    slug: 'coin-change',
    topicId: 'dynamic-programming',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: ['dynamic-programming', 'array', 'bfs'],
    pattern: 'DP - Unbounded Knapsack',
    readingTime: 10,
    description: 'Find the fewest coins needed to make up a given amount.',
    problemStatement: 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins needed to make up that amount. If it cannot be made, return -1. You may use each coin an unlimited number of times.',
    inputDescription: 'An array of coin denominations and a target amount.',
    outputDescription: 'Minimum number of coins needed, or -1 if impossible.',
    constraints: [
      '1 ≤ coins.length ≤ 12',
      '1 ≤ coins[i] ≤ 2³¹ - 1',
      '0 ≤ amount ≤ 10⁴',
    ],
    examples: [
      { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1.' },
      { input: 'coins = [2], amount = 3', output: '-1' },
      { input: 'coins = [1], amount = 0', output: '0' },
    ],
    keyObservations: [
      'dp[i] = minimum coins to make amount i.',
      'For each amount, try every coin: if coin <= amount, dp[amount] = min(dp[amount], 1 + dp[amount - coin]).',
    ],
    approaches: [
      {
        id: 'bottom-up-dp',
        title: 'Bottom-Up DP',
        intuition: 'Build up solutions from amount=0 to amount=target. For each amount, try every coin and take the minimum.',
        algorithm: [
          'dp[0] = 0 (zero coins to make 0).',
          'dp[1..amount] = amount + 1 (impossible sentinel).',
          'For each amount i from 1 to amount: for each coin: if coin <= i, dp[i] = min(dp[i], 1 + dp[i - coin]).',
          'Return dp[amount] if < amount+1, else -1.',
        ],
        code: `func coinChange(_ coins: [Int], _ amount: Int) -> Int {
    // dp[i] = minimum coins needed to make amount i
    var dp = [Int](repeating: amount + 1, count: amount + 1)
    dp[0] = 0  // Base case: 0 coins to make 0
    
    for i in 1...amount {
        for coin in coins {
            if coin <= i {
                dp[i] = min(dp[i], 1 + dp[i - coin])
            }
        }
    }
    
    // If dp[amount] is still the sentinel, it's impossible
    return dp[amount] > amount ? -1 : dp[amount]
}`,
        timeComplexity: 'O(amount × coins.count)',
        spaceComplexity: 'O(amount)',
        complexityExplanation: 'For each of the amount+1 states, we try each coin denomination.',
      },
    ],
    commonMistakes: [
      'Initializing dp with Int.max — then 1 + Int.max overflows.',
      'Using amount instead of amount + 1 as the sentinel.',
      'Forgetting the base case dp[0] = 0.',
    ],
    relatedProblems: ['climbing-stairs', 'house-robber'],
    sourceUrl: 'https://leetcode.com/problems/coin-change/',
    publishedAt: '2024-03-12',
  },

  // ─── TWO POINTERS ─────────────────────────────────────────
  {
    id: 'two-sum-ii',
    title: 'Two Sum II — Input Array Is Sorted',
    slug: 'two-sum-ii',
    topicId: 'two-pointers',
    topicIds: ['two-pointers', 'arrays', 'binary-search'],
    difficulty: 'Medium',
    category: 'Two Pointers',
    tags: ['array', 'two-pointers', 'binary-search'],
    pattern: 'Two Pointers',
    readingTime: 6,
    description: 'Find two numbers in a sorted array that sum to a target.',
    problemStatement: 'Given a 1-indexed sorted array of integers numbers, find two numbers such that they add up to a specific target. Return the indices [index1, index2] where 1 ≤ index1 < index2 ≤ numbers.length. Use only constant extra space.',
    inputDescription: 'A sorted integer array numbers and an integer target.',
    outputDescription: 'The 1-indexed positions of the two numbers.',
    constraints: [
      '2 ≤ numbers.length ≤ 3 × 10⁴',
      '-1000 ≤ numbers[i] ≤ 1000',
      'numbers is sorted in non-decreasing order.',
      'Exactly one solution exists.',
    ],
    examples: [
      { input: 'numbers = [2,7,11,15], target = 9', output: '[1,2]', explanation: '2 + 7 = 9. Return [1, 2] (1-indexed).' },
      { input: 'numbers = [2,3,4], target = 6', output: '[1,3]' },
      { input: 'numbers = [-1,0], target = -1', output: '[1,2]' },
    ],
    keyObservations: [
      'The array is sorted. If the sum is too small, advance left. If too large, retreat right.',
      'This is the classic two-pointer pattern on a sorted array.',
    ],
    approaches: [
      {
        id: 'two-pointers',
        title: 'Two Pointers',
        intuition: 'Start with left at the beginning and right at the end. Move them inward based on whether the sum is too small or too large.',
        algorithm: [
          'left = 0, right = n-1.',
          'While left < right: sum = numbers[left] + numbers[right].',
          'If sum == target: return [left+1, right+1] (1-indexed).',
          'If sum < target: left += 1.',
          'Else: right -= 1.',
        ],
        code: `func twoSum(_ numbers: [Int], _ target: Int) -> [Int] {
    var left = 0
    var right = numbers.count - 1
    
    while left < right {
        let sum = numbers[left] + numbers[right]
        
        if sum == target {
            return [left + 1, right + 1]  // 1-indexed result
        } else if sum < target {
            left += 1   // Need a larger sum — advance left
        } else {
            right -= 1  // Need a smaller sum — retreat right
        }
    }
    
    return []  // Guaranteed to find a solution
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
      },
    ],
    commonMistakes: [
      'Returning 0-indexed instead of 1-indexed results.',
      'Using the hash map approach from Two Sum I — this problem requires O(1) space.',
    ],
    relatedProblems: ['two-sum', 'three-sum', 'container-with-most-water'],
    sourceUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
    publishedAt: '2024-02-05',
  },
];

// ─── HELPER FUNCTIONS ─────────────────────────────────────

export function getDSAProblem(slug: string): DSAProblem | undefined {
  return dsaProblems.find(p => p.slug === slug);
}

export function getProblemsByTopic(topicId: string): DSAProblem[] {
  return dsaProblems.filter(p => p.topicId === topicId || p.topicIds?.includes(topicId));
}

export function getProblemsByTopicOrdered(topicId: string, orderedIds: string[]): DSAProblem[] {
  const topicProblems = getProblemsByTopic(topicId);
  const ordered = orderedIds
    .map(id => topicProblems.find(p => p.slug === id))
    .filter((p): p is DSAProblem => p !== undefined);
  // Append any problems not in orderedIds
  const remaining = topicProblems.filter(p => !orderedIds.includes(p.slug));
  return [...ordered, ...remaining];
}

export function getAdjacentProblems(slug: string, topicId: string): { prev?: DSAProblem; next?: DSAProblem } {
  const topicProblems = getProblemsByTopic(topicId);
  const index = topicProblems.findIndex(p => p.slug === slug);
  return {
    prev: index > 0 ? topicProblems[index - 1] : undefined,
    next: index < topicProblems.length - 1 ? topicProblems[index + 1] : undefined,
  };
}

export function getRelatedProblems(problem: DSAProblem): DSAProblem[] {
  return problem.relatedProblems
    .map(slug => getDSAProblem(slug))
    .filter((p): p is DSAProblem => p !== undefined);
}

// Legacy compatibility export
export const dsaCategories = [
  'All', 'Arrays', 'Strings', 'Hashing', 'Two Pointers', 'Sliding Window',
  'Binary Search', 'Linked Lists', 'Stacks & Queues', 'Trees & BSTs',
  'Graphs', 'Dynamic Programming', 'Recursion & Backtracking',
];
