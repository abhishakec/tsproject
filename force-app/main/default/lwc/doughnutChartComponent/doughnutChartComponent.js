import { LightningElement, api } from 'lwc';
import getData from '@salesforce/apex/DoughnutChartDataController.getData';

export default class DoughnutChartComponent extends LightningElement {
    error;

    //Exposed properties
    @api chartTitle = 'Title';
    @api objectName;
    @api fieldName;
    @api labelName;
    @api groupByVal;

    //Set Quickchart config
    quickchartConfig = {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [
                {
                    data: [],
                    //define color palette
                    backgroundColor: [
                        'rgb(255, 159, 64)',
                        'rgb(253, 113, 85)',
                        'rgb(213, 57, 83)',
                        'rgb(137, 24, 98)',
                        'rgb(82, 0, 109)'
                    ],
                },
            ],
        },
        options: {
            legend: {
                position: 'bottom',
                labels: {
                    fontSize: 14,
                    padding: 20,
                },
            },
            plugins: {
                datalabels: {
                    color: 'rgb(255, 255, 255)',
                    display: true,
                    backgroundColor: 'transparent',
                    font: {
                        size: 16,
                        weight: 'bold',
                    },
                },
                doughnutlabel: {
                    labels: [
                        {
                            text: '',
                            color: 'rgb(0, 0, 0)',
                            font: {
                                size: 30,
                                weight: 'bold',
                            },
                        },
                    ],
                },
            },
        },
    };

    compactDataString;
    quickchartURL;

    async connectedCallback() {
        try {
            const chartResult = await getData({
                objectName: this.objectName,
                fieldName: this.fieldName,
                labelName: this.labelName,
                groupByVal: this.groupByVal
            });

            let sum = 0;
            chartResult.forEach(element => {
                sum += element.RecordCount; //get total count
                this.quickchartConfig.data.datasets[0].data.push(element.RecordCount);
                this.quickchartConfig.data.labels.push(element.LabelValue);
            });

            this.quickchartConfig.options.plugins.doughnutlabel.labels[0].text = sum.toString();
            this.compactDataString = JSON.stringify(this.quickchartConfig);
            this.quickchartURL = 'https://quickchart.io/chart?v=2.9.4&c=' + this.compactDataString;

        } catch (error) {
            this.error = error;
        }
    }
}