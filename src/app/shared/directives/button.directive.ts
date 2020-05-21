import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNavBtn]'
})
export class ButtonDirective {
  @Input('appNavBtn') textColor: string;

  constructor(private el: ElementRef) { }
   ngOnInit(): void {
    this.el.nativeElement.style.backgroundColor = 'transparent';
    this.el.nativeElement.style.color = this.textColor;
    this.el.nativeElement.style.border = 'none';
    this.el.nativeElement.style.fontWeight = '900';
    this.el.nativeElement.style.textTransform = 'uppercase';


   }
   @HostListener('mouseenter') onMouseEnter() {
    this.translate('translateY(-2px)');
  }

  @HostListener('focus') onFocus() {
    this.el.nativeElement.style.outline = 'none';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.translate(null);
  }

  private translate(translate: string) {
    this.el.nativeElement.style.transform = translate;
  }

}
