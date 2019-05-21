import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-generator-text',
  templateUrl: './generator-text.component.html',
  styleUrls: ['./generator-text.component.css']
})
export class GeneratorTextComponent implements OnInit {
constructor(private bottomSheetRef: MatBottomSheetRef<GeneratorTextComponent>) { }

  ngOnInit() {
  }
  getHelperString(eventHelper: string): void {
    this.bottomSheetRef.dismiss(eventHelper);
    return;
  }
}
