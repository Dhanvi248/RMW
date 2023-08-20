import { LightningElement,wire,api} from 'lwc';
import getCarList from '@salesforce/apex/CarController.getCarList';
import { publish, MessageContext } from 'lightning/messageService';
import SELECTED_Car from '@salesforce/messageChannel/SelectedCar__c';

export default class CarDetails extends LightningElement {
    carType='';  
    carData;//data we get from soql
    selectedCarId;
    @wire(getCarList,{Car:'$carType'})
    wiredCar({data,error}){
        if(error){
            console.error(error);
        }
        else if(data){ 
            this.carData = data;
            console.log('this.carData:'+JSON.stringify(this.carData))// we get all data of car
        }
    } 
   
    @wire(MessageContext)
    messageContext;

    handleClickCarCard(event){
        this.selectedcarId = event.currentTarget.dataset.id;
        console.log('this.selectedcarId:'+JSON.stringify(this.selectedcarId));

        //Data is published
        publish( this.messageContext, SELECTED_Car, { CarId : this.selectedcarId});
        

        //To Remove from previous one 
        let boxClass = this.template.querySelectorAll('.selected');
        if(boxClass.length >0){
            this.removeClass();
        }
        //current selected
        let carBox = this.template.querySelector(`[data-id="${this.selectedcarId}"]`)
        if(carBox){
            carBox.className= 'title_wrapper selected'
        }


    }
    removeClass(){
        this.template.querySelectorAll('.selected')[0].classList.remove('selected');
    }  
    @api searchCar(typeOfCar){
        console.log('Value in child:'+JSON.stringify(typeOfCar));
        this.carType = typeOfCar;
    }
}