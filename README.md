# ScanBridge

**Understand. Prepare. Follow up.**

ScanBridge is a youth-led, safety-first public navigation project for medical imaging in Lebanon. It helps patients and families prepare for scans, find imaging facilities to contact, create a practical emergency-information card, and navigate the site with Milo, its bilingual chat assistant.

> ScanBridge provides general education and navigation only. It does not diagnose conditions, interpret images or reports, recommend treatment, or replace doctors or emergency services. In an emergency, call the Lebanese Red Cross on **140** or seek urgent care.

## Public launch

The initial pilot is complete and ScanBridge is now publicly available. The service remains transparent about its limits: center listings need confirmation by phone, Milo is not a clinician, and no pilot outcome is published unless it can be shared anonymously and responsibly.

## What is available

- 6 patient-friendly ScanPrep guides, including contrast-material guidance
- 58 imaging-facility listings across Lebanon, with source status shown on every listing
- English and Arabic support, with light and dark modes
- A local-only emergency preparation card that can be printed or downloaded
- Milo, a safety-bounded Gemini-powered navigation assistant
- Privacy Policy, Terms of Use, and a public contact form

## Privacy and forms

- The emergency card remains in the user’s browser unless they choose to print or download it.
- Milo messages are sent to Google Gemini to generate a response. Do not enter names, contact details, reports, images, or identifiable health information.
- Feedback and contact forms are received through Netlify Forms. Before production deployment, open **Netlify → Forms**, enable form detection, and redeploy.
- The public privacy notice is at [privacy.html](privacy.html); terms are at [terms.html](terms.html).

## Public materials

- [Launch overview poster](output/pdf/scanbridge-launch-overview.pdf)
- [Impact & launch page](impact.html)
- [Privacy Policy](privacy.html)
- [Terms of Use](terms.html)

## Maintaining the project

1. Confirm directory changes with the facility before updating a listing.
2. Review feedback and contact submissions in Netlify Forms; delete information that is no longer needed.
3. Keep the Gemini API key only in hosting environment variables, never in the repository or browser code.
4. Publish only anonymous, aggregate pilot learnings if you have real, consented data to support them.

## License

Released under the [MIT License](LICENSE).
