# GitHub Actions Workflows

This directory contains CI/CD workflows for the NestJS application.

## Workflows

### `unit-tests.yml`
Runs unit tests with code coverage on every push and pull request.

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` branch

**Steps:**
1. Checkout code
2. Setup Node.js 20.x with yarn cache
3. Install dependencies
4. Run linting (`yarn lint`)
5. Run type checking (`yarn build`)
6. Run unit tests with coverage (`yarn test:cov`)
7. Upload coverage to Codecov
8. Comment coverage report on pull requests

### `test.yml`
Comprehensive testing workflow including both unit and E2E tests.

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` branch

**Jobs:**
- **unit-tests**: Runs on Node.js 18.x and 20.x
- **e2e-tests**: Runs after unit tests pass

### `ci.yml`
Simple CI workflow for basic checks.

## Setup

### Codecov Integration

1. Go to [codecov.io](https://codecov.io)
2. Connect your GitHub repository
3. Get your Codecov token
4. Add it to your GitHub repository secrets:
   - Go to repository Settings → Secrets and variables → Actions
   - Add new repository secret named `CODECOV_TOKEN`
   - Paste your Codecov token

### Coverage Thresholds

The workflows will comment on pull requests with coverage information. Consider setting coverage thresholds in your `jest` configuration:

```json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

## Local Testing

To test the workflows locally:

```bash
# Install act for local GitHub Actions testing
brew install act

# Run the unit tests workflow
act -j test
```

## Artifacts

- Coverage reports are uploaded as artifacts
- E2E test results are uploaded as artifacts
- Artifacts are retained for 30 days