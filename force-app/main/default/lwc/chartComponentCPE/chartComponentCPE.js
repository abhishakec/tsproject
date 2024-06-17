import { LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class ChartComponentCPE extends LightningElement {
    selectedObjectName = 'Account'; // Set a default object
    selectedFieldName = '';
    selectedLabelName = '';

    objectOptions = [];
    fieldOptions = [];

    @wire(getObjectInfo, { includeFields: true })
    getObjectInfoHandler({ data, error }) {
        if (data) {
            console.log('getObjectInfoHandler data:', data);
            const objects = data.results;
            this.objectOptions = objects.map(obj => ({
                label: obj.label,
                value: obj.apiName
            }));
            // Fetch fields for the default object
            this.fetchFieldsForObject(this.selectedObjectName);
        } else if (error) {
            console.error('Error getting object info:', error);
        }
    }

    @wire(getObjectInfo, { objectApiName: '$selectedObjectName' })
    objectInfo;

    handleObjectChange(event) {
        this.selectedObjectName = event.detail.value;
        console.log('Selected Object Name:', this.selectedObjectName);
        this.fetchFieldsForObject(this.selectedObjectName);
    }

    handleFieldChange(event) {
        this.selectedFieldName = event.detail.value;
        console.log('Selected Field Name:', this.selectedFieldName);
    }

    handleLabelChange(event) {
        this.selectedLabelName = event.detail.value;
        console.log('Selected Label Name:', this.selectedLabelName);
    }

    fetchFieldsForObject(objectName) {
        console.log('fetchFieldsForObject called for:', objectName);
        if (this.objectInfo && this.objectInfo.data) {
            console.log('objectInfo data:', this.objectInfo.data);
            const fields = this.objectInfo.data.fields;
            this.fieldOptions = fields.map(field => ({
                label: field.label,
                value: field.apiName
            }));
        } else {
            console.log('objectInfo data is not available');
        }
    }
}