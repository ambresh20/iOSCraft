import type { Module, Lesson } from '../types/content';

// ============================================================
// SWIFT CURRICULUM MODULES
// ============================================================

export const swiftModules: Module[] = [
  {
    id: 'module-01',
    title: 'Swift Basics',
    description: 'Learn the fundamentals of Swift — the foundation for everything else.',
    order: 1,
    category: 'swift',
    lessons: [
      {
        id: 'lesson-001',
        title: 'Introduction to Swift',
        slug: 'introduction-to-swift',
        description: 'What is Swift, its history, and why it\'s the language of choice for iOS development.',
        category: 'Swift',
        difficulty: 'Beginner',
        tags: ['swift', 'introduction', 'basics'],
        readingTime: 5,
        publishedAt: '2024-01-01',
        moduleId: 'module-01',
        moduleName: 'Swift Basics',
        order: 1,
        nextSlug: 'variables-and-constants',
        content: `
## What is Swift?

Swift is a powerful, modern programming language created by Apple in 2014. It was designed to replace Objective-C as the primary language for iOS, macOS, watchOS, and tvOS development.

Swift is:
- **Safe**: Designed to eliminate entire classes of bugs.
- **Fast**: Performance comparable to C and C++.
- **Expressive**: Clean, readable syntax that makes code enjoyable to write.
- **Open Source**: Swift is open source with a welcoming community at swift.org.

---

## A Brief History

| Year | Milestone |
|------|-----------|
| 2014 | Swift 1.0 announced at WWDC and released |
| 2015 | Swift 2.0 — open-sourced |
| 2016 | Swift 3.0 — major API redesign |
| 2019 | Swift 5.0 — ABI stability |
| 2021 | Swift 5.5 — async/await concurrency |
| 2023 | Swift 5.9 — macros, parameter packs |

---

## Your First Swift Program

\`\`\`swift
// Hello, World! — the classic first program
print("Hello, iOSCraft!")

// More examples
let name = "iOS Developer"
let greeting = "Welcome, \\(name)!"
print(greeting)  // Welcome, iOS Developer!
\`\`\`

---

## Swift Playground

The best way to start learning Swift is:
1. Open **Xcode** → File → New → Playground
2. Use **Swift Playgrounds** app on iPad or Mac
3. Try swift.org's online compiler

---

## Key Features

**Type Safety**
\`\`\`swift
var age: Int = 25
// age = "twenty-five"  // ❌ Compile error — type mismatch
\`\`\`

**Type Inference**
\`\`\`swift
var score = 100        // Swift infers Int
var price = 9.99       // Swift infers Double
var name = "Alice"     // Swift infers String
\`\`\`

**String Interpolation**
\`\`\`swift
let city = "San Francisco"
let population = 874_961
print("\\(city) has about \\(population) people.")
\`\`\`

---

## Next Steps

In the next lesson, you'll learn about **Variables and Constants** — the building blocks of every Swift program.
        `,
      },
      {
        id: 'lesson-002',
        title: 'Variables and Constants',
        slug: 'variables-and-constants',
        description: 'Learn the difference between var and let, and how to declare and use variables in Swift.',
        category: 'Swift',
        difficulty: 'Beginner',
        tags: ['variables', 'constants', 'var', 'let'],
        readingTime: 6,
        publishedAt: '2024-01-02',
        moduleId: 'module-01',
        moduleName: 'Swift Basics',
        order: 2,
        prevSlug: 'introduction-to-swift',
        nextSlug: 'data-types-swift',
        content: `
## var vs let

In Swift, there are two ways to declare a value:

- **\`var\`** — variable (can be changed after declaration)
- **\`let\`** — constant (cannot be changed after declaration)

\`\`\`swift
var score = 0        // Can be changed
score = 100          // ✅ Works

let maxScore = 100   // Cannot be changed
// maxScore = 200    // ❌ Compile error: cannot assign to value: 'maxScore' is a 'let' constant
\`\`\`

---

## Why Prefer let?

Swift encourages using \`let\` by default. Using constants:
- Communicates intent ("this value will not change")
- Prevents accidental mutations
- Enables compiler optimizations

> **Rule of thumb**: Use \`let\` until you need to change the value, then switch to \`var\`.

---

## Declaring Variables

\`\`\`swift
// With type annotation (explicit)
var age: Int = 25
var name: String = "Alice"
var balance: Double = 1000.50
var isActive: Bool = true

// With type inference (Swift infers the type)
var level = 1             // Int
var username = "Swift"    // String
var pi = 3.14159          // Double
var isLoggedIn = false    // Bool
\`\`\`

---

## Changing Variable Values

\`\`\`swift
var temperature = 22.0
print("Morning: \\(temperature)°C")

temperature = 28.5
print("Afternoon: \\(temperature)°C")

temperature += 2.0         // Compound assignment
print("Evening: \\(temperature)°C")
\`\`\`

---

## Multiple Declarations

\`\`\`swift
// Multiple variables on one line
var x = 0, y = 0, z = 0

// Multiple constants
let firstName = "John", lastName = "Appleseed"
\`\`\`

---

## Naming Conventions

Swift uses **camelCase** for variable and constant names:

\`\`\`swift
// ✅ Good Swift naming
let userName = "Alice"
var currentScore = 0
var isUserLoggedIn = false
let maximumRetryCount = 3

// ❌ Avoid
let user_name = "Alice"      // Snake case (not Swift style)
let UserName = "Alice"       // PascalCase (for types only)
\`\`\`

---

## Unicode Support

Swift fully supports Unicode in identifiers:

\`\`\`swift
let π = 3.14159
let 🐦 = "Swift Bird"
print(π)    // 3.14159
print(🐦)   // Swift Bird
\`\`\`
        `,
      },
      {
        id: 'lesson-003',
        title: 'Data Types in Swift',
        slug: 'data-types-swift',
        description: 'Explore Swift\'s built-in data types: Int, Double, String, Bool, and more.',
        category: 'Swift',
        difficulty: 'Beginner',
        tags: ['types', 'int', 'double', 'string', 'bool'],
        readingTime: 7,
        publishedAt: '2024-01-03',
        moduleId: 'module-01',
        moduleName: 'Swift Basics',
        order: 3,
        prevSlug: 'variables-and-constants',
        nextSlug: 'type-inference-swift',
        content: `
## Swift's Core Types

Swift has a strong, static type system. Every value has a specific type.

---

## Integer Types

\`\`\`swift
// Int — platform-size integer (64-bit on modern hardware)
let score: Int = 1000
let year: Int = 2024

// Sized integers
let byte: Int8 = 127
let short: Int16 = 32767
let regular: Int32 = 2_147_483_647
let large: Int64 = 9_223_372_036_854_775_807

// Unsigned (non-negative)
let unsigned: UInt = 4_294_967_295

// Readable with underscores
let million = 1_000_000
let creditCard = 1234_5678_9012_3456
\`\`\`

---

## Floating-Point Types

\`\`\`swift
// Double — 64-bit, 15+ decimal digits (preferred)
let pi: Double = 3.14159265358979
let salary: Double = 95_000.50

// Float — 32-bit, ~6 decimal digits
let smallNumber: Float = 3.14

// Swift prefers Double by default
let inferred = 3.14  // Double
\`\`\`

---

## Boolean

\`\`\`swift
let isLoggedIn: Bool = true
var hasPermission = false

// Bool in conditions
if isLoggedIn {
    print("Welcome back!")
}
\`\`\`

---

## String

\`\`\`swift
let greeting: String = "Hello, World!"
var message = "Swift is awesome"

// Multi-line strings
let haiku = """
    An old silent pond
    A frog jumps into the pond
    Splash! Silence again.
    """

// String operations
let name = "Alice"
print(name.count)              // 5
print(name.uppercased())       // ALICE
print(name.hasPrefix("Al"))    // true
print(name.contains("ice"))    // true
\`\`\`

---

## Character

\`\`\`swift
let grade: Character = "A"
let emoji: Character = "🚀"

// Iterating string characters
for char in "Swift" {
    print(char)  // S, w, i, f, t
}
\`\`\`

---

## Type Conversion

Swift does NOT perform implicit type conversion:

\`\`\`swift
let intValue: Int = 10
let doubleValue: Double = 3.14

// let result = intValue + doubleValue  // ❌ Error — cannot mix types

// Explicit conversion required
let result = Double(intValue) + doubleValue  // ✅ 13.14
let sum = intValue + Int(doubleValue)        // ✅ 13 (truncates)
\`\`\`

---

## Type Aliases

\`\`\`swift
typealias UserID = Int
typealias Temperature = Double

var userID: UserID = 42
var bodyTemp: Temperature = 98.6
\`\`\`
        `,
      },
    ],
  },
  {
    id: 'module-02',
    title: 'Control Flow',
    description: 'Learn how to control program execution with conditionals and loops.',
    order: 2,
    category: 'swift',
    lessons: [
      {
        id: 'lesson-010',
        title: 'If-Else Statements',
        slug: 'if-else-swift',
        description: 'Control program flow with if, else if, and else statements in Swift.',
        category: 'Swift',
        difficulty: 'Beginner',
        tags: ['control-flow', 'if-else', 'conditionals'],
        readingTime: 5,
        publishedAt: '2024-01-10',
        moduleId: 'module-02',
        moduleName: 'Control Flow',
        order: 1,
        nextSlug: 'switch-swift',
        content: `
## If-Else Basics

\`\`\`swift
let temperature = 25

if temperature > 30 {
    print("It's hot outside!")
} else if temperature > 20 {
    print("Pleasant weather!")
} else if temperature > 10 {
    print("Bring a jacket.")
} else {
    print("It's cold!")
}
// Output: Pleasant weather!
\`\`\`

---

## Ternary Operator

The ternary operator is a compact if-else:

\`\`\`swift
let score = 85
let grade = score >= 90 ? "A" : "B"
print(grade)  // B

// Readability tip: only use ternary for simple conditions
let message = isLoggedIn ? "Welcome!" : "Please log in"
\`\`\`

---

## If as Expression (Swift 5.9+)

\`\`\`swift
let passFail = if score >= 60 { "Pass" } else { "Fail" }
print(passFail)  // Pass
\`\`\`

---

## Logical Operators

\`\`\`swift
let age = 25
let hasID = true

if age >= 18 && hasID {
    print("Entry allowed")
}

let isWeekend = true
let isHoliday = false

if isWeekend || isHoliday {
    print("Day off!")
}

let isRaining = false
if !isRaining {
    print("Perfect for a walk")
}
\`\`\`
        `,
      },
      {
        id: 'lesson-011',
        title: 'Guard Statements',
        slug: 'guard-statements-swift',
        description: 'Use guard for early exit and cleaner code in Swift functions.',
        category: 'Swift',
        difficulty: 'Beginner',
        tags: ['guard', 'control-flow', 'early-exit'],
        readingTime: 5,
        publishedAt: '2024-01-11',
        moduleId: 'module-02',
        moduleName: 'Control Flow',
        order: 6,
        prevSlug: 'if-else-swift',
        content: `
## What is Guard?

\`guard\` is used for **early exit** — it checks a condition and exits the current scope if false. It's the opposite of \`if\`.

\`\`\`swift
func greetUser(name: String?) {
    guard let name = name else {
        print("No name provided")
        return
    }
    // name is now available as non-optional
    print("Hello, \\(name)!")
}

greetUser(name: "Alice")  // Hello, Alice!
greetUser(name: nil)       // No name provided
\`\`\`

---

## Guard vs If Let

\`\`\`swift
// Using if let — name only available inside block
func processIfLet(name: String?) {
    if let name = name {
        print("Hello, \\(name)")
        // name available here
    }
    // name NOT available here
}

// Using guard let — name available after guard
func processGuard(name: String?) {
    guard let name = name else { return }
    
    // name available for rest of function
    print("Hello, \\(name)")
    print("Name length: \\(name.count)")
}
\`\`\`

---

## Multiple Guard Conditions

\`\`\`swift
func createAccount(username: String?, age: Int?) {
    guard let username = username, !username.isEmpty else {
        print("Invalid username")
        return
    }
    guard let age = age, age >= 18 else {
        print("Must be 18 or older")
        return
    }
    print("Account created for \\(username), age \\(age)")
}
\`\`\`

---

## Guard Advantages

- Reduces nesting (no "pyramid of doom")
- Intent is clear: the rest of the function requires these conditions
- Bound variables are available in the rest of the scope
- Common in Swift idiomatic code
        `,
      },
    ],
  },
  {
    id: 'module-03',
    title: 'Functions',
    description: 'Master Swift functions, closures, and higher-order programming.',
    order: 3,
    category: 'swift',
    lessons: [
      {
        id: 'lesson-020',
        title: 'Closures in Swift',
        slug: 'closures-swift',
        description: 'Understand closures — self-contained blocks of functionality that can capture values from their context.',
        category: 'Swift',
        difficulty: 'Intermediate',
        tags: ['closures', 'functions', 'higher-order'],
        readingTime: 10,
        publishedAt: '2024-01-20',
        moduleId: 'module-03',
        moduleName: 'Functions',
        order: 5,
        content: `
## What is a Closure?

A closure is a self-contained block of code that can be passed around and used in your code. Closures can **capture and store references** to variables and constants from the context in which they are defined.

\`\`\`swift
// A simple closure
let greet = { (name: String) -> String in
    return "Hello, \\(name)!"
}

print(greet("Swift"))  // Hello, Swift!
\`\`\`

---

## Closure Syntax

\`\`\`swift
// Full syntax
let multiply: (Int, Int) -> Int = { (a: Int, b: Int) -> Int in
    return a * b
}

// Trailing closure syntax
let result = [1, 2, 3, 4, 5].map { number in
    number * number
}
// [1, 4, 9, 16, 25]

// Shorthand argument names
let doubled = [1, 2, 3].map { $0 * 2 }
// [2, 4, 6]
\`\`\`

---

## Capturing Values

\`\`\`swift
func makeCounter() -> () -> Int {
    var count = 0
    return {
        count += 1  // Captures 'count' from outer scope
        return count
    }
}

let counter = makeCounter()
print(counter())  // 1
print(counter())  // 2
print(counter())  // 3
\`\`\`

---

## Common Higher-Order Functions

\`\`\`swift
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// map — transform each element
let squares = numbers.map { $0 * $0 }
// [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

// filter — keep elements matching condition
let evens = numbers.filter { $0 % 2 == 0 }
// [2, 4, 6, 8, 10]

// reduce — combine all elements into one value
let sum = numbers.reduce(0) { $0 + $1 }
// 55

// Chaining
let result = numbers
    .filter { $0 % 2 == 0 }
    .map { $0 * $0 }
    .reduce(0, +)
// 220 (4+16+36+64+100)
\`\`\`

---

## Escaping Closures

Use \`@escaping\` when a closure is stored and called after the function returns:

\`\`\`swift
class NetworkManager {
    var completionHandler: (() -> Void)?
    
    func fetchData(completion: @escaping () -> Void) {
        completionHandler = completion  // Stored — must be @escaping
    }
}
\`\`\`

---

## Capture Lists

Prevent retain cycles using capture lists:

\`\`\`swift
class ViewController {
    var name = "Main"
    
    func startWork() {
        someAsyncWork { [weak self] in
            guard let self = self else { return }
            print("Done in \\(self.name)")
        }
    }
}
\`\`\`
        `,
      },
    ],
  },
  {
    id: 'module-04',
    title: 'Optionals',
    description: 'Master Swift\'s optional system for handling the absence of values safely.',
    order: 5,
    category: 'swift',
    lessons: [
      {
        id: 'lesson-030',
        title: 'Optional Types',
        slug: 'optional-types-swift',
        description: 'Understand what optionals are and why Swift uses them for safe value handling.',
        category: 'Swift',
        difficulty: 'Beginner',
        tags: ['optionals', 'nil', 'safety'],
        readingTime: 7,
        publishedAt: '2024-01-30',
        moduleId: 'module-04',
        moduleName: 'Optionals',
        order: 1,
        nextSlug: 'optional-binding-swift',
        content: `
## What is an Optional?

An optional represents a value that may or may not exist. In Swift, you must explicitly opt-in to allowing \`nil\` using the \`?\` syntax.

\`\`\`swift
// Non-optional — MUST have a value
let name: String = "Alice"
// name = nil  // ❌ Error: 'nil' cannot be assigned to 'String'

// Optional — CAN be nil
var email: String? = "alice@example.com"
email = nil  // ✅ This is fine
\`\`\`

---

## Why Optionals?

Before optionals, a common bug in many languages was the dreaded null pointer exception. Swift makes you explicitly handle the possibility of nil:

\`\`\`swift
// Without optionals (dangerous in other languages)
// String name = null;
// int length = name.length();  // NullPointerException at runtime

// With Swift optionals (safe)
var username: String? = nil
// let length = username.count  // ❌ Won't compile — must unwrap first
\`\`\`

---

## Optional Values

\`\`\`swift
var serverResponse: Int? = 200
serverResponse = nil

var userAge: Int?
print(userAge)   // nil — default for uninitialized optionals

// Swift wraps the value in Optional
let definite: Int? = 42
print(definite)  // Optional(42)
\`\`\`

---

## Force Unwrapping (Use Carefully!)

\`\`\`swift
var score: Int? = 95
print(score!)    // 95 — unwraps the optional

var missing: Int? = nil
// print(missing!)  // ❌ Runtime crash: unexpectedly found nil
\`\`\`

> **Warning**: Only force unwrap when you are 100% certain the value exists. Prefer \`if let\` or \`guard let\`.

---

## Optional in Function Returns

\`\`\`swift
func findUser(id: Int) -> String? {
    let users = [1: "Alice", 2: "Bob", 3: "Charlie"]
    return users[id]  // Returns nil if id not found
}

let user = findUser(id: 2)   // Optional("Bob")
let ghost = findUser(id: 99) // nil
\`\`\`
        `,
      },
    ],
  },
];

export function getLessonBySlug(slug: string): Lesson | undefined {
  for (const module of swiftModules) {
    const lesson = module.lessons.find(l => l.slug === slug);
    if (lesson) return lesson;
  }
  return undefined;
}

export function getAllLessons(): Lesson[] {
  return swiftModules.flatMap(m => m.lessons);
}
