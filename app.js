const Terminal = (() => {
    const state = {
        symbol: 'BTCUSDT',
        interval: '15m',
        chart: null,
        series: null,
        volume: null,
        data: [],
        lastPrice: 0,
        isAnalyzing: false,
        priceTimer: null
    };

    return {
        boot: () => {
            lucide.createIcons();
            ChartEngine.init(state);
            ApiEngine.syncData(state, UIEngine.updateQuantVitals);
            ApiEngine.pollPrice(state);
            
            state.priceTimer = setInterval(() => ApiEngine.pollPrice(state), 2000); 
            setInterval(() => ApiEngine.syncData(state, UIEngine.updateQuantVitals), 60000); 
            
            setInterval(() => {
                document.getElementById('utc-clock').innerText = Utils.getUTCTimestamp();
            }, 1000);

            UIEngine.logToHub("Engine initialized. REST bridge active.");
        },
        updateSymbol: (s) => { 
            state.symbol = s; 
            ApiEngine.syncData(state, UIEngine.updateQuantVitals); 
            ApiEngine.pollPrice(state);
            UIEngine.logToHub(`Switched context to ${s}`);
        },
        updateInterval: (i) => { 
            state.interval = i; 
            ApiEngine.syncData(state, UIEngine.updateQuantVitals); 
        },
        resetChart: () => state.chart.timeScale().fitContent(),
        runInference: () => AIEngine.runInference(state, UIEngine.logToHub, UIEngine.renderIntelligence),
        getCurrentPrice: () => state.lastPrice
    };
})();

window.onload = Terminal.boot;