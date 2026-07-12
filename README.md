# ScanBridge

ScanBridge is a safety-first health-navigation project that helps families understand, prepare for, access, and follow up after medical imaging. It provides general educational information and never diagnoses, interprets scans, or replaces professional medical care.

## Week 1 foundation

This first prototype includes:

- A public homepage and project positioning
- Planned ScanPrep guide, center-directory, and emergency-card sections
- A plain-language safety commitment
- An early feedback form that stores entries locally in the browser

## Open locally

Open `index.html` in a browser. No build step or external dependencies are needed beyond the optional web fonts.

## Run live Milo

Milo can use Gemini through the included local/server setup, never from a browser API key.

1. Create a free Gemini API key in [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Set `GEMINI_API_KEY` as a private environment variable (see `.env.example`).
3. Run `npm start`.
4. Open `http://localhost:3000`.

Without a key, Milo reports that live chat is not connected. With a key, the server calls Gemini while enforcing Milo’s navigation-only rules and approved links.

## Next Week 1 work

1. Finalise the founder story and About-page wording.
2. Select a permanent logo and visual assets.
3. Choose feedback collection/storage for the public version.
4. Define the imaging-center data fields and verification process.
