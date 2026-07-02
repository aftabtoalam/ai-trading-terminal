const ChartEngine = {
    init: (state) => {
        const container = document.getElementById('chart-main');
        state.chart = LightweightCharts.createChart(container, {
            layout: { background: { color: 'transparent' }, textColor: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' },
            grid: { vertLines: { color: '#10141b' }, horzLines: { color: '#10141b' } },
            rightPriceScale: { borderColor: '#1a1f2b', autoScale: true, scaleMargins: { top: 0.1, bottom: 0.2 } },
            timeScale: { borderColor: '#1a1f2b', timeVisible: true },
            crosshair: { mode: LightweightCharts.CrosshairMode.Normal, vertLine: { color: '#334155' }, horzLine: { color: '#334155' } }
        });

        state.series = state.chart.addCandlestickSeries({
            upColor: '#10b981', downColor: '#ef4444', borderVisible: false,
            wickUpColor: '#10b981', wickDownColor: '#ef4444'
        });

        state.volume = state.chart.addHistogramSeries({
            color: '#3b82f6', priceFormat: { type: 'volume' }, priceScaleId: '',
        });
        state.volume.priceScale().applyOptions({ scaleMargins: { top: 0.85, bottom: 0 } });

        new ResizeObserver(() => {
            state.chart.applyOptions({ width: container.clientWidth, height: container.clientHeight });
        }).observe(container);

        state.chart.subscribeCrosshairMove(param => {
            if (param.time && param.seriesData.get(state.series)) {
                const d = param.seriesData.get(state.series);
                document.getElementById('o-val').innerText = d.open.toFixed(2);
                document.getElementById('h-val').innerText = d.high.toFixed(2);
                document.getElementById('l-val').innerText = d.low.toFixed(2);
                document.getElementById('c-val').innerText = d.close.toFixed(2);
            }
        });
    }
};