## MODIFIED Requirements

### Requirement: CI pipeline uses compatible Hugo version
The CI pipeline SHALL use Hugo `0.147.0` (extended) to build the site, ensuring compatibility with `hextra v0.12.1`. The `hugo-version` field in `.github/workflows/deploy.yml` MUST be set to `0.147.0`.

#### Scenario: Successful site build in CI
- **WHEN** a commit is pushed to `main`
- **THEN** the Hugo build step SHALL complete without error using version `0.147.0`

#### Scenario: Hugo version is explicitly pinned
- **WHEN** the GitHub Actions workflow runs
- **THEN** the `hugo-version` field in `.github/workflows/deploy.yml` SHALL be set to `0.147.0`
