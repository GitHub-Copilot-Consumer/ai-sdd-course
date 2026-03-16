## Why

The GitHub Actions CI pipeline is pinned to Hugo `0.120.4`, but the project's theme (`hextra v0.12.1`) requires a newer Hugo version that supports the `try` template function (introduced after 0.120.4). Every deployment currently fails with a hard build error.

## What Changes

- Bump the `hugo-version` in `.github/workflows/deploy.yml` from `0.120.4` to a compatible version (`0.147.0` or latest stable).

## Capabilities

### New Capabilities

_(none — this is a CI configuration fix, no new product capabilities are introduced)_

### Modified Capabilities

_(none — no spec-level behavior changes)_

## Impact

- `.github/workflows/deploy.yml`: single line change to `hugo-version`
- No application code changes
- No Go module changes (`site/go.mod` already pins `hextra v0.12.1` correctly)
- Unblocks all future deployments to GitHub Pages
