document.addEventListener('DOMContentLoaded', () => {
    const elCo2 = document.getElementById('dt-co2');
    const elTemp = document.getElementById('dt-temp');
    const elPred = document.getElementById('dt-pred');

    let baseCo2 = 14.5;
    let baseTemp = 42.0;

    // Simulate real time ticks
    setInterval(() => {
        // Random walk
        baseCo2 += (Math.random() - 0.5) * 0.2;
        baseTemp += (Math.random() - 0.5) * 0.5;

        // Bounding limits
        if(baseCo2 < 10) baseCo2 = 10; if(baseCo2 > 18) baseCo2 = 18;
        if(baseTemp < 30) baseTemp = 30; if(baseTemp > 60) baseTemp = 60;

        // derived pred rate
        const predRate = (baseCo2 * 0.05) + (baseTemp * 0.01);

        elCo2.innerHTML = `${baseCo2.toFixed(2)} <span>%</span>`;
        elTemp.innerHTML = `${baseTemp.toFixed(1)} <span>°C</span>`;
        elPred.innerHTML = `${predRate.toFixed(3)} <span>mm/h</span>`;

    }, 2000); // UI update tick
});
