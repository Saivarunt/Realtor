import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPropertiesBackground]'
})
export class PropertiesBackgroundDirective {

  constructor(private el:ElementRef, private renderer: Renderer2) { }


  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement,'backgroundImage',`url('assets/images.png')`);
    console.log("rendering");
    
  }
}