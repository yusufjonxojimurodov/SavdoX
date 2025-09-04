<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import useStatistic from '../../../../../store/statistic.pinia';
import { Chart } from 'chart.js/auto';

const statisticStore = useStatistic();
const canvasRef = ref(null);
let chartInstance = null;

const monthsName = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
    "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
];

function prepareData(apiArray) {
    const map = new Map();
    apiArray.forEach(item => {
        const m = Number(item.month);
        const cnt = Number(item.soldCount) || 0;
        map.set(m, (map.get(m) || 0) + cnt);
    });
    const labels = [];
    const data = [];
    for (let m = 1; m <= 12; m++) {
        labels.push(monthsName[m - 1]);
        data.push(map.get(m) ?? 0);
    }
    return { labels, data };
}

function renderChart() {
    if (!canvasRef.value) return;

    canvasRef.value.width = canvasRef.value.parentElement.clientWidth;
    canvasRef.value.height = canvasRef.value.parentElement.clientHeight;

    const { labels, data } = prepareData(statisticStore.statistic);

    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }

    const ctx = canvasRef.value.getContext("2d");
    chartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Oylik sotuvlar",
                data,
                borderColor: "#60a5fa",
                backgroundColor: "rgba(96,165,250,0.2)",
                tension: 0.4,
                fill: true,
                pointBackgroundColor: "#ffffff",
                pointBorderColor: "#60a5fa",
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { color: "#111827" }, ticks: { color: "#ffffff" } },
                y: { beginAtZero: true, grid: { color: "#111827" }, ticks: { color: "#ffffff", stepSize: 1 } }
            },
            plugins: { legend: { labels: { color: "#ffffff" } } }
        }
    });
}

onMounted(() => {
    nextTick(() => renderChart());
});

watch(() => statisticStore.statistic, () => renderChart());
</script>

<template>
    <div style="height: 400px; width: 100%; margin-top: 80px;">
        <canvas ref="canvasRef"></canvas>
    </div>
</template>
