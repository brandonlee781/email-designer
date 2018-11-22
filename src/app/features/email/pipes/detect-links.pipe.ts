import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'detectLinks'
})
export class DetectLinksPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    const urlRegex = /(www\.?[^\s]+)/g;
    return value.replace(urlRegex, (url) => {
      if (url[url.length - 1] === '.') {
        url = url.slice(0, -1);
        return '<a href="https://' + url + '">' + url + '</a>.';
      }
      return '<a href="https://' + url + '">' + url + '</a>';
    });
  }

}
