# ⚡ Castform AI - LinkedIn Post Generator

En vacker, säker webbapplikation för att generera engagerande LinkedIn-inlägg och bilder med AI, specifikt optimerad för IT-rekrytering i Sverige.

## 🎯 Om Verktyget

Detta är Castform AI:s LinkedIn Post Generator, specialdesignad för **Roger Kårsjö** från **D-Source** – ett svenskt IT-konsult- och rekryteringsbolag. Verktyget hjälper till att skapa professionella LinkedIn-inlägg om IT-rekrytering och automatiskt generera matchande bilder.

## ✨ Funktioner

**📝 LinkedIn-inlägggenerering**
- Genererar professionella, engagerande inlägg på svenska
- Anpassat för IT-rekrytering och konsultbranschen
- Automatisk formatering med rätt mellanrum och emojis
- Använder unicode-tecken för fet och kursiv text (fungerar på LinkedIn!)
- Ett klick för att kopiera med formatering bevarad

**🎨 AI-bildgenerering**
- Skapa anpassade bilder för dina LinkedIn-inlägg
- Drivs av Kyyy.ai
- Högkvalitativa 1024x1024 bilder
- Enkel nedladdningsfunktion

**🔒 Säkerhet**
- Dina API-nycklar lagras säkert på servern
- Användare kan aldrig se eller komma åt dina nycklar
- All API-kommunikation går genom din säkra backend

## 📁 Projektstruktur

```
linkedin-post-generator/
├── index.html              # Frontend HTML
├── style.css              # Styling med Castform-branding
├── script.js              # Frontend JavaScript
├── backend/
│   ├── server.js          # Express.js backend (för lokal utveckling)
│   ├── cloudflare-worker.js  # Cloudflare Worker version
│   └── package.json       # Backend dependencies
├── .gitignore             # Skyddar känsliga filer
├── wrangler.toml          # Cloudflare Workers config
├── README.md              # Denna fil
└── DEPLOYMENT.md          # Fullständig deployment-guide
```

## 🚀 Snabbstart (Lokal Utveckling)

### 1. Klona Repository

```bash
git clone https://github.com/Castform-AI-Solutions-LTD/linkedin-post-generator.git
cd linkedin-post-generator
```

### 2. Sätt upp Backend

```bash
cd backend
npm install
```

### 3. Skapa .env-fil

Skapa en fil `backend/.env`:

```env
OPENAI_API_KEY=ditt-openai-api-key
OPENAI_ORG_ID=ditt-org-id
KYYY_API_KEY=ditt-kyyy-api-key
PORT=3000
```

**VIKTIGT:** Lägg ALDRIG till .env-filen i git!

### 4. Starta Backend

```bash
# Från backend-mappen
npm start
```

Backend körs nu på `http://localhost:3000`

### 5. Öppna Frontend

I en ny terminal:

```bash
# Från root-mappen
# Använd Python
python -m http.server 8080

# ELLER använd Node.js
npx serve

# ELLER öppna bara index.html i din webbläsare
```

Öppna `http://localhost:8080` i din webbläsare.

## 🌐 Deployment till Produktion

För att deploya till GitHub + Cloudflare (rekommenderat):

**Se [DEPLOYMENT.md](DEPLOYMENT.md) för detaljerad guide!**

Kort version:
1. Pusha kod till GitHub
2. Deploya backend till Cloudflare Workers
3. Deploya frontend till Cloudflare Pages
4. Konfigurera API-nycklar som Cloudflare-secrets
5. Uppdatera API_BASE_URL i script.js

## 💰 Kostnad per användning

### Cloudflare (Hosting):
- ✅ **GRATIS** för 100,000 requests/dag

### OpenAI (GPT-4o-mini):
- 💵 **~$0.0003 per inlägg** (nästan gratis!)
- 1,000 inlägg = ~$0.30
- 10,000 inlägg = ~$3

