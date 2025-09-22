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
                borderColor: "#ffffff",
                backgroundColor: "#ffffff",
                tension: 0.4,
                fill: true,
                pointBackgroundColor: "#ffffff",
                pointBorderColor: "#ff8c00",
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { color: "#212529" }, ticks: { color: "#212529" } },
                y: { beginAtZero: true, grid: { color: "#212529" }, ticks: { color: "#212529", stepSize: 1 } }
            },
            plugins: { legend: { labels: { color: "#212529" } } }
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
