# PrimeSA Digital Solutions

A static business website for PrimeSA Digital Solutions, a South African web development business founded by Sahil Phakathwayo. The site introduces services, shows fictional demonstration projects, presents proposed introductory prices and points enquiries to WhatsApp.

## Project files

- `index.html` contains the page content and accessible, semantic sections.
- `styles.css` contains the responsive visual design and layouts for small screens.
- `config.js` contains public business contact details and editable introductory prices.
- `script.js` applies the public configuration, builds WhatsApp links, controls the mobile menu and identifies the enquiry form as a demonstration.

The `assets` folder is not required: the design uses local CSS and inline SVG rather than external image files.

## Open the website

For a quick preview, open `index.html` in a modern web browser.

For a local development server, open a terminal in this folder and run:

```text
npx serve .
```

This command uses npm's package runner and may download the temporary `serve` tool if it is not already available. No project dependencies are needed for the website itself. If you prefer not to download anything, use the browser to open `index.html` directly.

## Change the business details

Edit the values in `config.js`:

- `businessName` changes the business name shown in the configured page locations.
- `founder` changes the founder's name shown in the configured page locations.
- `country`, `currency` and `currencySymbol` describe the business and price display.
- `whatsappNumber` is the WhatsApp link destination in international digits only: `27835515085`.
- `whatsappDisplayNumber` is the human-readable contact number on the page.

Update both WhatsApp number values together if the approved business contact changes. The site uses the configured number to create `https://wa.me/` links. `config.js` is downloaded by visitors, so it must contain public information only. Never put passwords, secret API keys or private credentials in a website configuration file.

The site includes written content in `index.html` as well. Review that content if you change the business details so the page remains accurate.

## Change the proposed prices

The editable example amounts are in `config.js`, under `prices`:

- `starter.amount` — Starter Website.
- `business.amount` — Business Website.
- `maintenance.amount` — Website Maintenance.
- `simple.amount` — Simple Website (R300 once-off).

The maintenance cadence is shown as monthly. The Simple Website package has a once-off price and its inclusions, exclusions and single minor-revision round are listed in the pricing section. Extra work and costs must be agreed before work begins.

## Feature status

Implemented:

- Responsive single-page layout with section navigation.
- Keyboard-visible focus indicators and a skip link.
- Expandable FAQ entries using native HTML.
- WhatsApp links built from the configured business contact and encoded enquiry messages.
- An enquiry form that validates required fields and opens WhatsApp with a prepared message containing the customer's details.
- Prices, selected business details and copyright year set from JavaScript/configuration.
- A mobile navigation menu with open, close, Escape-key and resize behaviour.

Important limitations:

- The enquiry form opens WhatsApp with a prepared message; the customer must review it and press **Send** in WhatsApp. The website does not save the form details or confirm message delivery.
- Portfolio entries are fictional sample concepts, not clients or claims of completed client projects.

## Before publishing

1. Confirm that the business contact details, proposed prices, wording and service scope are approved.
2. Test the WhatsApp enquiry flow on the devices and browsers your customers use. Explain that the customer must press **Send** in WhatsApp.
3. Confirm domain, hosting, privacy, accessibility and any other requirements for the intended use.
4. Check the completed website on real devices and browsers, including that WhatsApp opens the intended contact and its prefilled message.

No deployment, paid service, database, payment flow or submission backend is configured by this project.
