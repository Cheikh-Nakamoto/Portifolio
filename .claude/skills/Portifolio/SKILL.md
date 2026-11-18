```markdown
# Portifolio Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the development patterns and conventions used in the "Portifolio" TypeScript repository. It covers file organization, import/export styles, commit message habits, and testing patterns, providing a comprehensive guide for contributing to or maintaining the codebase.

## Coding Conventions

### File Naming
- Use **PascalCase** for all file names.
  - **Example:** `UserProfile.ts`, `ProjectList.tsx`

### Import Style
- Use **alias** imports to reference modules.
  - **Example:**
    ```typescript
    import { UserService } from 'services/UserService';
    ```

### Export Style
- Use **named exports** for modules and components.
  - **Example:**
    ```typescript
    export function UserProfile() {
      // ...
    }
    ```

### Commit Patterns
- Commit messages are **freeform** with no enforced prefixes.
- Average commit message length is **21 characters**.
  - **Example:**  
    ```
    Add new project card
    ```

## Workflows

### Adding a New Feature
**Trigger:** When implementing a new feature or component  
**Command:** `/add-feature`

1. Create a new file using PascalCase naming (e.g., `NewFeature.ts`).
2. Implement the feature using TypeScript.
3. Use alias imports for dependencies.
4. Export the feature using named exports.
5. Write corresponding tests in a `.test.ts` file.
6. Commit changes with a concise, descriptive message.

### Refactoring Existing Code
**Trigger:** When improving or restructuring existing code  
**Command:** `/refactor-code`

1. Identify the target files to refactor.
2. Update file names to PascalCase if necessary.
3. Refactor code, maintaining alias imports and named exports.
4. Update or add tests as needed.
5. Commit changes with a clear, freeform message.

### Running Tests
**Trigger:** When verifying code correctness  
**Command:** `/run-tests`

1. Locate test files matching the `*.test.*` pattern.
2. Use the project's test runner (framework unknown; check project scripts).
3. Review test output and fix any failing tests.

## Testing Patterns

- Test files use the pattern `*.test.*` (e.g., `UserProfile.test.ts`).
- The testing framework is **unknown**; check the repository for configuration or scripts.
- Place tests alongside the modules they test or in a dedicated test directory.
- Example test file:
  ```typescript
  // UserProfile.test.ts
  import { UserProfile } from 'components/UserProfile';

  describe('UserProfile', () => {
    it('renders correctly', () => {
      // test implementation
    });
  });
  ```

## Commands
| Command        | Purpose                                    |
|----------------|--------------------------------------------|
| /add-feature   | Scaffold and implement a new feature       |
| /refactor-code | Refactor existing code and update patterns |
| /run-tests     | Run all test suites in the repository      |
```
