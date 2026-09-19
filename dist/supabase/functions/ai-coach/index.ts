import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req) => {
  const { goal, skills, project } = await req.json();
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) return new Response(JSON.stringify({ error: "OPENAI_API_KEY is not configured" }), { status: 500 });
  const prompt = `You are CodeVenjar AI, a practical career coach. Goal: ${goal}. Skills: ${JSON.stringify(skills)}. Project idea: ${project}. Return JSON with summary, skill_gaps (array), roadmap (array of {week,title,task}), projects (array), and next_action. Keep it specific for a student.`;
  const response = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` }, body: JSON.stringify({ model: "gpt-4.1-mini", input: prompt }) });
  const data = await response.json();
  return new Response(JSON.stringify({ result: data.output_text ?? data }), { headers: { "Content-Type": "application/json" } });
});
