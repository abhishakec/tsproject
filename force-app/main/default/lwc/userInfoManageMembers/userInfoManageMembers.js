import { LightningElement, api } from 'lwc';

export default class UserInfoManageMembers extends LightningElement {
   
    //Button info
    @api firstBtnLabel;
    @api firstBtnIcon;
    @api firstBtnFlowApiName;

    @api secondBtnLabel;
    @api secondBtnIcon;
    @api secondBtnFlowApiName;

    // Variable will store the API name of the flow to be loaded
    activeFlowApiName = '';

    //To indicate if modal is open or not
    isModalOpen = false;

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