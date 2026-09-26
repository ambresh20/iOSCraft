import type { InterviewQuestion } from '../types/content';

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: 'iq-001',
    title: 'What is the difference between struct and class in Swift?',
    slug: 'struct-vs-class-swift',
    description: 'Understand value types vs reference types, memory behavior, inheritance, and when to choose each.',
    category: 'Swift',
    difficulty: 'Intermediate',
    tags: ['struct', 'class', 'value-type', 'reference-type', 'memory'],
    readingTime: 8,
    publishedAt: '2024-01-15',
    shortAnswer: 'Structs are value types (copied on assignment), while classes are reference types (shared via pointers). Structs do not support inheritance; classes do. Swift encourages using structs by default.',
    followUpQuestions: [
      'When would you choose a class over a struct?',
      'What is copy-on-write optimization in Swift?',
      'How does ARC interact with classes but not structs?',
      'Can a struct conform to a protocol?',
    ],
    interviewTips: [
      'Always mention value type vs reference type — that is the core difference.',
      'Mention that Swift standard library types (Array, String, Dictionary) are structs.',
      'Bring up copy-on-write optimization if you want to impress.',
      'Explain a real scenario where you would choose class (e.g., shared mutable state) vs struct (e.g., model data).',
    ],
    relatedQuestions: ['arc-memory-management', 'strong-weak-unowned', 'protocol-oriented-programming'],
    nextSlug: 'arc-memory-management',
    content: `
## Overview

This is one of the most common Swift interview questions. Mastering the differences between \`struct\` and \`class\` demonstrates your understanding of Swift's type system and memory model.

---

## Value Types vs Reference Types

The fundamental difference:

- **\`struct\`** → **Value type**: Each instance holds its own copy of data. Assigning or passing a struct creates an independent copy.
- **\`class\`** → **Reference type**: Instances share the same underlying data. Assigning or passing a class creates a new reference to the same object.

\`\`\`swift
struct Point {
    var x: Int
    var y: Int
}

var a = Point(x: 1, y: 2)
var b = a          // b is a copy of a
b.x = 100
print(a.x)         // 1 — a is unchanged
print(b.x)         // 100 — b is independent
\`\`\`

\`\`\`swift
class Counter {
    var count: Int = 0
}

let c1 = Counter()
let c2 = c1        // c2 references the SAME object
c2.count = 42
print(c1.count)    // 42 — c1 is also changed
\`\`\`

---

## Key Differences

| Feature | struct | class |
|---------|--------|-------|
| Type | Value type | Reference type |
| Memory | Stack (typically) | Heap |
| Copying | Deep copy | Shared reference |
| Inheritance | ❌ Not supported | ✅ Supported |
| Deinitializer | ❌ No deinit | ✅ Has deinit |
| ARC | ❌ Not managed by ARC | ✅ Managed by ARC |
| Mutability | \`mutating\` keyword required | Mutation always allowed |
| Identity (===) | ❌ Not applicable | ✅ Identity comparison |
| Default memberwise init | ✅ Automatic | ❌ Must define manually |

---

## Mutability

With structs, you must mark methods that modify properties with the \`mutating\` keyword:

\`\`\`swift
struct Rectangle {
    var width: Double
    var height: Double
    
    mutating func scale(by factor: Double) {
        width *= factor
        height *= factor
    }
}

var rect = Rectangle(width: 10, height: 5)
rect.scale(by: 2)
// width = 20, height = 10
\`\`\`

Classes do not require \`mutating\` because their methods operate on a shared reference:

\`\`\`swift
class BankAccount {
    var balance: Double = 0
    
    func deposit(_ amount: Double) {
        balance += amount  // No mutating keyword needed
    }
}
\`\`\`

---

## Inheritance

Only classes support inheritance:

\`\`\`swift
class Animal {
    var name: String
    init(name: String) { self.name = name }
    func speak() { print("...") }
}

class Dog: Animal {
    override func speak() { print("Woof!") }
}

// Structs cannot inherit from other structs
struct Point { var x, y: Int }
// struct ColoredPoint: Point { ... }  // ❌ ERROR
\`\`\`

---

## When to Use Which

**Use struct when:**
- Representing simple data (coordinates, colors, sizes)
- The data does not need to be shared across multiple parts of your app
- You want thread-safety by default (value semantics eliminate data races)
- Modeling immutable data

\`\`\`swift
struct User {
    let id: UUID
    let name: String
    let email: String
}
\`\`\`

**Use class when:**
- You need shared mutable state
- Working with UIKit (UIView, UIViewController are classes)
- Implementing the delegate pattern
- Using reference identity (\`===\`) is required
- Needing \`deinit\` for resource cleanup

\`\`\`swift
class NetworkManager {
    static let shared = NetworkManager()
    private init() {}
    // Shared state makes sense as a class
}
\`\`\`

---

## Copy-on-Write (CoW) Optimization

Swift uses CoW for collection types (Array, Dictionary, Set, String). This means a copy is only made when the value is actually mutated, making value semantics efficient:

\`\`\`swift
var array1 = [1, 2, 3, 4, 5]
var array2 = array1      // No actual copy yet
array2.append(6)         // Copy happens here — array1 is untouched
print(array1.count)      // 5
print(array2.count)      // 6
\`\`\`

---

## Summary

Swift's official guidelines recommend **preferring structs** for most custom data types. Use classes when you specifically need reference semantics, identity comparison, or UIKit inheritance.
    `,
  },
  {
    id: 'iq-002',
    title: 'Explain ARC and Memory Management in Swift',
    slug: 'arc-memory-management',
    description: 'Understand Automatic Reference Counting, how Swift manages memory, and how to prevent memory leaks.',
    category: 'Memory Management',
    difficulty: 'Intermediate',
    tags: ['arc', 'memory', 'retain-cycle', 'weak', 'unowned'],
    readingTime: 10,
    publishedAt: '2024-01-16',
    shortAnswer: 'ARC (Automatic Reference Counting) tracks how many strong references point to a class instance. When the count drops to zero, the instance is deallocated. Retain cycles occur when two objects hold strong references to each other, preventing deallocation.',
    followUpQuestions: [
      'What is a retain cycle and how do you break one?',
      'What is the difference between weak and unowned?',
      'How do capture lists prevent retain cycles in closures?',
      'Does ARC apply to structs and enums?',
    ],
    interviewTips: [
      'ARC is specific to classes (reference types). Structs and enums are not managed by ARC.',
      'Always mention retain cycles and how to break them with weak or unowned.',
      'Show you understand capture lists in closures — a common source of retain cycles.',
    ],
    relatedQuestions: ['struct-vs-class-swift', 'strong-weak-unowned'],
    prevSlug: 'struct-vs-class-swift',
    nextSlug: 'strong-weak-unowned',
    content: `
## What is ARC?

Automatic Reference Counting (ARC) is Swift's memory management mechanism for class instances. ARC tracks how many **strong references** point to each instance and deallocates it when that count reaches zero.

ARC does **not** apply to structs, enums, or value types — only to class instances.

---

## How ARC Works

\`\`\`swift
class Person {
    let name: String
    
    init(name: String) {
        self.name = name
        print("\\(name) initialized")
    }
    
    deinit {
        print("\\(name) deinitialized")
    }
}

var person1: Person? = Person(name: "Alice")  // Reference count: 1
var person2 = person1                          // Reference count: 2
var person3 = person1                          // Reference count: 3

person1 = nil  // Reference count: 2
person2 = nil  // Reference count: 1
person3 = nil  // Reference count: 0 → "Alice deinitialized"
\`\`\`

---

## Retain Cycles

A retain cycle occurs when two or more objects hold strong references to each other, preventing ARC from deallocating either:

\`\`\`swift
class Author {
    var name: String
    var book: Book?
    
    init(name: String) { self.name = name }
    deinit { print("\\(name) deallocated") }
}

class Book {
    var title: String
    var author: Author?
    
    init(title: String) { self.title = title }
    deinit { print("\\(title) deallocated") }
}

var author: Author? = Author(name: "Swift Guide")
var book: Book? = Book(title: "Swift Programming")

author?.book = book    // Author → Book (strong)
book?.author = author  // Book → Author (strong) — RETAIN CYCLE!

author = nil  // deinit NOT called — memory leaked!
book = nil    // deinit NOT called — memory leaked!
\`\`\`

---

## Breaking Retain Cycles with weak

Use \`weak\` for optional references that can become \`nil\`:

\`\`\`swift
class Book {
    var title: String
    weak var author: Author?  // weak breaks the cycle
    
    init(title: String) { self.title = title }
    deinit { print("\\(title) deallocated") }
}
\`\`\`

---

## Retain Cycles in Closures

Closures capture references strongly by default:

\`\`\`swift
class ViewController {
    var onUpdate: (() -> Void)?
    var value: Int = 0
    
    func setup() {
        // RETAIN CYCLE: closure captures self strongly
        onUpdate = {
            print(self.value)  // self is captured strongly
        }
    }
    
    deinit { print("ViewController deallocated") }
}
\`\`\`

Fix using a capture list:

\`\`\`swift
func setup() {
    onUpdate = { [weak self] in
        guard let self = self else { return }
        print(self.value)
    }
}
\`\`\`

---

## Summary

| Concept | Description |
|---------|-------------|
| ARC | Tracks strong references; deallocates at count = 0 |
| Retain Cycle | Two+ objects hold strong refs to each other — memory leak |
| weak | Optional; set to nil when object is deallocated |
| unowned | Non-optional; crash if accessed after deallocation |
| Capture List | \`[weak self]\` or \`[unowned self]\` in closures |
    `,
  },
  {
    id: 'iq-003',
    title: 'What are strong, weak, and unowned references?',
    slug: 'strong-weak-unowned',
    description: 'Learn the three reference types in Swift and when to use each to prevent memory leaks.',
    category: 'Memory Management',
    difficulty: 'Intermediate',
    tags: ['strong', 'weak', 'unowned', 'arc', 'memory'],
    readingTime: 7,
    publishedAt: '2024-01-17',
    shortAnswer: 'Strong references (default) increment ARC count. Weak references are optional and do not increment ARC count — they become nil when the referenced object is deallocated. Unowned references also skip ARC count but are non-optional and crash if accessed after deallocation.',
    followUpQuestions: [
      'When should you use unowned vs weak?',
      'Can weak be used with value types?',
      'What happens if you access an unowned reference after the object is deallocated?',
    ],
    interviewTips: [
      'weak vs unowned is a common follow-up — know the difference precisely.',
      'Use weak when the referenced object can outlive the referencing object.',
      'Use unowned when the referenced object will always outlive the referencing object.',
    ],
    relatedQuestions: ['arc-memory-management', 'struct-vs-class-swift'],
    prevSlug: 'arc-memory-management',
    nextSlug: 'state-vs-binding-swiftui',
    content: `
## Strong References (Default)

By default, all references in Swift are strong. A strong reference increments the ARC reference count:

\`\`\`swift
class Dog {
    var name: String
    init(name: String) { self.name = name }
    deinit { print("\\(name) gone") }
}

var rex: Dog? = Dog(name: "Rex")  // count: 1
var spot = rex                     // count: 2
rex = nil                          // count: 1 — NOT deallocated
spot = nil                         // count: 0 — "Rex gone"
\`\`\`

---

## Weak References

- Declared with the \`weak\` keyword
- Must be **optional** (\`var\`, not \`let\`)
- Does **not** increment ARC count
- Automatically set to \`nil\` when the referenced object is deallocated

\`\`\`swift
class Owner {
    var name: String
    var pet: Dog?
    init(name: String) { self.name = name }
}

class Dog {
    var name: String
    weak var owner: Owner?  // weak — does not create retain cycle
    init(name: String) { self.name = name }
}

var owner: Owner? = Owner(name: "Alice")
var dog: Dog? = Dog(name: "Rex")

owner?.pet = dog
dog?.owner = owner

owner = nil
// dog?.owner is now nil — owner was deallocated
print(dog?.owner)  // nil
\`\`\`

**Common use cases for weak:**
- Delegate references
- Completion handler callbacks that reference self
- Parent-child relationships where the child holds a reference to parent

---

## Unowned References

- Declared with the \`unowned\` keyword
- Can be **non-optional** (or optional with \`unowned(unsafe)\`)
- Does **not** increment ARC count
- Does **NOT** become \`nil\` after deallocation — accessing causes a crash

\`\`\`swift
class Customer {
    var name: String
    var creditCard: CreditCard?
    init(name: String) { self.name = name }
    deinit { print("Customer \\(name) deallocated") }
}

class CreditCard {
    let number: String
    unowned let customer: Customer  // A card always has a customer
    
    init(number: String, customer: Customer) {
        self.number = number
        self.customer = customer
    }
    deinit { print("Card \\(number) deallocated") }
}

var alice: Customer? = Customer(name: "Alice")
alice?.creditCard = CreditCard(number: "1234", customer: alice!)

alice = nil
// Both Customer and CreditCard are deallocated safely
\`\`\`

---

## Choosing Between weak and unowned

| Scenario | Use |
|---------|-----|
| Referenced object may become nil before referencing object | \`weak\` |
| Referenced object always lives as long as referencing object | \`unowned\` |
| Not sure | Prefer \`weak\` — it is safer |

\`\`\`swift
// Delegate — owner can outlive delegate, use weak
protocol DataDelegate: AnyObject {}
class DataManager {
    weak var delegate: DataDelegate?
}

// Timer example — self lives longer than closure assumption, use unowned
class ViewController: UIViewController {
    func startTimer() {
        Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { [unowned self] _ in
            self.update()
        }
    }
    func update() { print("tick") }
}
\`\`\`

---

## Quick Summary

| | strong | weak | unowned |
|-|--------|------|---------|
| ARC count | Increments | No change | No change |
| Type | Any | Optional | Non-optional |
| After deallocation | Still valid | Becomes nil | Crash |
| When to use | Default | Delegate, callbacks | Parent-child with guaranteed lifetime |
    `,
  },
  {
    id: 'iq-004',
    title: 'What is the difference between @State and @Binding in SwiftUI?',
    slug: 'state-vs-binding-swiftui',
    description: 'Understand @State for local source of truth and @Binding for two-way data connections in SwiftUI.',
    category: 'SwiftUI',
    difficulty: 'Intermediate',
    tags: ['swiftui', 'state', 'binding', 'state-management'],
    readingTime: 7,
    publishedAt: '2024-01-18',
    shortAnswer: '@State creates a source of truth owned by a view. @Binding creates a two-way connection to a @State variable in a parent view, allowing a child view to read and write the parent\'s state.',
    followUpQuestions: [
      'What is the difference between @State and @StateObject?',
      'When would you use @EnvironmentObject instead of @Binding?',
      'What is a projected value ($) in SwiftUI property wrappers?',
    ],
    interviewTips: [
      'Always mention that @State is local to the view and @Binding creates a two-way reference.',
      'Explain the $ prefix creates a Binding from a @State variable.',
      'Contrast with @ObservedObject for external reference-type data.',
    ],
    relatedQuestions: ['arc-memory-management', 'struct-vs-class-swift'],
    prevSlug: 'strong-weak-unowned',
    nextSlug: 'async-await-swift',
    content: `
## @State

\`@State\` is a property wrapper that creates a **local, persistent source of truth** inside a SwiftUI view. When a \`@State\` value changes, SwiftUI automatically re-renders the view.

\`\`\`swift
struct CounterView: View {
    @State private var count = 0  // owned by this view
    
    var body: some View {
        VStack(spacing: 20) {
            Text("Count: \\(count)")
                .font(.title)
            
            Button("Increment") {
                count += 1  // triggers re-render
            }
            .buttonStyle(.borderedProminent)
        }
    }
}
\`\`\`

**Key characteristics of @State:**
- Owned by the view it's declared in
- Should be \`private\` by convention
- Value type (stored on the heap internally by SwiftUI)
- Changes trigger view updates

---

## @Binding

\`@Binding\` creates a **two-way connection** to a \`@State\` (or other source of truth) owned by a parent view. It does not own the data — it references it.

\`\`\`swift
struct ToggleRow: View {
    let title: String
    @Binding var isOn: Bool  // references parent's @State
    
    var body: some View {
        HStack {
            Text(title)
            Spacer()
            Toggle("", isOn: $isOn)
        }
    }
}

struct SettingsView: View {
    @State private var notificationsOn = true
    @State private var darkModeOn = false
    
    var body: some View {
        List {
            ToggleRow(title: "Notifications", isOn: $notificationsOn)
            ToggleRow(title: "Dark Mode", isOn: $darkModeOn)
        }
    }
}
\`\`\`

The \`$\` prefix creates a \`Binding<T>\` from a \`@State\` property (the projected value).

---

## Comparison

| | @State | @Binding |
|--|--------|---------|
| Ownership | Owns the data | References parent's data |
| Declaration | \`@State private var x = value\` | \`@Binding var x: Type\` |
| Data flow | Source of truth | Derived / two-way reference |
| Initialization | Has a default value | Requires a \`Binding<T>\` |
| Scope | Local to view | Passed from parent |
| Modifier | \`@State\` | \`@Binding\` |

---

## Data Flow Direction

\`\`\`
ParentView (@State)  ──→  ChildView (@Binding)
                    ←─────────────────────────
         (two-way binding via $stateVariable)
\`\`\`

---

## Creating a Binding Manually

For previews or testing, you can create a constant \`Binding\`:

\`\`\`swift
#Preview {
    ToggleRow(title: "Test", isOn: .constant(true))
}
\`\`\`
    `,
  },
  {
    id: 'iq-005',
    title: 'Explain async/await and structured concurrency in Swift',
    slug: 'async-await-swift',
    description: 'Learn how Swift async/await replaces completion handlers and how structured concurrency manages tasks.',
    category: 'Concurrency',
    difficulty: 'Advanced',
    tags: ['async', 'await', 'concurrency', 'task', 'actor'],
    readingTime: 12,
    publishedAt: '2024-01-19',
    shortAnswer: 'async/await is Swift\'s native concurrency model introduced in Swift 5.5. async functions can pause execution without blocking a thread. await suspends the current task until an async function completes. Structured concurrency ensures child tasks are properly managed through their parent\'s lifetime.',
    followUpQuestions: [
      'What is the difference between Task and async let?',
      'What is an Actor and how does it prevent data races?',
      'How does structured concurrency differ from GCD?',
      'What is a TaskGroup?',
    ],
    interviewTips: [
      'Contrast with the old completion handler pattern to show the improvement.',
      'Mention that async functions are not threads — they cooperate with Swift\'s runtime.',
      'Actors are a common follow-up — know the basics.',
    ],
    relatedQuestions: ['state-vs-binding-swiftui', 'arc-memory-management'],
    prevSlug: 'state-vs-binding-swiftui',
    nextSlug: 'mvc-vs-mvvm',
    content: `
## The Problem with Completion Handlers

Before async/await, asynchronous code used completion handlers:

\`\`\`swift
func fetchUser(id: Int, completion: @escaping (Result<User, Error>) -> Void) {
    URLSession.shared.dataTask(with: url) { data, _, error in
        if let error = error {
            completion(.failure(error))
            return
        }
        guard let data = data, let user = try? JSONDecoder().decode(User.self, from: data) else {
            completion(.failure(AppError.decodingFailed))
            return
        }
        completion(.success(user))
    }.resume()
}

// Callback hell when chaining
fetchUser(id: 1) { result in
    fetchPosts(for: result.value!) { posts in
        fetchComments(for: posts.first!) { comments in
            // Deeply nested, error-prone
        }
    }
}
\`\`\`

---

## async/await

\`\`\`swift
// Declaring an async function
func fetchUser(id: Int) async throws -> User {
    let url = URL(string: "https://api.example.com/users/\\(id)")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode(User.self, from: data)
}

// Calling async functions reads like synchronous code
func loadProfile() async {
    do {
        let user = try await fetchUser(id: 1)
        let posts = try await fetchPosts(for: user.id)
        print("Loaded \\(posts.count) posts for \\(user.name)")
    } catch {
        print("Error: \\(error)")
    }
}
\`\`\`

---

## Task — Running Async Code

To call async functions from synchronous contexts, use \`Task\`:

\`\`\`swift
// In a UIViewController or View
func viewDidLoad() {
    Task {
        await loadProfile()
    }
}

// SwiftUI
.task {
    await loadProfile()
}
\`\`\`

---

## async let — Parallel Execution

Run multiple async operations concurrently:

\`\`\`swift
func loadDashboard() async throws {
    // Sequential — each waits for the previous
    let user = try await fetchUser(id: 1)
    let posts = try await fetchPosts()
    
    // Parallel — both execute concurrently
    async let user2 = fetchUser(id: 2)
    async let feed = fetchFeed()
    
    let (resolvedUser, resolvedFeed) = try await (user2, feed)
    print("\\(resolvedUser.name): \\(resolvedFeed.count) items")
}
\`\`\`

---

## TaskGroup — Dynamic Parallelism

\`\`\`swift
func fetchAllUsers(ids: [Int]) async throws -> [User] {
    try await withThrowingTaskGroup(of: User.self) { group in
        for id in ids {
            group.addTask { try await fetchUser(id: id) }
        }
        
        var users: [User] = []
        for try await user in group {
            users.append(user)
        }
        return users
    }
}
\`\`\`

---

## Actors — Safe Shared State

Actors protect mutable state from concurrent access:

\`\`\`swift
actor UserCache {
    private var cache: [Int: User] = [:]
    
    func user(for id: Int) -> User? {
        cache[id]
    }
    
    func store(user: User, id: Int) {
        cache[id] = user
    }
}

// Usage
let cache = UserCache()
await cache.store(user: fetchedUser, id: 1)
let user = await cache.user(for: 1)
\`\`\`

---

## MainActor

Use \`@MainActor\` to ensure code runs on the main thread:

\`\`\`swift
@MainActor
class ViewModel: ObservableObject {
    @Published var users: [User] = []
    
    func loadUsers() async {
        let fetched = try? await fetchAllUsers(ids: [1, 2, 3])
        users = fetched ?? []  // safe — always on main thread
    }
}
\`\`\`

---

## Summary

| Concept | Purpose |
|---------|---------|
| \`async\` | Marks a function as asynchronous |
| \`await\` | Suspends and waits for an async result |
| \`Task\` | Runs async code from sync context |
| \`async let\` | Parallel async bindings |
| \`TaskGroup\` | Dynamic number of parallel tasks |
| \`Actor\` | Protects shared mutable state |
| \`@MainActor\` | Ensures execution on main thread |
    `,
  },
  {
    id: 'iq-006',
    title: 'What is the difference between MVC and MVVM?',
    slug: 'mvc-vs-mvvm',
    description: 'Compare Model-View-Controller and Model-View-ViewModel architecture patterns in iOS development.',
    category: 'Architecture',
    difficulty: 'Intermediate',
    tags: ['mvc', 'mvvm', 'architecture', 'design-patterns'],
    readingTime: 9,
    publishedAt: '2024-01-20',
    shortAnswer: 'MVC is Apple\'s traditional iOS pattern where the Controller mediates between Model and View, often becoming "Massive View Controller." MVVM adds a ViewModel layer that holds presentation logic, making the ViewController lighter and the code more testable.',
    followUpQuestions: [
      'What is the "Massive View Controller" problem?',
      'How does MVVM improve testability?',
      'What is Clean Architecture and how does it relate to MVVM?',
      'Have you used VIPER? How does it compare to MVVM?',
    ],
    interviewTips: [
      'Acknowledge that MVC is Apple\'s default but explain its practical limitations.',
      'Show you can implement MVVM with or without a reactive framework.',
      'Mention that testability is the biggest advantage of MVVM.',
    ],
    relatedQuestions: ['async-await-swift', 'arc-memory-management'],
    prevSlug: 'async-await-swift',
    content: `
## MVC — Model-View-Controller

MVC is Apple's default iOS architecture pattern:

- **Model**: Data and business logic
- **View**: UI elements (UIView, UILabel, etc.)
- **Controller**: UIViewController — mediates between Model and View

\`\`\`
Model ←──── Controller ────→ View
  │                            │
  └────────────────────────────┘
         (Controller updates both)
\`\`\`

### MVC Example

\`\`\`swift
// Model
struct User: Codable {
    let id: Int
    let name: String
    let email: String
}

// View — UITableViewCell (pure UI)
class UserCell: UITableViewCell {
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var emailLabel: UILabel!
    
    func configure(with user: User) {
        nameLabel.text = user.name
        emailLabel.text = user.email
    }
}

// Controller — becomes massive easily
class UserViewController: UIViewController {
    @IBOutlet weak var tableView: UITableView!
    var users: [User] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        fetchUsers()
        setupTableView()
        // + Navigation logic
        // + Error handling  
        // + Business logic
        // + Data formatting
        // + Analytics tracking
        // Everything ends up here...
    }
    
    func fetchUsers() {
        URLSession.shared.dataTask(with: URL(string: "...")!) { data, _, _ in
            guard let data = data else { return }
            self.users = (try? JSONDecoder().decode([User].self, from: data)) ?? []
            DispatchQueue.main.async { self.tableView.reloadData() }
        }.resume()
    }
}
\`\`\`

**Problem: Massive View Controller (MVC)**
ViewControllers accumulate networking, parsing, formatting, navigation, and business logic — making them hard to test and maintain.

---

## MVVM — Model-View-ViewModel

MVVM adds a **ViewModel** layer between the Model and View:

- **Model**: Same as MVC — data and business logic
- **ViewModel**: Holds presentation logic, transforms model data for display
- **View**: UIViewController + UIView — observes ViewModel, thin/passive

\`\`\`
Model ←──── ViewModel ────→ View
                ↑                ↓
          (formats data)   (sends user actions)
\`\`\`

### MVVM Example

\`\`\`swift
// Model
struct User: Codable {
    let id: Int
    let name: String
    let email: String
}

// ViewModel — testable, no UIKit dependency
class UserListViewModel: ObservableObject {
    @Published var users: [User] = []
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    var userCount: String {
        "\\(users.count) users"
    }
    
    @MainActor
    func loadUsers() async {
        isLoading = true
        defer { isLoading = false }
        
        do {
            let url = URL(string: "https://api.example.com/users")!
            let (data, _) = try await URLSession.shared.data(from: url)
            users = try JSONDecoder().decode([User].self, from: data)
        } catch {
            errorMessage = error.localizedDescription
        }
    }
}

// SwiftUI View — thin, observes ViewModel
struct UserListView: View {
    @StateObject private var viewModel = UserListViewModel()
    
    var body: some View {
        NavigationView {
            Group {
                if viewModel.isLoading {
                    ProgressView()
                } else {
                    List(viewModel.users, id: \\.id) { user in
                        UserRow(user: user)
                    }
                }
            }
            .navigationTitle(viewModel.userCount)
        }
        .task { await viewModel.loadUsers() }
        .alert("Error", isPresented: .constant(viewModel.errorMessage != nil)) {
            Button("OK") { viewModel.errorMessage = nil }
        } message: {
            Text(viewModel.errorMessage ?? "")
        }
    }
}
\`\`\`

---

## Comparison

| Aspect | MVC | MVVM |
|--------|-----|------|
| Complexity | Low | Medium |
| Testability | Hard (VC has UIKit deps) | Easy (ViewModel has none) |
| ViewController size | Grows large | Stays thin |
| Data binding | Manual | Combine / @Published |
| Separation of concerns | Weak | Strong |
| Best for | Simple screens | Complex, testable apps |

---

## When to Use Each

**Use MVC when:**
- Building simple screens with minimal logic
- Prototyping or small apps
- Team is unfamiliar with reactive patterns

**Use MVVM when:**
- Business logic needs unit testing
- Screen has complex data transformation
- Using SwiftUI (natural fit with ObservableObject)
- Building a scalable, maintainable app
    `,
  },
];

export const interviewCategories = [
  'All Questions',
  'Swift',
  'SwiftUI',
  'UIKit',
  'iOS Fundamentals',
  'Memory Management',
  'Concurrency',
  'Architecture',
  'Networking',
  'Core Data',
  'App Store & Deployment',
];

export function getInterviewQuestion(slug: string): InterviewQuestion | undefined {
  return interviewQuestions.find(q => q.slug === slug);
}

export function getQuestionsByCategory(category: string): InterviewQuestion[] {
  if (category === 'All Questions') return interviewQuestions;
  return interviewQuestions.filter(q => q.category === category);
}
