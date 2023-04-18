import { TimeFormat } from "./timeFormat";

export class Watch {

  private time: Date;
  private isEditable: boolean = false;
  private isLightOn: boolean = false;
  private mode: number = 0;
  private timeFormat: TimeFormat = TimeFormat.TWENTY_FOUR_HOUR;

  constructor(startTime: Date) {
    this.time = startTime;
  }

  public getTime() {
    return this.time;
  }

  public setTime(startTime: Date) {
    this.time = startTime;
  }

  public getIsEditable() {
    return this.isEditable;
  }

  public setIsEditable (isEditableValue: boolean) {
    this.isEditable = isEditableValue;
  }

  public getMode() {
    return this.mode;
  }

  public setMode(modeValue:number) {
    this.mode = modeValue;
  }

  public getFormat() {
    return this.timeFormat;
  }

  public setFormat(format: TimeFormat) {
    this.timeFormat = format;
  }

  public changeMode() {
    this.mode++;
    console.log(this.mode);
    switch (this.mode) {
      //When pressing the “mode” button first and second time, the time is editable
      case 1:
      case 2: {
        this.isEditable = true;
        break;
      }
      //When pressing the “mode” button a third time, the time is no more editable
      case 3: {
        this.isEditable = false;
        //reinitialise mode 
        this.mode = 0;
        break;
      }
    }
  }

  public increaseTime() {
    if (this.isEditable) {
      switch (this.mode) {
        //on first click, the “increase” button adds one hour
        case 1: {
          this.time.setHours(this.time.getHours() + 1);
          console.log("increase 1");
          break;
        }
        //on second click, the “increase” button adds one minute
        case 2: {
          this.time.setMinutes(this.time.getMinutes() + 1);
          console.log("increase 2");
          break;
        }
      }
    }
  }

  public lightOn() {
    this.isLightOn = !this.isLightOn;
  }
}
