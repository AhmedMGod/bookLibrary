Projektübersicht
Dies ist eine Bücherverwaltungs-App, die es Benutzern ermöglicht, Bücher zu verwalten, auszuleihen und zurückzugeben.
Das Projekt verwendet React mit TypeScript für das Frontend und Spring Boot für das Backend.
Es unterstützt Benutzerregistrierung, Authentifizierung und Buchausleihe.

Technologie-Stack

Frontend: React mit TypeScript

Backend: Spring Boot (Java)

Datenbank: MongoBD

Sicherheit: JWT für Authentifizierung (optional)

Build- und Deployment-Tools: Maven, GitHub Actions

Funktionalitäten

Benutzerfunktionen

Registrierung und Login: Benutzer können sich registrieren, einloggen und ihr Profil verwalten.

Buchausleihe: Benutzer können verfügbare Bücher ausleihen und zurückgeben.

Bücher durchsuchen: Eine Liste aller verfügbaren Bücher mit Filter- und Suchfunktionen anzeigen.

Admin-Funktionen

Bücher verwalten: Administratoren können Bücher hinzufügen, bearbeiten und löschen.

Benutzer verwalten: Administratoren können Benutzerinformationen verwalten.

API-Endpunkte

Benutzer

POST /api/users/register – Benutzer registrieren

POST /api/users/login – Benutzer authentifizieren (JWT)

Bücher

GET /api/books – Alle Bücher anzeigen

GET /api/books/{id} – Einzelnes Buch anzeigen

POST /api/books – Buch hinzufügen (Admin)

PUT /api/books/{id} – Buch aktualisieren (Admin)

DELETE /api/books/{id} – Buch löschen (Admin)

Ausleihe

POST /api/loans – Buch ausleihen

PUT /api/loans/{id}/return – Buch zurückgeben