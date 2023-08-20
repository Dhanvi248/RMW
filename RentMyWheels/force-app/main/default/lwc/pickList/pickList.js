import { LightningElement ,wire } from 'lwc';
import { getObjectInfo,getPicklistValues } from 'lightning/uiObjectInfoApi';
import car_Object from '@salesforce/schema/Car__c';
import Cartype_Field from '@salesforce/schema/Car__c.Car_Picklist__c';

export default class PickList extends LightningElement {
    recordTypeId;
    optionArray;
    picklistValue;
    selectedCartype = '';


    @wire(getObjectInfo,{objectApiName:car_Object})
    objectinfos({data,error}){
        if (error) {
            console.log('error:'+JSON.stringify(error))   
        } 
        else if(data) {
            this.recordTypeId = data.defaultRecordTypeId;
            console.log('this.recordTypeId:'+JSON.stringify(this.recordTypeId))
        }
    }

    @wire(getPicklistValues,{recordTypeId: '$recordTypeId', fieldApiName: Cartype_Field})
    carTypeFieldValues({data,error}){
        if (error) {
            console.log('error:'+JSON.stringify(error))   
        } 
        else if(data) {
            let arr=[];
            this.picklistValue = data.values;
            console.log('picklist data:'+JSON.stringify(this.picklistValue))
            this.picklistValue.forEach(element => {
                arr.push({label : element.value, value : element.value})
            })
            this.optionArray = arr;
            console.log('this.optionArrayyyy:'+JSON.stringify(this.optionArray))
        }
    }   
    handleOptionChange(event){
        this.selectedCartype= event.detail.value;
        console.log('this.selectedCartype:'+JSON.stringify(this.selectedCartype));
        this.template.querySelector('c-car-details').searchCar(this.selectedCartype);

    }

}
