import { action, makeObservable, observable } from "mobx";

type Color = 'success' | 'info' | 'warning' | 'error';

interface Alert {
  open?: boolean,
  severity: Color,
  message: string
}

export class AlertStoreImpl {

    currentAlert : Alert = {
        open: false,
        severity: "info",
        message: "",
    }

    constructor() {
        makeObservable(this, {
           currentAlert: observable,
           closeAlert: action, 
           openAlert: action,
        });
    }

    closeAlert(){
        this.currentAlert.open = false; 
    }

    openAlert(){
        this.currentAlert.open = true;
    }

    setNewAlert(alert: Alert){
        this.currentAlert = alert;
        this.currentAlert.open = true;
        setTimeout(() => this.closeAlert(), 5000);
    }
}

export const AlertStore = new AlertStoreImpl();