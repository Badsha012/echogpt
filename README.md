# EchoGPT Redesign

A responsive frontend concept for an EchoGPT product redesign assignment. It pairs a product landing page with an interactive AI workspace preview inspired by the web app and Chrome extension brief.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`.

## Technologies

- React 18 and TypeScript
- Vite
- lucide-react icons
- CSS with responsive layouts and reduced-motion support

## Included

- Responsive landing page with hero, model lineup, product preview, feature story, FAQ, CTA, and footer
- Interactive chat preview with model switching, mock replies, starter actions, chat history, settings, and light/dark mode
- Chrome extension popup concept with Ask, History, and Settings tabs, model selection, and prompt shortcuts
- Keyboard-friendly prompt entry and accessible labels

## Assumptions

This is a frontend-only concept. AI replies are simulated in the browser; authentication, provider API connections, persistence, and the actual Chrome extension package are not connected. The model names illustrate the product concept and do not imply active provider access. Google Fonts are loaded from the fonts.googleapis.com CDN, with local fallbacks.
