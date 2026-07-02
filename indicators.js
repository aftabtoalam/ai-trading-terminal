const Indicators = {
    calculateRSI: (prices, period = 14) => {
        if (prices.length < period) return 50;
        let avgGain = 0, avgLoss = 0;
        for (let i = 1; i <= period; i++) {
            let diff = prices[i] - prices[i-1];
            if (diff > 0) avgGain += diff; else avgLoss -= diff;
        }
        avgGain /= period; avgLoss /= period;
        return 100 - (100 / (1 + (avgGain / (avgLoss || 1))));
    }
};