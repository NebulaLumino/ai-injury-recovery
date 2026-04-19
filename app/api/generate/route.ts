import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { injuryType, sport, athleteAge, severity, rehabGoal, timeline } = await req.json();

    const prompt = `You are a sports medicine and rehabilitation specialist. Generate a comprehensive injury recovery plan.

**Injury:** ${injuryType || 'Sprained Ankle'}
**Sport:** ${sport || 'General'}
**Athlete Age:** ${athleteAge || 'Adult'}
**Severity:** ${severity || 'Moderate'}
**Rehabilitation Goal:** ${rehabGoal || 'Full Return to Sport'}
**Timeline:** ${timeline || '6-8 weeks'}

Generate a complete recovery plan with:
1. **Injury Assessment Summary** (tissue type, healing timeline, red flags)
2. **Phases of Rehabilitation:**
   - Phase 1: Acute/Protection (weeks 1-2) — pain management, swelling control, ROM
   - Phase 2: Early Movement (weeks 2-4) — progressive loading, strength begins
   - Phase 3: Strengthening (weeks 4-8) — resistance training, proprioception
   - Phase 4: Sport-Specific Training (weeks 8-12) — agility, plyometrics, conditioning
   - Phase 5: Return to Play (RTP) criteria and progression
3. **Daily/Weekly Exercise Protocol** (with sets, reps, tempo)
4. **Modalities and Treatments** (ice, heat, compression, e-stim, manual therapy)
5. **Criteria for Progression** (each phase gate)
6. **Return-to-Play Protocol** (sport-specific tests, criteria checklist)
7. **Warning Signs** (when to stop or seek further medical attention)
8. **Prevention Recommendations** (to prevent re-injury)

Include clear timelines, specific exercises, volume guidelines, and RTP benchmarks. Professional medical tone.`;

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 3000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: `DeepSeek API error: ${err}` }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || 'No response generated.';

    return NextResponse.json({ result: content });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}