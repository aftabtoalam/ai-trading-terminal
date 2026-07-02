const apiKey = "";

const AIEngine = {
    runInference: async (state, logCallback, renderCallback) => {
        if (state.isAnalyzing) return;
        state.isAnalyzing = true;

        document.getElementById('loading-overlay').classList.remove('hidden');
        document.getElementById('inference-btn').disabled = true;

        const prompt = `System Analysis for ${state.symbol}. RSI: ${document.getElementById('rsi-val').innerText}. Trend: ${document.getElementById('trend-val').innerText}. Price: ${state.lastPrice}. 
        Output strict JSON: {"bias": "LONG"|"SHORT"|"NEUTRAL", "confidence": 0-100, "entry": float, "tp": float, "sl": float, "summary": "1 sentence technical brief"}`;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { responseMimeType: "application/json" }
                })
            });
            
            const result = await response.json();
            const analysis = JSON.parse(result.candidates?.[0]?.content?.parts?.[0]?.text || "{}");
            renderCallback(analysis, state, logCallback);
        } catch (e) {
            console.error("AI Error", e);
            logCallback(`Inference Error: Connection timeout.`);
        } finally {
            state.isAnalyzing = false;
            document.getElementById('loading-overlay').classList.add('hidden');
            document.getElementById('inference-btn').disabled = false;
        }
    }
};