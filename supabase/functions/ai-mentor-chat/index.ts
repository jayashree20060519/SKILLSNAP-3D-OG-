import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  try {
    const { message } = await req.json();

    const apiKey = "AIzaSyAfZ2XpnbZL4ZUfwP2FA9nMjDLJX2XIH3w";

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

    return new Response(
      JSON.stringify({ reply }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ reply: "Server error" }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
