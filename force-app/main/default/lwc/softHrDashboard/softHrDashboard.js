import { LightningElement } from 'lwc';
import ChartJs from '@salesforce/resourceUrl/ChartJs';
import { loadScript } from 'lightning/platformResourceLoader';

export default class SoftHrDashboard extends LightningElement {
    activeEmployees = 54;
    pendingLeaves = 8;
    departments = 5;
    activeUsers = 23;
    onboarding = 4;
    offboarding = 2;
    training = 3;
    lastUpdated = 'Nov 8, 2025';

    chartInitialized = false;

    renderedCallback() {
        if (this.chartInitialized) return;
        this.chartInitialized = true;

        Promise.all([loadScript(this, ChartJs)])
            .then(() => {
                const ctx = this.template.querySelector('canvas.chart').getContext('2d');
                new window.Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [
                            {
                                label: 'Employees',
                                data: [32, 36, 41, 45, 52, 54],
                                backgroundColor: '#7C3AED',
                            }
                        ]
                    },
                    options: {
                        plugins: {
                            legend: { display: false }
                        },
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                });
            })
            .catch(error => {
                console.error('ChartJS failed to load', error);
            });
    }
}