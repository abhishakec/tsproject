import { LightningElement, api, track } from 'lwc';

export default class ShowAccountData extends LightningElement {
    @track accounts = [];

    // Expecting the data to be passed as a serialized JSON string
    @api
    set accountData(value) {
        if (value) {
            this.accounts = JSON.parse(value);
        }
    }

    get accountData() {
        return JSON.stringify(this.accounts);
    }

}