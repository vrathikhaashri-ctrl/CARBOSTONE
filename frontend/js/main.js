document.addEventListener('DOMContentLoaded', () => {
    // Analytics Chart
    const chartContainer = document.getElementById('monthly-chart');
    if (chartContainer) {
        const data = [120, 150, 180, 170, 210, 240, 220, 280, 310, 290, 340, 380];
        const max = Math.max(...data);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        
        data.forEach((val, i) => {
            const height = (val / max) * 200; // max height 200px
            const barWrap = document.createElement('div');
            barWrap.style.flex = '1';
            barWrap.style.height = '100%';
            barWrap.style.display = 'flex';
            barWrap.style.alignItems = 'flex-end';
            barWrap.style.position = 'relative';

            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${height}px`;

            const label = document.createElement('div');
            label.className = 'bar-label';
            label.innerText = months[i];

            bar.appendChild(label);
            barWrap.appendChild(bar);
            chartContainer.appendChild(barWrap);
        });
    }

    // Process Timeline
    const timeline = document.getElementById('process-timeline');
    if (timeline) {
        const steps = [
            { title: "Coal Ash Collection", icon: "🏢", desc: "Raw material sourced from industrial plants.", detail: "High-calcium fly ash is systematically gathered and stored in moisture-controlled silos to prevent premature hydration." },
            { title: "Grinding", icon: "⚙️", desc: "Material standardized for reactivity.", detail: "The coal ash is milled to a uniform fineness (Blaine > 400 m²/kg) to maximize the surface area for rapid carbonation." },
            { title: "Mixing", icon: "🔄", desc: "Binder added with precise water ratio.", detail: "Ash is mixed with water and chemical activators in a high-shear mixer to form a homogenous paste." },
            { title: "Pellet Formation", icon: "⚪", desc: "Extrusion into aggregate shapes.", detail: "The paste is processed through a pelletizer pan, forming spherical aggregates sized between 4mm and 20mm." },
            { title: "CO₂ Injection", icon: "💨", desc: "Flue gas introduced into chamber.", detail: "Industrial CO2 (approx 15% concentration) is pumped into the curing chamber at controlled pressures." },
            { title: "Carbonation", icon: "🌡️", desc: "Exothermic reaction solidifies matrix.", detail: "CO2 reacts with calcium silicates to form calcium carbonate, acting as the primary binder making the aggregate rock-hard." },
            { title: "Final Aggregate", icon: "🏗️", desc: "Ready for concrete integration.", detail: "Carbon-negative aggregate is quality-tested for compressive strength and sorted by size for distribution." }
        ];

        steps.forEach((step, i) => {
            const el = document.createElement('div');
            el.className = 'process-step';
            el.innerHTML = `
                <div class="step-number">${i+1}</div>
                <div class="card step-card">
                    <div class="step-header">
                        <div style="display:flex; align-items:center; gap: 0.5rem;">
                            <span>${step.icon}</span>
                            <h3>${step.title}</h3>
                        </div>
                        <span style="font-size: 0.8rem; color: var(--text-muted);">&plus; Expand</span>
                    </div>
                    <div style="margin-top: 0.5rem; color: var(--text-main); font-size: 0.95rem;">${step.desc}</div>
                    <div class="step-details">${step.detail}</div>
                </div>
            `;
            const card = el.querySelector('.step-card');
            card.addEventListener('click', () => card.classList.toggle('expanded'));
            timeline.appendChild(el);
        });
    }
});
