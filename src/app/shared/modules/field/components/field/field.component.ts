import { Component, Input, OnInit} from '@angular/core';
import {MainFieldService} from "../../services/main-field.service";
import {FieldBoxInterface} from "../../../../../core/interfaces/fieldBox.interface";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  @Input()
  fieldSize: string = '3';

  public field: FieldBoxInterface[] | undefined;

  constructor(private mainFieldService: MainFieldService) {
  }

  ngOnInit(): void {
    const fieldSizeInNumber = +this.fieldSize;
    this.mainFieldService.createField(fieldSizeInNumber);
    this.field = this.mainFieldService.getField();
  }

  public trackByFunc(index: number): number {
    return index;
  }

  public makeTurn(boxIndex: number): void {
    this.mainFieldService.makeTurn(boxIndex);
  }

}
