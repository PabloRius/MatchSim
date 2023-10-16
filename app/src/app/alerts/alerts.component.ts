import { Component, Input } from "@angular/core";
import { fadeAnimations } from "src/app/animations";

@Component({
  selector: "app-alerts",
  templateUrl: "./alerts.component.html",
  animations: [fadeAnimations],
  styleUrls: ["./alerts.component.css"],
})
export class AlertsComponent {
  alertTypes: string[] = ["info", "check", "warning", "danger"];
  alertClasses: string[] = [
    "alert alert-primary d-flex align-items-center",
    "alert alert-success d-flex align-items-center",
    "alert alert-warning d-flex align-items-center",
    "alert alert-danger d-flex align-items-center",
  ];
  @Input() alertType!: string;
  @Input() content!: string;
  selectAlert(type: string) {
    if (type === this.alertType) {
      return true;
    }
    return false;
  }
  closeAlert() {
    this.alertType = "";
  }
}
