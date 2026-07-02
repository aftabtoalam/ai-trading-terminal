const UIEngine = {
    logToHub: (msg) => {
        const log = document.createElement('div');
        log.className = "p-3 rounded-lg bg-white/[0.02] border border-white/5 text-[9px] font-medium leading-relaxed";
        log.innerHTML = `<span class="text-blue-500 font-bold opacity-70">[${Utils.formatTimeLog()}]</span> ${msg}`;
        const cont = document.getElementById('ai-logs');
        cont.prepend(log);
        if (cont.children.length > 8) cont.lastChild.remove();
    },

    renderIntelligence: (data, state, logCallback) => {
        const container = document.getElementById('signal-display');
        const idle = document.getElementById('idle-msg');
        const card = document.getElementById('signal-card');
        const badge = document.getElementById('market-badge');

        idle.classList.add('hidden');
        container.classList.remove('hidden');

        const isNeutral = data.bias === 'NEUTRAL';
        card.className = `setup-card p-5 rounded-2xl border border-white/5 bg-white/[0.02] ${isNeutral ? '' : data.bias.toLowerCase()}`;
        
        document.getElementById('setup-dir').innerText = data.bias;
        document.getElementById('setup-dir').className = `text-xs font-black px-2 py-0.5 rounded uppercase tracking-tighter ${data.bias === 'LONG' ? 'bg-green-500 text-black' : 'bg-red-500 text-white'}`;
        
        document.getElementById('setup-prob').innerText = `${data.confidence}%`;
        document.getElementById('entry-p').innerText = data.entry.toLocaleString();
        document.getElementById('tp-p').innerText = data.tp.toLocaleString();
        document.getElementById('sl-p').innerText = data.sl.toLocaleString();
        document.getElementById('setup-summary').innerText = data.summary;

        document.getElementById('conf-val').innerText = `${data.confidence}%`;
        document.getElementById('conf-bar').style.width = `${data.confidence}%`;

        badge.innerText = data.bias;
        badge.className = `text-[9px] font-bold px-2 py-0.5 rounded uppercase border ${data.bias === 'LONG' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`;

        logCallback(`Model detected ${data.bias} structure for ${state.symbol} (${data.confidence}% Confidence)`);
    },

    updateQuantVitals: (data) => {
        const closes = data.map(d => d.close);
        const rsi = Indicators.calculateRSI(closes, 14);

        document.getElementById('rsi-val').innerText = rsi.toFixed(1);
        document.getElementById('rsi-bar').style.width = `${rsi}%`;
        
        const last = data[data.length-1];
        document.getElementById('vol-val').innerText = (last.high - last.low).toFixed(2);
        
        const trend = closes[closes.length-1] > closes[closes.length-20] ? 'BULL' : 'BEAR';
        document.getElementById('trend-val').innerText = trend;
        document.getElementById('trend-val').className = `stat-value ${trend === 'BULL' ? 'text-green-500' : 'text-red-500'}`;
    }
};

// Global Input and Selection Listeners
document.getElementById('assetSelect').addEventListener('change', (e) => Terminal.updateSymbol(e.target.value));

document.querySelectorAll('.tf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        Terminal.updateInterval(btn.dataset.tf);
    });
});

document.getElementById('risk-input').addEventListener('input', (e) => {
    const val = e.target.value;
    document.getElementById('risk-display').innerText = `${val}%`;
    const price = Terminal.getCurrentPrice();
    if (price) {
        const lot = (10000 * (val/100) / price).toFixed(4);
        document.getElementById('calc-lot').innerText = `${lot} Units`;
    }
});