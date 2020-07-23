import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shared-file',
  templateUrl: './shared-file.component.html',
  styleUrls: ['./shared-file.component.scss'],
})
export class SharedFileComponent implements OnInit {

  @Input()
  image:String;

  constructor() { }

  ngOnInit() {}

  closeImage() {
    var node = document.getElementById("container");
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }

}
