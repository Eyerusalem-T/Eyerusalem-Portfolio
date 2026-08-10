# Portfolio contact backend

A small Express API that:
- accepts messages from your portfolio's contact form (`POST /api/contact`)
- saves them to a local JSON file (`data/messages.json`)
- emails you a notification when a new one arrives
- gives you an **admin inbox** at `/admin` where you can read messages and **reply — the reply is emailed straight to the sender**


