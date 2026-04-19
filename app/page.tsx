'use client';

import { useState } from 'react';

export default function InjuryRecoveryPage() {
  const [injuryType, setInjuryType] = useState('Sprained Ankle');
  const [sport, setSport] = useState('General');
  const [athleteAge, setAthleteAge] = useState('');
  const [severity, setSeverity] = useState('Moderate');
  const [rehabGoal, setRehabGoal] = useState('Full Return to Sport');
  const [timeline, setTimeline] = useState('6-8 weeks');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ injuryType, sport, athleteAge, severity, rehabGoal, timeline }),
      });
      const data = await res.json();
      setResult(data.result || data.error || 'An error occurred.');
    } catch {
      setResult('Failed to generate. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-rose-400 mb-2">AI Injury Recovery Plan</h1>
          <p className="text-gray-400">Return-to-Play Timeline Generator · Medical-Grade Recovery Protocols</p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Injury Type</label>
              <select value={injuryType} onChange={e => setInjuryType(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-rose-400 outline-none">
                <option>Sprained Ankle</option>
                <option>ACL Tear</option>
                <option>Hamstring Strain</option>
                <option>Torn Meniscus</option>
                <option>Rotator Cuff Injury</option>
                <option>Tennis Elbow</option>
                <option>Achilles Tendonitis</option>
                <option>Concussion</option>
                <option>LCL/MCL Sprain</option>
                <option>Plantar Fasciitis</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Sport</label>
              <select value={sport} onChange={e => setSport(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-rose-400 outline-none">
                <option>General</option>
                <option>Basketball</option>
                <option>Football</option>
                <option>Soccer</option>
                <option>Track and Field</option>
                <option>Baseball</option>
                <option>Hockey</option>
                <option>Tennis</option>
                <option>Swimming</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Athlete Age</label>
              <input type="number" value={athleteAge} onChange={e => setAthleteAge(e.target.value)} placeholder="e.g. 22" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-rose-400 outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Severity</label>
              <select value={severity} onChange={e => setSeverity(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-rose-400 outline-none">
                <option>Mild</option>
                <option>Moderate</option>
                <option>Severe</option>
                <option>Post-Surgical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Rehabilitation Goal</label>
              <select value={rehabGoal} onChange={e => setRehabGoal(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-rose-400 outline-none">
                <option>Full Return to Sport</option>
                <option>Daily Activities</option>
                <option>Light Training</option>
                <option>Competitive Return</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Target Timeline</label>
              <select value={timeline} onChange={e => setTimeline(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-rose-400 outline-none">
                <option>2-4 weeks</option>
                <option>4-6 weeks</option>
                <option>6-8 weeks</option>
                <option>8-12 weeks</option>
                <option>3-6 months</option>
                <option>6+ months</option>
              </select>
            </div>
          </div>
          <button onClick={handleGenerate} disabled={loading} className="w-full bg-rose-500 hover:bg-rose-400 text-white font-bold py-3 rounded-xl transition disabled:opacity-50">
            {loading ? 'Building Recovery Plan...' : '🏥 Generate Recovery Plan'}
          </button>
        </div>

        {result && (
          <div className="bg-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-rose-400 mb-4">Recovery Protocol</h2>
            <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}