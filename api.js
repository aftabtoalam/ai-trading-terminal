const ApiEngine = {
    pollPrice: async (state) => {
        try {
            const start = Date.now();
            const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${state.symbol}`);
            const d = await res.json();
            const latency = Date.now() - start;
            
            state.lastPrice = parseFloat(d.lastPrice);
            document.getElementById('currentPrice').innerText = state.lastPrice.toLocaleString(undefined, {minimumFractionDigits: 2});
            
            const change = parseFloat(d.priceChangePercent);
            const pc = document.getElementById('priceChange');
            pc.innerText = `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
            pc.className = `text-[10px] font-bold ${change >= 0 ? 'text-green-500' : 'text-red-500'}`;
            
            document.getElementById('latency-text').innerText = `${latency}ms`;
        } catch (e) {
            console.error("Price Poll Error", e);
            document.getElementById('conn-indicator').classList.replace('bg-green-500', 'bg-red-500');
            document.getElementById('conn-text').innerText = "Feed Error";
        }
    },

    syncData: async (state, updateVitalsCallback) => {
        try {
            const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${state.symbol}&interval=${state.interval}&limit=120`);
            const raw = await res.json();
            const data = raw.map(d => ({
                time: d[0] / 1000,
                open: parseFloat(d[1]), high: parseFloat(d[2]), low: parseFloat(d[3]), close: parseFloat(d[4]), volume: parseFloat(d[5])
            }));

            state.data = data;
            state.series.setData(data);
            state.volume.setData(data.map(d => ({
                time: d.time, value: d.volume, color: d.close >= d.open ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'
            })));

            updateVitalsCallback(data);
        } catch (e) { console.error("Sync Failure", e); }
    }
};