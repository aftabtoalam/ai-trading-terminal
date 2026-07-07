# Nexus Alpha OSS
 
An open-source crypto trading terminal UI, built in plain HTML/CSS/JS. Live charts, an AI signal panel, a risk calculator, and a dashboard layout you can actually customize without fighting a framework.
 
![Terminal Preview](terminal-preview.png)
 
I built this as a starting point for anyone who wants to ship a trading dashboard, AI trading assistant, or portfolio tool without building the UI layer from zero. Fork it, gut it, make it yours.
 
If this saves you a weekend of UI work, a ⭐ on the repo goes a long way — helps other people building trading tools find it too.
 
## What's in it
 
- **Trading terminal layout** — dense, dark-themed dashboard meant for people who actually stare at charts all day, not a marketing landing page.
- **TradingView Lightweight Charts** integration — resizable chart workspace, crosshair data, custom grid styling.
- **Live Binance market data** — real-time price feeds and basic performance stats out of the box.
- **AI signal panel** — a spot to plug in your own model's output: direction, entry, take-profit, stop-loss, and a short written brief.
- **Risk management widget** — calculates position size and unit allocation based on leverage input.
- **Custom oscillators/indicators** — multi-timeframe trend and volatility trackers you can extend.
- **Confidence score display** — visual readout for however you're scoring model certainty.
- **Multi-timeframe switching** — 1M / 5M / 15M / 1H / 4H, instant state swap.
- **Responsive layout** — holds up across different monitor sizes, not just a fixed 1440px mockup.
No React, no build step. Just files you can open and edit.
 
## Project structure
 
```
├── index.html
├── style.css
├── utils.js
├── indicators.js
├── chart.js
├── api.js
├── ai.js
├── ui.js
└── app.js
```
 
Scripts load in this order at the bottom of `index.html` — keep it this way, later files depend on globals set by earlier ones:
 
```html
<script src="utils.js"></script>
<script src="indicators.js"></script>
<script src="chart.js"></script>
<script src="api.js"></script>
<script src="ai.js"></script>
<script src="ui.js"></script>
<script src="app.js"></script>
```
 
## Setup
 
```bash
git clone https://github.com/yourusername/nexus-alpha-oss.git
```
 
Open `index.html`. That's it, there's no build step.
 
If you're wiring up your own AI backend, drop your API key in `ai.js`:
 
```javascript
const apiKey = "YOUR_API_KEY_HERE";
```
 
Don't commit real keys — swap this for an env-based setup if you're deploying anywhere public.
 
## Customizing
 
- **Colors** — CSS variables at the top of `style.css`.
- **Trading pairs** — edit the dropdown list in the header markup.
- **Indicators** — add your own math in `indicators.js`.
- **AI logic** — prompts, schema, response parsing all live in `ai.js`.
- **Risk engine** — position sizing rules are in the risk widget's event handlers.
- **Charts** — grid colors, price lines, candle styling all configurable in `chart.js`.
- **Backend** — swap the Binance calls in `api.js` for your own exchange or private API.
Everything's split into separate files on purpose, so you're not hunting through one 2000-line app.js to change a color.
 
## Why this is open source
 
I wanted a decent-looking trading terminal UI to exist as a free starting point, instead of everyone rebuilding the same dashboard from scratch. Use it for a side project, a real product, a portfolio piece — whatever. If you ship something with it, I'd genuinely like to see it, open an issue or tag me.
 
## Disclaimer
 
This is a UI/dev tool, not financial advice. Nothing here is a signal to trade on. Do your own research, and if you're plugging in a real AI model or real money, that's on you.
