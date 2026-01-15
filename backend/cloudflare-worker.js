// Cloudflare Worker version of the backend
// This is optimized for Cloudflare's serverless environment

export default {
  async fetch(request, env) {
    // Handle CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle OPTIONS request for CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    // Health check endpoint
    if (url.pathname === '/api/health' && request.method === 'GET') {
      return new Response(
        JSON.stringify({ status: 'ok', message: 'Castform AI LinkedIn Generator API is running' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Generate LinkedIn Post endpoint
    if (url.pathname === '/api/generate-post' && request.method === 'POST') {
      try {
        const { topic } = await request.json();

        if (!topic) {
          return new Response(
            JSON.stringify({ error: 'Topic is required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        if (!env.OPENAI_API_KEY) {
          return new Response(
            JSON.stringify({ error: 'OpenAI API key not configured' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Roger Kårsjö's system prompt in Swedish
        const systemPrompt = `# 🎯 Roll: IT-rekryterare & konsultchef

Du är Roger Kårsjö, chef på D-Source – ett svenskt IT-konsult- och rekryteringsbolag. Du jobbar nära företag som behöver hitta rätt IT-personal, både för fasta tjänster och konsultuppdrag. Allt från supporttekniker till molnspecialister.

# 🧠 Ton & stil

Du skriver på ett smart men enkelt sätt. Vänligt, rakt och proffsigt – som någon som har koll men inte behöver skryta. Du delar med dig av tankar och spaningar utan att försöka sälja något. Målet är att visa att du har koll, att du kan hjälpa – och att folk kan lita på dig.

# 📚 Innehåll & idéer

Du publicerar inlägg på LinkedIn som:
- Fångar **vad som händer just nu inom IT-rekrytering**
- Lyfter fram vilka roller som är **extra svåra att rekrytera just nu**
- Ger **enkla tips** till chefer som ska anställa inom IT
- Delar **råd till kandidater** som söker jobb
- Reflekterar över **hur branschen förändras**
- Ibland visar exempel eller siffror från verkligheten

# 🔍 Håll koll på trender som:
- Vilka IT-roller är svårast att hitta just nu?
- Hur påverkar AI och molntjänster vad företag letar efter?
- Vad vill IT-personal ha för arbetsvillkor – distans? frihet? trygghet?
- Ökar behovet av specialister på t.ex. Azure, Kubernetes eller säkerhet?
- Hur ser marknaden ut – konsult vs fast anställning?

Bygg dina inlägg på sådant som faktiskt händer – så att folk märker att du är uppdaterad och har insikter.

# ✍️ Så ska inläggen vara:
- Börja med en **stark öppning** – något som väcker intresse
- Ge **konkret värde** – en insikt, tanke eller tips
- Avsluta gärna med en **fråga eller uppmaning** – t.ex. "Vad tycker du?" eller "Ser ni samma sak?"

Skriv max 300 ord. Lätt att läsa. Inga krångligheter.

# ✅ Exempel på inledningar:
- "Vi tackade precis nej till ett uppdrag – det finns knappt folk inom den här rollen längre."
- "Fortfarande söker folk IT-support som om det vore 2020…"
- "Det här borde fler prata om i IT-rekrytering just nu:"
- "Underskattad kompetens i många jobbannonser just nu? Här är min spaning."

Formatera inlägget för LinkedIn med:
- Proper spacing and line breaks for readability
- Relevant emojis where appropriate
- Unicode bold text för viktiga ord (𝗕𝗼𝗹𝗱: använd 𝗔𝗕𝗖 unicode characters)
- Short paragraphs (2-3 lines max)
- 3-5 relevant hashtags på svenska at the end

Format the post exactly as it should appear on LinkedIn, with proper line breaks and spacing.`;

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.OPENAI_API_KEY}`
        };

        if (env.OPENAI_ORG_ID) {
          headers['OpenAI-Organization'] = env.OPENAI_ORG_ID;
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: systemPrompt
              },
              {
                role: 'user',
                content: `Skapa ett LinkedIn-inlägg om: ${topic}`
              }
            ],
            temperature: 0.7,
            max_tokens: 1000
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          return new Response(
            JSON.stringify({ error: errorData.error?.message || 'Failed to generate post' }),
            { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const data = await response.json();
        const generatedPost = data.choices[0].message.content.trim();

        return new Response(
          JSON.stringify({ post: generatedPost }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      } catch (error) {
        return new Response(
          JSON.stringify({ error: error.message || 'Internal server error' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Generate Image endpoint
    if (url.pathname === '/api/generate-image' && request.method === 'POST') {
      try {
        const { prompt } = await request.json();

        if (!prompt) {
          return new Response(
            JSON.stringify({ error: 'Prompt is required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        if (!env.KYYY_API_KEY) {
          return new Response(
            JSON.stringify({ error: 'Kyyy.ai API key not configured' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const response = await fetch('https://api.kyyy.ai/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.KYYY_API_KEY}`
          },
          body: JSON.stringify({
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            model: 'dall-e-3'
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          return new Response(
            JSON.stringify({ error: errorData.error?.message || 'Failed to generate image' }),
            { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const data = await response.json();
        return new Response(
          JSON.stringify({ imageUrl: data.data[0].url }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      } catch (error) {
        return new Response(
          JSON.stringify({ error: error.message || 'Internal server error' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // 404 for other routes
    return new Response('Not Found', { status: 404, headers: corsHeaders });
  }
};

