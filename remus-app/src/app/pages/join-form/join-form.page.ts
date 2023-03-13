import { Component, Input, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { ModalController, NavParams } from "@ionic/angular";

@Component({
  selector: "app-join-form",
  templateUrl: "./join-form.page.html",
  styleUrls: ["./join-form.page.scss"],
})
export class JoinFormPage implements OnInit {
  myForm: UntypedFormGroup;
  @Input() id: string;
  @Input() pseudo: string;
  error: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public modalController: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.id = this.navParams.data.id;

    this.myForm = this.formBuilder.group({
      id: [this.id],
      pseudo: [this.pseudo],
    });
  }

  async closeModal(onClosedData: any) {
    console.table(onClosedData);
    if (onClosedData.id.length !== 5) {
      this.error = true;
    } else {
      await this.modalController.dismiss(onClosedData);
    }
  }

  onSubmit() {}
}
