document.addEventListener('DOMContentLoaded', () => {
    
    // Load params
    const rawData = localStorage.getItem('carb_sim_params');
    let payload = { co2: 5.0, pore: 15.0, time: 365.0 }; // defaults
    
    if (rawData) {
        const parsed = JSON.parse(rawData);
        payload = {
            co2: parsed.co2,
            pore: parsed.pore,
            time: parsed.time
        };
    }

    const depthEl = document.getElementById('pred-depth');
    const riskEl = document.getElementById('pred-risk');
    const healthEl = document.getElementById('pred-health');
    const btnRefresh = document.getElementById('btn-fetch-latest');

    async function fetchModel() {
        depthEl.innerHTML = "Querying... <span>mm</span>";
        try {
            // Add slight synthetic delay
            await new Promise(r => setTimeout(r, 600));

            const res = await fetch('http://127.0.0.1:8000/prediction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('API Error');

            const data = await res.json();
            updateUI(data.carbonation_depth);

        } catch (e) {
            console.error('API call failed; showing fallback demo model.', e);
            // Fallback estimation strategy if API is down
            const fallback = (payload.co2 * 0.7) + (payload.time / 40) + (payload.pore * 0.3);
            updateUI(fallback);
        }
    }

    function updateUI(depth) {
        depthEl.innerHTML = `${depth.toFixed(2)} <span>mm</span>`;

        let riskClass, riskText, health;
        if (depth < 10) {
            riskClass = 'badge-safe'; riskText = 'OPTIMAL'; health = 'Excellent';
        } else if (depth < 25) {
            riskClass = 'badge-warn'; riskText = 'ELEVATED'; health = 'Degrading';
        } else {
            riskClass = 'badge-danger'; riskText = 'CRITICAL'; health = 'Compromised';
        }

        riskEl.className = `badge ${riskClass}`;
        riskEl.innerText = riskText;
        healthEl.innerText = health;
    }

    fetchModel();

    if (btnRefresh) {
        btnRefresh.addEventListener('click', fetchModel);
    }
});
