## Context

The CI pipeline (`.github/workflows/deploy.yml`) pins Hugo to `0.120.4`. The Hextra theme (`v0.12.1`) uses the `{{ try }}` template function which was introduced in Hugo `0.121.0`. This causes a hard build failure on every deploy. No application code or Go module changes are needed — the fix is isolated to the workflow file.

## Goals / Non-Goals

**Goals:**
- Restore working deployments to GitHub Pages
- Pin Hugo to a version that is compatible with `hextra v0.12.1`

**Non-Goals:**
- Upgrading the Hextra theme version
- Changing Hugo configuration or site content
- Modifying Go module dependencies

## Decisions

### Pin Hugo to `0.147.0`

- `hextra v0.12.1` requires Hugo `>= 0.121.0` (for `try` function support)
- `0.147.0` is a recent stable extended release, well-tested with Hextra
- Pinning to an explicit version (rather than `latest`) keeps builds reproducible

**Alternatives considered:**
- `0.121.0` — minimum viable version, but unnecessarily close to the breaking boundary; no benefit over a more recent stable
- `latest` — non-deterministic, risks future breakage from upstream changes

### No changes to `site/go.mod`

The Go module already correctly pins `hextra v0.12.1`. Only the CI Hugo version is wrong.

## Risks / Trade-offs

- [New Hugo version introduces deprecation warnings] → Acceptable; warnings do not block the build. Can be addressed separately if needed.
- [Hugo version bump could change rendered output subtly] → Low risk for a patch-level content site; visual review after deploy is sufficient.

## Migration Plan

1. Update `hugo-version` in `.github/workflows/deploy.yml` from `0.120.4` to `0.147.0`
2. Push to `main` — CI triggers automatically
3. Verify GitHub Pages deployment succeeds

**Rollback**: Revert the single-line change and push. No data or state is affected.
