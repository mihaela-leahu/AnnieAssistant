# EDITH

<!-- Replace YOUR-USERNAME after the CI workflow exists (we add it in a later step) -->
[![CI](https://github.com/YOUR-USERNAME/edith-assistant/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR-USERNAME/edith-assistant/actions/workflows/ci.yml)
<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-20232A?logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white" alt="Jest" />
  <img src="https://img.shields.io/badge/iOS-000000?logo=apple&logoColor=white" alt="iOS" />
</p>

<!-- TODO: record a short GIF of the app running and save it as docs/demo.gif -->
<!--
<p align="center">
  <img src="docs/demo.gif" alt="EDITH chatting and managing tasks" width="320" />
</p>
-->

**ANNIE** is a personal AI assistant for iOS. You talk to it in natural language, and it manages your to-do list and greets you every morning with a briefing of what is on your plate for the day.

> Status: early development. Features below are the roadmap, not all are built yet.

## What The Project Includes

- **Chat (`src/chat/`)**: the conversation screen and message handling.
- **Language understanding (`src/nlp/`)**: turns a sentence like "remind me to call mom tomorrow at 5" into a structured task. Pure TypeScript, unit-tested in isolation.
- **Tasks (`src/tasks/`)**: the to-do model, storage, and operations (add, edit, complete, delete).
- **Briefing (`src/briefing/`)**: builds the morning summary and schedules the daily notification.
- **App shell (`app/`)**: navigation and screens.

## Core Capabilities

Target feature set for v1.0:

- Chat with the assistant in natural language.
- Create, edit, complete, and delete tasks by talking to it.
- A morning briefing notification with today's to-do list.
- Data stored on the device, private to you.

Ideas for later versions: appointments and schedule, step and pulse tracking, voice input.

## Tech Stack

- Mobile: React Native with Expo
- Language: TypeScript
- Testing: Jest
- CI: GitHub Actions
- Version control: Git and GitHub

## Quick Start

### Prerequisites

- Node.js 20+
- The **Expo Go** app on your iPhone (App Store)
- Phone and computer on the same Wi-Fi network

### Run In Development

```bash
git clone https://github.com/YOUR-USERNAME/edith-assistant.git
cd edith-assistant
npm install
npx expo start
```

Scan the QR code with your iPhone camera to open the app in Expo Go.

### Other Commands

```bash
npm test             # run the unit tests
npx tsc --noEmit     # TypeScript check without emitting files
```

## Repository Layout

```text
edith-assistant/
├── app/             # screens and navigation
├── src/
│   ├── chat/        # chat UI and message handling
│   ├── nlp/         # natural language to structured tasks
│   ├── tasks/       # task model and storage
│   ├── briefing/    # morning briefing and notifications
│   └── shared/      # types and constants used by more than one area
├── docs/            # demo GIF and documentation assets
└── .github/
    └── workflows/   # CI (tests, type check)
```

## License

Released under the [MIT License](LICENSE).
