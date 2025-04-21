import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
  standalone: true
})
export class SafePipe implements PipeTransform {

	constructor(private sanitizer: DomSanitizer) { }
	transform(url:any) {
	  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
}
