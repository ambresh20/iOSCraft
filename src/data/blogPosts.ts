import type { BlogPost } from '../types/content';

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-001',
    title: '10 Swift Tips Every iOS Developer Should Know in 2024',
    slug: 'swift-tips-ios-developer-2024',
    description: 'Practical Swift tips covering optionals, closures, protocols, and modern concurrency that will improve your code quality.',
    excerpt: 'From using defer for cleanup to leveraging async/await for cleaner networking code, these tips will level up your Swift skills.',
    category: 'Swift Tips',
    tags: ['swift', 'tips', 'best-practices', 'ios'],
    readingTime: 8,
    publishedAt: '2024-01-15',
    author: 'iOSCraft Team',
    featured: true,
    content: `
## 1. Use defer for Cleanup

\`defer\` runs code when the current scope exits, regardless of how it exits (normally or via error):

\`\`\`swift
func processFile(name: String) throws {
    let file = openFile(name)
    defer { file.close() }  // Always closes, even if error is thrown
    
    try processContent(file)
}
\`\`\`

## 2. Prefer guard for Early Exit

Instead of deeply nested if-let chains, use guard:

\`\`\`swift
// ❌ Pyramid of doom
func process(_ data: Data?) {
    if let data = data {
        if let json = try? JSONSerialization.jsonObject(with: data) {
            if let dict = json as? [String: Any] {
                // Finally doing something...
            }
        }
    }
}

// ✅ Flat and readable
func process(_ data: Data?) {
    guard let data = data else { return }
    guard let json = try? JSONSerialization.jsonObject(with: data) else { return }
    guard let dict = json as? [String: Any] else { return }
    // Doing something
}
\`\`\`

## 3. Use compactMap to Filter Nils

\`\`\`swift
let strings = ["1", "two", "3", "four", "5"]
let numbers = strings.compactMap { Int($0) }
// [1, 3, 5]
\`\`\`

## 4. Nil-Coalescing for Defaults

\`\`\`swift
let username = storedUsername ?? "Guest"
let count = optionalCount ?? 0
\`\`\`

## 5. String Interpolation with Custom Types

\`\`\`swift
struct User {
    let name: String
}

extension User: CustomStringConvertible {
    var description: String { "User(\\(name))" }
}

let user = User(name: "Alice")
print("Current user: \\(user)")  // Current user: User(Alice)
\`\`\`

## 6. Use enum for State

\`\`\`swift
enum LoadingState<T> {
    case idle
    case loading
    case success(T)
    case failure(Error)
}

var state: LoadingState<[User]> = .idle
\`\`\`

## 7. Leverage Computed Properties

\`\`\`swift
struct Circle {
    var radius: Double
    
    var area: Double { Double.pi * radius * radius }
    var circumference: Double { 2 * Double.pi * radius }
    var diameter: Double {
        get { radius * 2 }
        set { radius = newValue / 2 }
    }
}
\`\`\`

## 8. Use where in Generic Constraints

\`\`\`swift
func printAll<T>(_ items: [T]) where T: CustomStringConvertible {
    items.forEach { print($0.description) }
}
\`\`\`

## 9. Avoid Force Unwrapping in Production

Replace \`!\` with safe alternatives:

\`\`\`swift
// ❌ Dangerous
let url = URL(string: "https://example.com")!

// ✅ Safe
guard let url = URL(string: "https://example.com") else { return }
\`\`\`

## 10. async/await for Clean Networking

\`\`\`swift
func fetchUsers() async throws -> [User] {
    let url = URL(string: "https://api.example.com/users")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode([User].self, from: data)
}
\`\`\`
    `,
  },
  {
    id: 'blog-002',
    title: 'Understanding SwiftUI\'s State Management: A Complete Guide',
    slug: 'swiftui-state-management-guide',
    description: 'Deep dive into @State, @Binding, @ObservedObject, @StateObject, @EnvironmentObject, and the new @Observable macro.',
    excerpt: 'SwiftUI offers multiple tools for managing state. Learn when to use each one and avoid common pitfalls.',
    category: 'SwiftUI',
    tags: ['swiftui', 'state', 'observable', 'property-wrappers'],
    readingTime: 12,
    publishedAt: '2024-01-20',
    author: 'iOSCraft Team',
    featured: true,
    content: `
## The SwiftUI State Hierarchy

Understanding which property wrapper to use is one of the most important skills in SwiftUI development.

### @State — Local Truth

\`\`\`swift
struct CounterView: View {
    @State private var count = 0
    
    var body: some View {
        Button("Count: \\(count)") { count += 1 }
    }
}
\`\`\`

### @Binding — Two-Way Reference

\`\`\`swift
struct ToggleView: View {
    @Binding var isOn: Bool
    
    var body: some View {
        Toggle("Enable", isOn: $isOn)
    }
}
\`\`\`

### @ObservedObject — External Reference Type

\`\`\`swift
class UserViewModel: ObservableObject {
    @Published var name = ""
    @Published var email = ""
}

struct ProfileView: View {
    @ObservedObject var viewModel: UserViewModel
    
    var body: some View {
        TextField("Name", text: $viewModel.name)
    }
}
\`\`\`

### @StateObject — Owned Observable

Use when the view creates and owns the object:

\`\`\`swift
struct RootView: View {
    @StateObject private var viewModel = UserViewModel()
    
    var body: some View {
        ProfileView(viewModel: viewModel)
    }
}
\`\`\`

### @EnvironmentObject — Dependency Injection

\`\`\`swift
class AppSettings: ObservableObject {
    @Published var theme: Theme = .dark
}

@main
struct MyApp: App {
    @StateObject private var settings = AppSettings()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(settings)
        }
    }
}

struct ThemeView: View {
    @EnvironmentObject var settings: AppSettings
    
    var body: some View {
        Text("Current theme: \\(settings.theme.rawValue)")
    }
}
\`\`\`

### @Observable (Swift 5.9+)

The new Observation framework simplifies state management:

\`\`\`swift
import Observation

@Observable
class UserModel {
    var name = ""
    var age = 0
}

struct UserView: View {
    var model: UserModel  // No wrapper needed!
    
    var body: some View {
        Text(model.name)
    }
}
\`\`\`

## Decision Guide

| Scenario | Use |
|----------|-----|
| Local view state | @State |
| Pass state to child | @Binding |
| External observable object (you don't own it) | @ObservedObject |
| External observable object (you create it) | @StateObject |
| App-wide shared state | @EnvironmentObject |
| Swift 5.9+ modern approach | @Observable |
    `,
  },
  {
    id: 'blog-003',
    title: 'iOS Developer Roadmap 2024: From Beginner to Job-Ready',
    slug: 'ios-developer-roadmap-2024',
    description: 'A structured learning path for aspiring iOS developers covering Swift fundamentals through architecture and portfolio building.',
    excerpt: 'Follow this practical roadmap to go from zero to job-ready iOS developer, with resources and milestones for each stage.',
    category: 'Career & Learning',
    tags: ['roadmap', 'career', 'learning', 'ios', 'swift'],
    readingTime: 10,
    publishedAt: '2024-01-25',
    author: 'iOSCraft Team',
    featured: true,
    content: `
## Stage 1: Programming Fundamentals (Weeks 1-4)

Before Swift, ensure you understand:
- Variables, data types, operators
- Control flow (if/else, loops)
- Functions and scope
- Basic data structures (arrays, dictionaries)

**Milestone**: Write a command-line calculator in Swift.

## Stage 2: Swift Language (Weeks 5-10)

Core Swift concepts:
- Optionals and safe unwrapping
- Structs, classes, enums
- Protocols and extensions
- Closures and higher-order functions
- Error handling

**Milestone**: Build a simple To-Do list model layer with no UI.

## Stage 3: Xcode and Git (Week 3)

- Xcode workspace navigation
- Build and run apps on simulator
- Git basics: commit, push, pull, branch
- GitHub for portfolio

## Stage 4: UIKit or SwiftUI (Weeks 11-20)

**SwiftUI** (recommended for beginners in 2024):
- Views and modifiers
- State management
- Navigation
- Lists and grids

**UIKit** (still essential):
- UIViewController lifecycle
- Auto Layout
- UITableView, UICollectionView
- Navigation controllers

**Milestone**: Build a weather app or notes app.

## Stage 5: Networking and Persistence (Weeks 21-26)

- URLSession and REST APIs
- Codable for JSON parsing
- UserDefaults for simple storage
- Core Data for complex data

## Stage 6: Architecture (Weeks 27-32)

- MVVM with SwiftUI
- Clean Architecture principles
- Dependency injection
- SOLID principles

## Stage 7: Testing (Weeks 33-36)

- XCTest unit testing
- UI testing
- Writing testable code

## Stage 8: Portfolio and Interview Prep (Weeks 37-52)

- Build 2-3 substantial projects
- Deploy to App Store
- Practice DSA in Swift
- Mock interviews

**Resources on iOSCraft:**
- Swift tutorials: /learn
- Interview questions: /interview
- DSA problems: /dsa
    `,
  },
  {
    id: 'blog-004',
    title: 'Mastering Auto Layout Programmatically in UIKit',
    slug: 'auto-layout-programmatic-uikit',
    description: 'Learn how to create UIKit layouts without Storyboards using NSLayoutConstraint and layout anchors.',
    excerpt: 'Storyboards are convenient, but programmatic Auto Layout gives you full control and better team collaboration.',
    category: 'iOS Development',
    tags: ['uikit', 'auto-layout', 'programmatic-ui', 'constraints'],
    readingTime: 11,
    publishedAt: '2024-02-01',
    author: 'iOSCraft Team',
    content: `
## Why Programmatic Auto Layout?

- No merge conflicts in Storyboard XML files
- Reusable view components
- Full IDE code completion support
- Dynamic layouts based on runtime data

## Setting Up a View

\`\`\`swift
class ProfileViewController: UIViewController {
    
    // 1. Declare views
    private let avatarImageView: UIImageView = {
        let imageView = UIImageView()
        imageView.translatesAutoresizingMaskIntoConstraints = false
        imageView.contentMode = .scaleAspectFill
        imageView.clipsToBounds = true
        imageView.layer.cornerRadius = 50
        imageView.backgroundColor = .systemGray5
        return imageView
    }()
    
    private let nameLabel: UILabel = {
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        label.font = .systemFont(ofSize: 24, weight: .bold)
        label.textAlignment = .center
        return label
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupViews()
        setupConstraints()
    }
    
    // 2. Add views to hierarchy
    private func setupViews() {
        view.addSubview(avatarImageView)
        view.addSubview(nameLabel)
    }
    
    // 3. Set up constraints using anchors
    private func setupConstraints() {
        NSLayoutConstraint.activate([
            // Avatar: center horizontally, 80pt from top, 100x100
            avatarImageView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            avatarImageView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 80),
            avatarImageView.widthAnchor.constraint(equalToConstant: 100),
            avatarImageView.heightAnchor.constraint(equalToConstant: 100),
            
            // Name: below avatar, with horizontal padding
            nameLabel.topAnchor.constraint(equalTo: avatarImageView.bottomAnchor, constant: 16),
            nameLabel.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            nameLabel.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
        ])
    }
}
\`\`\`

## Stack Views for Complex Layouts

\`\`\`swift
private func makeInfoStack() -> UIStackView {
    let stack = UIStackView()
    stack.translatesAutoresizingMaskIntoConstraints = false
    stack.axis = .vertical
    stack.spacing = 12
    stack.alignment = .fill
    stack.distribution = .fill
    return stack
}
\`\`\`

## Important: translatesAutoresizingMaskIntoConstraints

Always set this to \`false\` for views you add constraints to:

\`\`\`swift
view.translatesAutoresizingMaskIntoConstraints = false
\`\`\`

Forgetting this is the most common Auto Layout mistake.
    `,
  },
  {
    id: 'blog-005',
    title: 'MVVM Architecture in SwiftUI: A Practical Implementation',
    slug: 'mvvm-swiftui-practical',
    description: 'Implement the MVVM pattern in a real SwiftUI app with networking, error handling, and testing.',
    excerpt: 'MVVM and SwiftUI are a natural fit. Learn how to structure your app for maximum testability and maintainability.',
    category: 'iOS Development',
    tags: ['mvvm', 'swiftui', 'architecture', 'testing'],
    readingTime: 13,
    publishedAt: '2024-02-05',
    author: 'iOSCraft Team',
    content: `
## Project Structure

\`\`\`
Features/
  Users/
    Models/
      User.swift
    ViewModels/
      UserListViewModel.swift
      UserDetailViewModel.swift
    Views/
      UserListView.swift
      UserDetailView.swift
    Services/
      UserService.swift
\`\`\`

## The Model

\`\`\`swift
struct User: Codable, Identifiable {
    let id: Int
    let name: String
    let email: String
    let username: String
}
\`\`\`

## The Service Layer

\`\`\`swift
protocol UserServiceProtocol {
    func fetchUsers() async throws -> [User]
}

class UserService: UserServiceProtocol {
    func fetchUsers() async throws -> [User] {
        let url = URL(string: "https://jsonplaceholder.typicode.com/users")!
        let (data, _) = try await URLSession.shared.data(from: url)
        return try JSONDecoder().decode([User].self, from: data)
    }
}
\`\`\`

## The ViewModel

\`\`\`swift
@MainActor
class UserListViewModel: ObservableObject {
    @Published var users: [User] = []
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    private let service: UserServiceProtocol
    
    init(service: UserServiceProtocol = UserService()) {
        self.service = service
    }
    
    func loadUsers() async {
        isLoading = true
        defer { isLoading = false }
        
        do {
            users = try await service.fetchUsers()
        } catch {
            errorMessage = "Failed to load users: \\(error.localizedDescription)"
        }
    }
    
    var filteredByName: [User] {
        users.sorted { $0.name < $1.name }
    }
}
\`\`\`

## The View

\`\`\`swift
struct UserListView: View {
    @StateObject private var viewModel = UserListViewModel()
    
    var body: some View {
        NavigationStack {
            Group {
                if viewModel.isLoading {
                    ProgressView("Loading...")
                } else {
                    userList
                }
            }
            .navigationTitle("Users")
            .alert("Error", isPresented: .constant(viewModel.errorMessage != nil)) {
                Button("OK") { viewModel.errorMessage = nil }
            } message: {
                Text(viewModel.errorMessage ?? "")
            }
        }
        .task { await viewModel.loadUsers() }
    }
    
    private var userList: some View {
        List(viewModel.filteredByName) { user in
            NavigationLink(destination: UserDetailView(user: user)) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(user.name).font(.headline)
                    Text(user.email).font(.caption).foregroundStyle(.secondary)
                }
            }
        }
    }
}
\`\`\`

## Testing the ViewModel

\`\`\`swift
class MockUserService: UserServiceProtocol {
    var usersToReturn: [User] = []
    var errorToThrow: Error?
    
    func fetchUsers() async throws -> [User] {
        if let error = errorToThrow { throw error }
        return usersToReturn
    }
}

// XCTest
func testLoadUsersSuccess() async {
    let mockService = MockUserService()
    mockService.usersToReturn = [User(id: 1, name: "Alice", email: "a@b.com", username: "alice")]
    
    let vm = await UserListViewModel(service: mockService)
    await vm.loadUsers()
    
    XCTAssertEqual(vm.users.count, 1)
    XCTAssertEqual(vm.users.first?.name, "Alice")
}
\`\`\`
    `,
  },
  {
    id: 'blog-006',
    title: 'Top 20 iOS Interview Questions and How to Answer Them',
    slug: 'top-ios-interview-questions',
    description: 'Prepare for your iOS interview with these commonly asked questions and structured answers.',
    excerpt: 'These 20 questions cover Swift fundamentals, memory management, architecture, and concurrency — the core of any iOS interview.',
    category: 'Interview Preparation',
    tags: ['interview', 'ios', 'swift', 'preparation'],
    readingTime: 15,
    publishedAt: '2024-02-10',
    author: 'iOSCraft Team',
    featured: true,
    content: `
## How to Approach iOS Interviews

iOS technical interviews typically cover:
1. Swift language fundamentals
2. Memory management (ARC)
3. iOS frameworks (UIKit, SwiftUI)
4. Architecture and design patterns
5. Data structures and algorithms
6. Debugging and performance

---

## Top 20 Questions

### 1. What is ARC?
ARC (Automatic Reference Counting) manages class instance memory. When no strong references point to an instance, it is deallocated.

### 2. What is a retain cycle?
When two class instances hold strong references to each other, neither can be deallocated. Fix with weak or unowned.

### 3. Struct vs Class?
Structs are value types (copied). Classes are reference types (shared). Prefer structs for data models.

### 4. What is optional chaining?
\`\`\`swift
let length = user?.address?.street?.count
\`\`\`

### 5. What is @MainActor?
Ensures code runs on the main thread. Used with ObservableObject view models in SwiftUI.

### 6. What is Codable?
Protocol combining Encodable and Decodable. Enables easy JSON parsing:
\`\`\`swift
struct User: Codable { let name: String }
\`\`\`

### 7. What is the difference between frame and bounds?
- frame: position and size in parent's coordinate space
- bounds: position and size in own coordinate space

### 8. Explain MVVM.
Model handles data, ViewModel handles presentation logic, View displays data and sends user actions.

### 9. What is a protocol?
A blueprint of methods and properties that a type must implement. Key to Swift's protocol-oriented programming.

### 10. What is @escaping?
Marks a closure that outlives the function it's passed to (e.g., stored for later use or called asynchronously).

*...and 10 more questions in the full article.*

---

For detailed answers with code examples, visit the [Interview Preparation](/interview) section.
    `,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(p => p.featured);
}

export const blogCategories = [
  'All',
  'Swift Tips',
  'iOS Development',
  'SwiftUI',
  'Interview Preparation',
  'DSA',
  'Career & Learning',
];
