# Course Site (Hugo)

This directory contains the Hugo site for the course materials, using the [hextra](https://github.com/imfing/hextra) theme via Hugo Modules.

## Requirements

- Hugo extended v0.121.1 or later (see https://gohugo.io/getting-started/installing/)
- Go 1.21 or later (required for Hugo Modules)

## Setup

1. Install Hugo extended and Go for your platform.
2. Install Node.js dependencies (for tests):

```bash
npm install
```

## Local Preview

```bash
hugo server
```

## Build

```bash
hugo --minify -d public
```

The build output is written to `public/`.

## Features

### 簡報模式（Presentation Mode）

每個課程章節頁面右上角提供「簡報模式」按鈕。點擊後：

- 頁面進入全螢幕，內容以投影片方式呈現。
- Markdown 中的 `---` 水平線作為投影片分隔，每段之間自動切分為獨立一張投影片。
- 使用 `◀` / `▶` 按鈕或鍵盤 `←` / `→` 鍵切換投影片，`Escape` 或「退出簡報」按鈕退出全螢幕模式。

## Testing

### Unit Tests (Jest + jsdom)

```bash
npm test
```

### Unit Tests with Coverage

```bash
npm test -- --coverage
```

Coverage thresholds: Statements ≥ 80%, Branches ≥ 80%, Functions ≥ 80%, Lines ≥ 80%.

### E2E Tests (Playwright)

Start the Hugo dev server first, then run:

```bash
npx playwright test
```
