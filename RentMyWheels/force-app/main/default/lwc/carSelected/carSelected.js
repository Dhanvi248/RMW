import { LightningElement,wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import SELECTED_Car from  '@salesforce/messageChannel/SelectedCar__c';
import getSelectedcarDetail from '@salesforce/apex/CarController.getSelectedcarDetail';

export default class carDetail extends LightningElement {
    selectedCarId;
    Mydata;
    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        subscribe(
            this.messageContext,
            SELECTED_Car,
            (message)=>{
                console.log('Message: '+JSON.stringify(message));
                this.handleSelectedCar(message.CarId);
            }
        )
    }
    handleSelectedCar(CarId){
        this.selectedCarId = CarId;

        getSelectedcarDetail({CarId : this.selectedCarId})
        .then(result =>{
            this.Mydata = result;
            console.log('Selected Car Detail:'+JSON.stringify(result));
            console.log('Cardata: '+JSON.stringify(this.Mydata))
        })
        .catch(error=>{
            console.log(error);
        })
    }
}