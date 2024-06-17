import { LightningElement, api, wire } from "lwc";
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from "@salesforce/user/Id";
import stack from '@salesforce/resourceUrl/stack';

export default class userDetails extends LightningElement {
    name;
    userPhotoUrl;
    loginDate;

    // Variable will store the API name of the flow to be loaded
    activeFlowApiName;

    //To indicate if modal is open or not
    isModalOpen = false;

    @api showGreeting;
    @api showMessage;

    //Display Buttons
    @api displayBtn = false;

    //Button info
    @api firstBtnLabel;
    @api firstBtnIcon;
    @api firstBtnFlowApiName;

    @api secondBtnLabel;
    @api secondBtnIcon;
    @api secondBtnFlowApiName;

    // Set background image
    renderedCallback() {
        try {
            this.template.querySelector('.stack-bg').style.backgroundImage = `url(${stack})`;
        } catch (error) {
            console.error(error);
        }
    }

    // Get user data
    @wire(getRecord, { recordId: USER_ID, fields: ['User.FirstName', 'User.LastLoginDate', 'User.MediumPhotoUrl'] })
    userData({ error, data }) {
        if (error) this.error = error;
        else if (data) {
            this.name = data.fields.FirstName.value;
            this.loginDate = data.fields.LastLoginDate.value;
            this.userPhotoUrl = data.fields.MediumPhotoUrl.value;
        }
    }

    // Get formatted last login & current date
    get formattedDates() {
        const logDate = new Date(this.loginDate);
        const currDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return {
            lstLogDate: logDate.toLocaleString('en-UK', { timeZone: 'UTC' }),
            date: currDate.toLocaleDateString('en-UK', options)
        };
    }

    openModal() {
        // Set the active flow API name to the value provided in the button's data attribute
        this.activeFlowApiName = event.target.dataset.flowApiName;
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    // Close modal when Flow is finished
    handleStatusChange(event) {
        if (event.detail.status === 'FINISHED') {
            this.isModalOpen = false;
        }
    }

    // Add getter to dynamically set flow-api-name values
    get flowApiName() {
        return this.activeFlowApiName;
    }

}