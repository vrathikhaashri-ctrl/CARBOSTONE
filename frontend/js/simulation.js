document.addEventListener('DOMContentLoaded', () => {
    const params = ['co2', 'humid', 'time', 'pore', 'temp'];
    const values = {};

    function saveAndSync() {
        // Save to localStorage for the prediction page
        localStorage.setItem('carb_sim_params', JSON.stringify(values));
        
        // Update visualizer (local preview without API)
        const depth = (values['co2'] * 0.7) + (values['time'] / 40) + (values['pore'] * 0.3);
        const maxDepth = 40;
        const width = Math.min((depth / maxDepth) * 100, 100);
        
        document.getElementById('carb-layer').style.width = `${width}%`;
        document.getElementById('metric-depth').innerText = depth.toFixed(2);
    }

    params.forEach(p => {
        const slider = document.getElementById(`slider-${p}`);
        const display = document.getElementById(`val-${p}`);
        
        if (slider) {
            // init
            values[p] = parseFloat(slider.value);
            
            slider.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                values[p] = val;
                display.innerText = val;
                saveAndSync();
            });
        }
    });

    // initial sync
    saveAndSync();

    const btnRun = document.getElementById('btn-run-sim');
    if (btnRun) {
        btnRun.addEventListener('click', () => {
            const stat = document.getElementById('sim-status');
            stat.innerText = "Querying model endpoints...";
            btnRun.innerText = "Processing data";
            btnRun.classList.add('btn-outline');
            btnRun.classList.remove('btn-primary');
            
            // Artificial delay for UI effect, then redirect to fetch result 
            setTimeout(() => {
                window.location.href = 'prediction.html';
            }, 800);
        });
    }
});