### Kyyy.ai (Bildgenerering):
- Beror på din plan

## 🎨 Hur Man Använder

### Generera ett LinkedIn-inlägg:

1. Skriv ditt ämne i fältet
   - Exempel: "Brist på Azure-specialister i Sverige"
2. Klicka "Generera Inlägg"
3. Vänta några sekunder för AI:n att skapa ditt inlägg
4. Granska det genererade inlägget med rätt formatering
5. Klicka "Kopiera Inlägg"
6. Klistra in direkt i LinkedIn - all formatering bevaras!

### Generera en bild:

1. Beskriv bilden du vill ha
   - Exempel: "Ett modernt svenskt IT-kontor med konsulter som jobbar"
2. Klicka "Generera Bild"
3. Vänta på att bilden genereras (10-30 sekunder)
4. Klicka "Ladda Ner Bild"
5. Ladda upp bilden när du skapar ditt LinkedIn-inlägg

## 🎯 AI-Prompt (Roger Kårsjö Persona)

Verktyget använder en specialdesignad prompt som får AI:n att skriva som Roger Kårsjö från D-Source:

- **Ton**: Smart men enkelt, vänligt och proffsigt
- **Innehåll**: IT-rekrytering, trender, tips och insikter
- **Format**: Max 300 ord, lätt att läsa, med emojis och hashtags
- **Språk**: Svenska
- **Fokus**: Konsult- och rekryteringsbranschen i Sverige

## 🔧 Teknologier

- **Frontend**: Pure HTML5, CSS3, JavaScript (inga ramverk!)
- **Backend**: Node.js + Express / Cloudflare Workers
- **AI**: OpenAI GPT-4o-mini för textgenerering
- **Bilder**: Kyyy.ai för DALL-E 3 bildgenerering
- **Hosting**: Cloudflare Pages + Workers

## 🔒 Säkerhet

- ✅ API-nycklar lagras som miljövariabler/secrets, aldrig i kod
- ✅ `.gitignore` förhindrar att känsliga filer committas
- ✅ All API-kommunikation går genom backend
- ✅ Användare kan inte se eller komma åt dina API-nycklar
- ✅ CORS konfigurerad för att endast tillåta din domän

## 🐛 Felsökning

### "Cannot reach API" fel:
- Kontrollera att backend-servern körs
- Verifiera att API_BASE_URL i script.js är korrekt
- Kolla Cloudflare Worker-loggar för fel

### "API key not configured" fel:
- Se till att du har lagt till secrets i Cloudflare Worker
- Redeplooya Worker efter att ha lagt till secrets

### CORS-fel:
- Uppdatera CORS-inställningar i backend-koden
- Lägg till din Cloudflare Pages-domän i tillåtna origins

## 📊 Övervaka Användning

### Cloudflare Dashboard:
- Kolla Worker-analytics för API-anrop
- Övervaka kostnader (bör vara minimal med gratis tier)

### OpenAI Dashboard:
- Besök: https://platform.openai.com/usage
- Övervaka API-användning och kostnader
- Sätt utgiftsgränser om önskat

## 🔄 Uppdatera Appen

**Frontend-ändringar:**
```bash
git add .
git commit -m "Din uppdateringstext"
git push
```
Cloudflare Pages deployas automatiskt!

**Backend-ändringar:**
```bash
wrangler deploy
```

## 📚 Dokumentation

- [DEPLOYMENT.md](DEPLOYMENT.md) - Fullständig deployment-guide
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [OpenAI API Docs](https://platform.openai.com/docs)

## 📝 Licens

Detta projekt tillhandahålls som det är för personligt och kommersiellt bruk av Castform AI Solutions.

## 🤝 Support

Skapa en issue på GitHub eller kontakta Castform AI Solutions för support.

---

**Gjord med ⚡ av Castform AI**

Lycka till med att skapa fantastiskt LinkedIn-innehåll! 🚀
