/* tslint:disable:max-line-length */

import { Injectable } from '@angular/core';
import { LocationQuery, Location } from '../../location/state';
import { EmailCardQuery, EmailCard } from '../state/email-card';
import { EmailQuery } from '../state/email';
import { BehaviorSubject, Subject, throwError, of, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { mergeMap, retry, map, retryWhen, tap, delayWhen } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface MinifierResponse {
  html: string;
}

export interface ServiceResponse {
  html: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class GenerateHtmlService {
  private currentHtml = { text: '', html: '' };
  private html: Subject<ServiceResponse> = new BehaviorSubject<ServiceResponse>(this.currentHtml);
  html$ = this.html.asObservable();

  constructor(
    private locationQuery: LocationQuery,
    private emailCardQuery: EmailCardQuery,
    private emailQuery: EmailQuery,
    private http: HttpClient,
  ) {
    const email = this.emailQuery.getActive();
    const cards = this.emailCardQuery.getAll()
      .filter(card => card.emailId === email.id);
    const location = this.locationQuery.getActive();
    let content = '';

    content += this.generateHeaderHtml();
    content += this.generateCardsHtml(cards);
    content += this.generateFooterHtml(location);

    const html = this.generateDocument(content);
    const text = this.generateText(cards);

    this.http.post(environment.inlinerUrl, { html })
      .subscribe({
        next: (data: MinifierResponse) => {
          this.html.next({
            html: data.html,
            text,
          });
        },
        error: error => {
          console.error(error);
          this.html.next({
            html: null,
            text,
          });
        },
      });
  }

  private generateText(cards: EmailCard[]): string {
    return cards
      .filter(card => card.text.length || card.title.length)
      .map(card => {
        let content = '';

        if (card.options.includes('text')) {
          content += `${card.title.toUpperCase()}\n`;
          content += `${card.text.map(text => text.trim()).join('\n')}\n`;
        }

        if (card.options.includes('button') && card.link) {
          content += `\n${card.buttonText.toUpperCase()} - ${card.link}\n`;
        }
        return content;
      }).join('\n--------------------------------\n\n');
  }

  private generateHeaderHtml(): string {
    return `
    <table align="center" class="wrapper header float-center">
      <tbody><tr>
        <td class="wrapper-inner">
          <table align="center" class="container">
            <tbody>
              <tr>
                <td>
                  <table class="row collapse">
                    <tbody>
                      <tr>
                        <th class="small-2 large-3 columns first">
                          <table>
                            <tbody><tr>
                              <th></th>
                            </tr>
                          </tbody></table>
                        </th>
                        <th class="small-8 large-6 columns ">
                          <table>
                            <tbody><tr>
                              <th><script pagespeed_no_defer="" type="text/javascript">//<![CDATA[
                                (function(){var g=this,h=function(b,d){var a=b.split("."),c=g;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var e;a.length&&(e=a.shift());)a.length||void 0===d?c[e]?c=c[e]:c=c[e]={}:c[e]=d};var l=function(b){var d=b.length;if(0<d){for(var a=Array(d),c=0;c<d;c++)a[c]=b[c];return a}return[]};var m=function(b){var d=window;if(d.addEventListener)d.addEventListener("load",b,!1);else if(d.attachEvent)d.attachEvent("onload",b);else{var a=d.onload;d.onload=function(){b.call(this);a&&a.call(this)}}};var n,p=function(b,d,a,c,e){this.f=b;this.h=d;this.i=a;this.c=e;this.e={height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth};this.g=c;this.b={};this.a=[];this.d={}},q=function(b,d){var a,c,e=d.getAttribute("pagespeed_url_hash");if(a=e&&!(e in b.d))if(0>=d.offsetWidth&&0>=d.offsetHeight)a=!1;else{c=d.getBoundingClientRect();var f=document.body;a=c.top+("pageYOffset"in window?window.pageYOffset:(document.documentElement||f.parentNode||f).scrollTop);c=c.left+("pageXOffset"in window?window.pageXOffset:(document.documentElement||f.parentNode||f).scrollLeft);f=a.toString()+","+c;b.b.hasOwnProperty(f)?a=!1:(b.b[f]=!0,a=a<=b.e.height&&c<=b.e.width)}a&&(b.a.push(e),b.d[e]=!0)};p.prototype.checkImageForCriticality=function(b){b.getBoundingClientRect&&q(this,b)};h("pagespeed.CriticalImages.checkImageForCriticality",function(b){n.checkImageForCriticality(b)});h("pagespeed.CriticalImages.checkCriticalImages",function(){r(n)});var r=function(b){b.b={};for(var d=["IMG","INPUT"],a=[],c=0;c<d.length;++c)a=a.concat(l(document.getElementsByTagName(d[c])));if(0!=a.length&&a[0].getBoundingClientRect){for(c=0;d=a[c];++c)q(b,d);a="oh="+b.i;b.c&&(a+="&n="+b.c);if(d=0!=b.a.length)for(a+="&ci="+encodeURIComponent(b.a[0]),c=1;c<b.a.length;++c){var e=","+encodeURIComponent(b.a[c]);131072>=a.length+e.length&&(a+=e)}b.g&&(e="&rd="+encodeURIComponent(JSON.stringify(s())),131072>=a.length+e.length&&(a+=e),d=!0);t=a;if(d){c=b.f;b=b.h;var f;if(window.XMLHttpRequest)f=new XMLHttpRequest;else if(window.ActiveXObject)try{f=new ActiveXObject("Msxml2.XMLHTTP")}catch(k){try{f=new ActiveXObject("Microsoft.XMLHTTP")}catch(u){}}f&&(f.open("POST",c+(-1==c.indexOf("?")?"?":"&")+"url="+encodeURIComponent(b)),f.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),f.send(a))}}},s=function(){var b={},d=document.getElementsByTagName("IMG");if(0==d.length)return{};var a=d[0];if(!("naturalWidth"in a&&"naturalHeight"in a))return{};for(var c=0;a=d[c];++c){var e=a.getAttribute("pagespeed_url_hash");e&&(!(e in b)&&0<a.width&&0<a.height&&0<a.naturalWidth&&0<a.naturalHeight||e in b&&a.width>=b[e].k&&a.height>=b[e].j)&&(b[e]={rw:a.width,rh:a.height,ow:a.naturalWidth,oh:a.naturalHeight})}return b},t="";h("pagespeed.CriticalImages.getBeaconData",function(){return t});h("pagespeed.CriticalImages.Run",function(b,d,a,c,e,f){var k=new p(b,d,a,e,f);n=k;c&&m(function(){window.setTimeout(function(){r(k)},0)})});})();pagespeed.CriticalImages.Run('/mod_pagespeed_beacon','http://email.cityfirst.church/weekly/20181122-cc','YddRYU7ik1',true,false,'EB7VoqXX_-4');
                                //]]></script><img src="http://email.cityfirst.church/wp-content/uploads/2018/03/cfc-logo-white.png" pagespeed_url_hash="491602901" onload="pagespeed.CriticalImages.checkImageForCriticality(this);"></th>
                            </tr>
                          </tbody></table>
                        </th>
                        <th class="small-2 large-3 columns last">
                          <table>
                            <tbody><tr>
                              <th></th>
                            </tr>
                          </tbody></table>
                        </th>


                      </tr>
                    </tbody>
                  </table><!-- .row -->
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody></table>
      <br>
    `;
  }

  private generateCardsHtml(cards: EmailCard[]): string {
    function generateParagraph(text, align) {
      return `
        <p style="text-align: ${align};">
          ${text}
        </p>
      `;
    }

    return cards.map(card => {
      let html = `
        <table class="container float-center">
          <tbody>
            <tr>
              <td>
      `;

      if (card.options.includes('image') && card.image) {
        html += `
        <!-- IMG -->
        <table class="row" style="background-color:#ffffff;color:#0a0a0a;">
          <tbody>
            <tr>
              <th class="full-width small-12 large-12 columns first last">
                <table>
                  <tbody>
                    <tr>
                      <th>
                        ${ card.link ? '<a href="' + card.link + '">' : '' }
                          <img width="100%" height="auto" src="${card.image}" pagespeed_url_hash="4186688614" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
                        ${ card.link ? '</a>' : '' }
                      </th>
                    </tr>
                  </tbody>
                </table>
              </th>
            </tr>
          </tbody>
        </table>
        <!-- IMG -->
        `;
      }

      if (card.options.includes('text') && (card.title || card.text.length)) {
        html += `
        <!-- CONTENT -->
        <table class="row" style="background-color:#ffffff;color:#0a0a0a;">
          <tbody>
            <tr>
              <th class="full-width small-12 large-12 columns first last">
                <table>
                  <tbody>
                    <tr>
                      <th>
                        <div class="inner" style="padding-top:20px;">
                          <h4 class="text-${card.titleAlignment}" style="line-height:1.2;text-transform:${card.titleCase};">
                            ${card.title}
                          </h4>
                          ${card.text.map(t => generateParagraph(t, card.textAlignment)).join('\n')}
                        </div>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </th>
            </tr>
          </tbody>
        </table>
        <!-- CONTENT -->
        `;
      }

      if (card.options.includes('button') && card.buttonText) {
        html += `
        <!-- CTA -->
        <table class="row" style="background-color:#ffffff;color:#0a0a0a;">
          <tbody>
            <tr>
              <th class="small-12 large-12 first last columns">
                <table>
                  <tbody>
                    <tr>
                      <th>
                        <table class="button large expanded radius">
                          <tbody>
                            <tr>
                              <td>
                                <table>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <a href="${card.link}">${card.buttonText}</a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </th>
            </tr>
          </tbody>
        </table>
        <!-- CTA -->
        `;
      }

      html += `
              </td>
            </tr>
          </tbody>
        </table>
        <br>
      `;
      return html;
    }).join('\n');
  }

  private generateFooterHtml(location: Location): string {
    return `
    <table class="container float-center">
      <tbody>
        <tr>
          <td>
            <!-- FOOTER -->
            <table id="url" class="row">
              <tbody>
                <tr>
                  <th class="full-width small-12 large-12 first last columns">
                    <table>
                      <tbody>
                        <tr>
                          <th>
                            <h5 class="text-center"><a href="https://${location.website}">${location.website}</a></h5>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </th>
                </tr>
              </tbody>
            </table>
            <!-- FOOTER -->
            <table class="wrapper secondary" align="center">
              <tbody>
                <tr>
                  <td class="wrapper-inner">
                    <table class="spacer">
                      <tbody>
                        <tr>
                          <td height="16px" style="font-size:16px;line-height:16px;"></td>
                        </tr>
                      </tbody>
                    </table>
                    <table id="social-links" class="row collapse">
                      <tbody>
                        <tr>
                          <th class="small-12 large-4 columns first">
                            <table class="button expanded instagram">
                              <tbody>
                                <tr>
                                  <td>
                                    <table>
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="${location.instagram}">
                                              <img src="https://www.cityfirst.church/emailblasts/assets/instagram_ffffff_32.png"
                                                class="social-icon" alt="" pagespeed_url_hash="826528573" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
                                              Instagram
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </th>
                          <th class="small-12 large-4 columns first">
                            <table class="button expanded facebook">
                              <tbody>
                                <tr>
                                  <td>
                                    <table>
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="${location.facebook}">
                                              <img src="https://www.cityfirst.church/emailblasts/assets/facebook_ffffff_32.png"
                                                class="social-icon" alt="" pagespeed_url_hash="3830040619" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
                                              Facebook
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </th>
                          <th class="small-12 large-4 columns first">
                            <table class="button expanded twitter">
                              <tbody>
                                <tr>
                                  <td>
                                    <table>
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a href="${location.twitter}">
                                              <img src="https://www.cityfirst.church/emailblasts/assets/twitter_ffffff_32.png"
                                                class="social-icon" alt="" pagespeed_url_hash="2644473766" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
                                              Twitter
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                    <table class="spacer">
                      <tbody>
                        <tr>
                          <td height="16px" style="font-size:16px;line-height:16px;"></td>
                        </tr>
                      </tbody>
                    </table>
                    <table id="footer" class="row">
                      <tbody>
                        <tr>
                          <th class="small-12 large-12 columns last">
                            <table>
                              <tbody>
                                <tr>
                                  <th>
                                    <h5 style="line-height:1.2;margin-bottom:0;">City First Church | Cape Coral</h5>
                                    <p>
                                      <img src="https://www.cityfirst.church/emailblasts/assets/map-marker_222222_32.png"
                                        class="info-icon" alt="" pagespeed_url_hash="2384867804" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
                                      <a href="${location.address.link}">
                                        ${location.address.display}
                                      </a><br>
                                      <img src="https://www.cityfirst.church/emailblasts/assets/phone_222222_32.png" class="info-icon"
                                        alt="" pagespeed_url_hash="4265406721" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
                                      <a href="tel:${location.phone}">${location.phone}</a><br>
                                      <img src="https://www.cityfirst.church/emailblasts/assets/send_222222_32.png" class="info-icon"
                                        alt="" pagespeed_url_hash="4258301657" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
                                      <a href="mailto:${location.email}">${location.email}</a><br>
                                      <img src="https://www.cityfirst.church/emailblasts/assets/globe_222222_32.png" class="info-icon"
                                        alt="" pagespeed_url_hash="156873848" onload="pagespeed.CriticalImages.checkImageForCriticality(this);">
                                      <a href="https://${location.website}">${location.website}</a>
                                    </p>
                                  </th>
                                </tr>
                              </tbody>
                            </table>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    `;
  }

  private generateDocument(content): string {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="https://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width">
        <style>
          @import url(https://fonts.googleapis.com/css?family=Lato:400,700,400italic) ;.wrapper{width:100%}#outlook a{padding:0}body{width:100%!important;min-width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;margin:0;margin:0;padding:0;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}.ExternalClass{width:100%}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:100%}#backgroundTable{margin:0;margin:0;padding:0;width:100%!important;line-height:100%!important}img{outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;width:auto;max-width:100%;clear:both;display:block}center{width:100%;min-width:580px}a img{border:none}p{margin:0 0 0 10px;margin:0 0 0 10px}table{border-spacing:0;border-collapse:collapse}td{word-wrap:break-word;-webkit-hyphens:auto;-moz-hyphens:auto;hyphens:auto;border-collapse:collapse!important}table,tr,td{padding:0;vertical-align:top;text-align:left}@media only screen{html{min-height:100%;background:#f3f3f3}}table.body{background:#f3f3f3;height:100%;width:100%}table.container{background:#fefefe;width:580px;margin:0 auto;margin:0 auto;text-align:inherit}table.row{padding:0;width:100%;position:relative}table.row table,table.row tbody,table.row tr,table.row th,table.row td{color:inherit!important}table.spacer{width:100%}table.spacer td{mso-line-height-rule:exactly}table.container table.row{display:table}td.columns,td.column,th.columns,th.column{margin:0 auto;margin:0 auto;padding-left:16px;padding-bottom:16px}th.column.full-width,th.columns.full-width{padding-left:0px!important;padding-right:0px!important}td.columns .column,td.columns .columns,td.column .column,td.column .columns,th.columns .column,th.columns .columns,th.column .column,th.column .columns{padding-left:0!important;padding-right:0!important}td.columns .column center,td.columns .columns center,td.column .column center,td.column .columns center,th.columns .column center,th.columns .columns center,th.column .column center,th.column .columns center{min-width:none!important}td.columns.last,td.column.last,th.columns.last,th.column.last{padding-right:16px}td.columns table:not(.button),
            td.column table:not(.button),
            th.columns table:not(.button),
            th.column table:not(.button) {width:100%}td.large-1,th.large-1{width:32.33333px;padding-left:8px;padding-right:8px}td.large-1.first,th.large-1.first{padding-left:16px}td.large-1.last,th.large-1.last{padding-right:16px}.collapse>tbody>tr>td.large-1,.collapse>tbody>tr>th.large-1{padding-right:0;padding-left:0;width:48.33333px}.collapse td.large-1.first,.collapse th.large-1.first,.collapse td.large-1.last,.collapse th.large-1.last{width:56.33333px}td.large-1 center,th.large-1 center{min-width:.33333px}.body .columns td.large-1,.body .column td.large-1,.body .columns th.large-1,.body .column th.large-1{width:8.33333%}td.large-2,th.large-2{width:80.66667px;padding-left:8px;padding-right:8px}td.large-2.first,th.large-2.first{padding-left:16px}td.large-2.last,th.large-2.last{padding-right:16px}.collapse>tbody>tr>td.large-2,.collapse>tbody>tr>th.large-2{padding-right:0;padding-left:0;width:96.66667px}.collapse td.large-2.first,.collapse th.large-2.first,.collapse td.large-2.last,.collapse th.large-2.last{width:104.66667px}td.large-2 center,th.large-2 center{min-width:48.66667px}.body .columns td.large-2,.body .column td.large-2,.body .columns th.large-2,.body .column th.large-2{width:16.66667%}td.large-3,th.large-3{width:129px;padding-left:8px;padding-right:8px}td.large-3.first,th.large-3.first{padding-left:16px}td.large-3.last,th.large-3.last{padding-right:16px}.collapse>tbody>tr>td.large-3,.collapse>tbody>tr>th.large-3{padding-right:0;padding-left:0;width:145px}.collapse td.large-3.first,.collapse th.large-3.first,.collapse td.large-3.last,.collapse th.large-3.last{width:153px}td.large-3 center,th.large-3 center{min-width:97px}.body .columns td.large-3,.body .column td.large-3,.body .columns th.large-3,.body .column th.large-3{width:25%}td.large-4,th.large-4{width:177.33333px;padding-left:8px;padding-right:8px}td.large-4.first,th.large-4.first{padding-left:16px}td.large-4.last,th.large-4.last{padding-right:16px}.collapse>tbody>tr>td.large-4,.collapse>tbody>tr>th.large-4{padding-right:0;padding-left:0;width:193.33333px}.collapse td.large-4.first,.collapse th.large-4.first,.collapse td.large-4.last,.collapse th.large-4.last{width:201.33333px}td.large-4 center,th.large-4 center{min-width:145.33333px}.body .columns td.large-4,.body .column td.large-4,.body .columns th.large-4,.body .column th.large-4{width:33.33333%}td.large-5,th.large-5{width:225.66667px;padding-left:8px;padding-right:8px}td.large-5.first,th.large-5.first{padding-left:16px}td.large-5.last,th.large-5.last{padding-right:16px}.collapse>tbody>tr>td.large-5,.collapse>tbody>tr>th.large-5{padding-right:0;padding-left:0;width:241.66667px}.collapse td.large-5.first,.collapse th.large-5.first,.collapse td.large-5.last,.collapse th.large-5.last{width:249.66667px}td.large-5 center,th.large-5 center{min-width:193.66667px}.body .columns td.large-5,.body .column td.large-5,.body .columns th.large-5,.body .column th.large-5{width:41.66667%}td.large-6,th.large-6{width:274px;padding-left:8px;padding-right:8px}td.large-6.first,th.large-6.first{padding-left:16px}td.large-6.last,th.large-6.last{padding-right:16px}.collapse>tbody>tr>td.large-6,.collapse>tbody>tr>th.large-6{padding-right:0;padding-left:0;width:290px}.collapse td.large-6.first,.collapse th.large-6.first,.collapse td.large-6.last,.collapse th.large-6.last{width:298px}td.large-6 center,th.large-6 center{min-width:242px}.body .columns td.large-6,.body .column td.large-6,.body .columns th.large-6,.body .column th.large-6{width:50%}td.large-7,th.large-7{width:322.33333px;padding-left:8px;padding-right:8px}td.large-7.first,th.large-7.first{padding-left:16px}td.large-7.last,th.large-7.last{padding-right:16px}.collapse>tbody>tr>td.large-7,.collapse>tbody>tr>th.large-7{padding-right:0;padding-left:0;width:338.33333px}.collapse td.large-7.first,.collapse th.large-7.first,.collapse td.large-7.last,.collapse th.large-7.last{width:346.33333px}td.large-7 center,th.large-7 center{min-width:290.33333px}.body .columns td.large-7,.body .column td.large-7,.body .columns th.large-7,.body .column th.large-7{width:58.33333%}td.large-8,th.large-8{width:370.66667px;padding-left:8px;padding-right:8px}td.large-8.first,th.large-8.first{padding-left:16px}td.large-8.last,th.large-8.last{padding-right:16px}.collapse>tbody>tr>td.large-8,.collapse>tbody>tr>th.large-8{padding-right:0;padding-left:0;width:386.66667px}.collapse td.large-8.first,.collapse th.large-8.first,.collapse td.large-8.last,.collapse th.large-8.last{width:394.66667px}td.large-8 center,th.large-8 center{min-width:338.66667px}.body .columns td.large-8,.body .column td.large-8,.body .columns th.large-8,.body .column th.large-8{width:66.66667%}td.large-9,th.large-9{width:419px;padding-left:8px;padding-right:8px}td.large-9.first,th.large-9.first{padding-left:16px}td.large-9.last,th.large-9.last{padding-right:16px}.collapse>tbody>tr>td.large-9,.collapse>tbody>tr>th.large-9{padding-right:0;padding-left:0;width:435px}.collapse td.large-9.first,.collapse th.large-9.first,.collapse td.large-9.last,.collapse th.large-9.last{width:443px}td.large-9 center,th.large-9 center{min-width:387px}.body .columns td.large-9,.body .column td.large-9,.body .columns th.large-9,.body .column th.large-9{width:75%}td.large-10,th.large-10{width:467.33333px;padding-left:8px;padding-right:8px}td.large-10.first,th.large-10.first{padding-left:16px}td.large-10.last,th.large-10.last{padding-right:16px}.collapse>tbody>tr>td.large-10,.collapse>tbody>tr>th.large-10{padding-right:0;padding-left:0;width:483.33333px}.collapse td.large-10.first,.collapse th.large-10.first,.collapse td.large-10.last,.collapse th.large-10.last{width:491.33333px}td.large-10 center,th.large-10 center{min-width:435.33333px}.body .columns td.large-10,.body .column td.large-10,.body .columns th.large-10,.body .column th.large-10{width:83.33333%}td.large-11,th.large-11{width:515.66667px;padding-left:8px;padding-right:8px}td.large-11.first,th.large-11.first{padding-left:16px}td.large-11.last,th.large-11.last{padding-right:16px}.collapse>tbody>tr>td.large-11,.collapse>tbody>tr>th.large-11{padding-right:0;padding-left:0;width:531.66667px}.collapse td.large-11.first,.collapse th.large-11.first,.collapse td.large-11.last,.collapse th.large-11.last{width:539.66667px}td.large-11 center,th.large-11 center{min-width:483.66667px}.body .columns td.large-11,.body .column td.large-11,.body .columns th.large-11,.body .column th.large-11{width:91.66667%}td.large-12,th.large-12{width:564px;padding-left:8px;padding-right:8px}td.large-12.first,th.large-12.first{padding-left:16px}td.large-12.last,th.large-12.last{padding-right:16px}.collapse>tbody>tr>td.large-12,.collapse>tbody>tr>th.large-12{padding-right:0;padding-left:0;width:580px}.collapse td.large-12.first,.collapse th.large-12.first,.collapse td.large-12.last,.collapse th.large-12.last{width:588px}td.large-12 center,th.large-12 center{min-width:532px}.body .columns td.large-12,.body .column td.large-12,.body .columns th.large-12,.body .column th.large-12{width:100%}td.large-offset-1,td.large-offset-1.first,td.large-offset-1.last,th.large-offset-1,th.large-offset-1.first,th.large-offset-1.last{padding-left:64.33333px}td.large-offset-2,td.large-offset-2.first,td.large-offset-2.last,th.large-offset-2,th.large-offset-2.first,th.large-offset-2.last{padding-left:112.66667px}td.large-offset-3,td.large-offset-3.first,td.large-offset-3.last,th.large-offset-3,th.large-offset-3.first,th.large-offset-3.last{padding-left:161px}td.large-offset-4,td.large-offset-4.first,td.large-offset-4.last,th.large-offset-4,th.large-offset-4.first,th.large-offset-4.last{padding-left:209.33333px}td.large-offset-5,td.large-offset-5.first,td.large-offset-5.last,th.large-offset-5,th.large-offset-5.first,th.large-offset-5.last{padding-left:257.66667px}td.large-offset-6,td.large-offset-6.first,td.large-offset-6.last,th.large-offset-6,th.large-offset-6.first,th.large-offset-6.last{padding-left:306px}td.large-offset-7,td.large-offset-7.first,td.large-offset-7.last,th.large-offset-7,th.large-offset-7.first,th.large-offset-7.last{padding-left:354.33333px}td.large-offset-8,td.large-offset-8.first,td.large-offset-8.last,th.large-offset-8,th.large-offset-8.first,th.large-offset-8.last{padding-left:402.66667px}td.large-offset-9,td.large-offset-9.first,td.large-offset-9.last,th.large-offset-9,th.large-offset-9.first,th.large-offset-9.last{padding-left:451px}td.large-offset-10,td.large-offset-10.first,td.large-offset-10.last,th.large-offset-10,th.large-offset-10.first,th.large-offset-10.last{padding-left:499.33333px}td.large-offset-11,td.large-offset-11.first,td.large-offset-11.last,th.large-offset-11,th.large-offset-11.first,th.large-offset-11.last{padding-left:547.66667px}td.expander,th.expander{visibility:hidden;width:0;padding:0!important}table.container.radius{border-radius:0;border-collapse:separate}.block-grid{width:100%;max-width:580px}.block-grid td{display:inline-block;padding:8px}.up-2 td{width:274px!important}.up-3 td{width:177px!important}.up-4 td{width:129px!important}.up-5 td{width:100px!important}.up-6 td{width:80px!important}.up-7 td{width:66px!important}.up-8 td{width:56px!important}table.text-center,th.text-center,td.text-center,h1.text-center,h2.text-center,h3.text-center,h4.text-center,h5.text-center,h6.text-center,p.text-center,span.text-center{text-align:center}table.text-left,th.text-left,td.text-left,h1.text-left,h2.text-left,h3.text-left,h4.text-left,h5.text-left,h6.text-left,p.text-left,span.text-left{text-align:left}table.text-right,th.text-right,td.text-right,h1.text-right,h2.text-right,h3.text-right,h4.text-right,h5.text-right,h6.text-right,p.text-right,span.text-right{text-align:right}span.text-center{display:block;width:100%;text-align:center}@media only screen and (max-width:596px){.small-float-center{margin:0 auto!important;float:none!important;text-align:center!important}.small-text-center{text-align:center!important}.small-text-left{text-align:left!important}.small-text-right{text-align:right!important}}img.float-left{float:left;text-align:left}img.float-right{float:right;text-align:right}img.float-center,img.text-center{margin:0 auto;margin:0 auto;float:none;text-align:center}table.float-center,td.float-center,th.float-center{margin:0 auto;margin:0 auto;float:none;text-align:center}.hide-for-large{display:none!important;mso-hide:all;overflow:hidden;max-height:0;font-size:0;width:0;line-height:0}@media only screen and (max-width:596px){.hide-for-large{display:block!important;width:auto!important;overflow:visible!important;max-height:none!important;font-size:inherit!important;line-height:inherit!important}}table.body table.container .hide-for-large *{mso-hide:all}@media only screen and (max-width:596px){table.body table.container .hide-for-large,table.body table.container .row.hide-for-large{display:table!important;width:100%!important}table.body table.container .callout-inner.hide-for-large{display:table-cell!important;width:100%!important}table.body table.container .show-for-large{display:none!important;width:0;mso-hide:all;overflow:hidden}}body,table.body,h1,h2,h3,h4,h5,h6,p,td,th,a{color:#0a0a0a;font-family:"Lato","Helvetica","Arial",sans-serif;font-weight:normal;padding:0;margin:0;margin:0;text-align:left;line-height:1.6}h1,h2,h3,h4,h5,h6{color:inherit;word-wrap:normal;font-family:"Lato","Helvetica","Arial",sans-serif;font-weight:700;margin-bottom:10px;margin-bottom:10px;line-height:1.2}h1{font-size:34px}h2{font-size:30px}h3{font-size:28px}h4{font-size:24px}h5{font-size:20px}h6{font-size:18px}body,table.body,p,td,th{font-size:16px;line-height:1.6}p{margin-bottom:16px;margin-bottom:16px}p.lead{font-size:20px;line-height:1.6}p.subheader{margin-top:4px;margin-bottom:8px;margin-top:4px;margin-bottom:8px;font-weight:normal;line-height:1.4;color:#8a8a8a}small{font-size:80%;color:inherit;font-weight:normal}a{color:#009bc5;font-weight:bold;text-decoration:none}a:hover{color:#009bc5}a:active{color:#009bc5}a:visited{color:#009bc5}h1 a,h1 a:visited,h2 a,h2 a:visited,h3 a,h3 a:visited,h4 a,h4 a:visited,h5 a,h5 a:visited,h6 a,h6 a:visited{color:#009bc5}pre{background:#f3f3f3;margin:30px 0;margin:30px 0}pre code{color:#cacaca}pre code span.callout{color:#8a8a8a;font-weight:bold}pre code span.callout-strong{color:#ff6908;font-weight:bold}table.hr{width:100%}table.hr th{height:0;max-width:580px;border-top:0;border-right:0;border-bottom:1px solid #0a0a0a;border-left:0;margin:20px auto;margin:20px auto;clear:both}.stat{font-size:40px;line-height:1}p+.stat{margin-top:-16px;margin-top:-16px}span.preheader{display:none!important;visibility:hidden;mso-hide:all!important;font-size:1px;color:#f3f3f3;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden}table.button{width:auto;margin:0 0 16px 0;margin:0 0 16px 0}table.button table td{text-align:left;color:#fff;background:#00b3e3;border:2px solid #00b3e3}table.button table td a{font-family:"Lato","Helvetica","Arial",sans-serif;font-size:14px;font-weight:bold;color:#fff;text-decoration:none;text-transform:uppercase;display:inline-block;padding:8px 16px 8px 16px;border:0 solid #00b3e3;border-radius:3px}table.button.radius table td{border-radius:3px;border:none}table.button.rounded table td{border-radius:500px;border:none}table.button:hover table tr td a,table.button:active table tr td a,table.button table tr td a:visited,table.button.tiny:hover table tr td a,table.button.tiny:active table tr td a,table.button.tiny table tr td a:visited,table.button.small:hover table tr td a,table.button.small:active table tr td a,table.button.small table tr td a:visited,table.button.large:hover table tr td a,table.button.large:active table tr td a,table.button.large table tr td a:visited{color:#fff}table.button.tiny table td,table.button.tiny table a{padding:4px 8px 4px 8px}table.button.tiny table a{font-size:10px;font-weight:normal}table.button.small table td,table.button.small table a{padding:5px 10px 5px 10px;font-size:12px}table.button.large table a{padding:10px 20px 10px 20px;font-size:18px}table.button.expand,table.button.expanded{width:100%!important}table.button.expand table,table.button.expanded table{width:100%}table.button.expand table a,table.button.expanded table a{text-align:center;width:100%;padding-left:0;padding-right:0}table.button.expand center,table.button.expanded center{min-width:0}table.button:hover table td,table.button:visited table td,table.button:active table td{background:#009bc5;color:#fff}table.button:hover table a,table.button:visited table a,table.button:active table a{border:0 solid #009bc5}table.button.secondary table td{background:#777;color:#fefefe;border:0px solid #777}table.button.secondary table a{color:#fefefe;border:0 solid #777}table.button.secondary:hover table td{background:#919191;color:#fefefe}table.button.secondary:hover table a{border:0 solid #919191}table.button.secondary:hover table td a{color:#fefefe}table.button.secondary:active table td a{color:#fefefe}table.button.secondary table td a:visited{color:#fefefe}table.button.success table td{background:#3adb76;border:0px solid #3adb76}table.button.success table a{border:0 solid #3adb76}table.button.success:hover table td{background:#23bf5d}table.button.success:hover table a{border:0 solid #23bf5d}table.button.alert table td{background:#ec5840;border:0px solid #ec5840}table.button.alert table a{border:0 solid #ec5840}table.button.alert:hover table td{background:#e23317}table.button.alert:hover table a{border:0 solid #e23317}table.button.warning table td{background:#ffae00;border:0px solid #ffae00}table.button.warning table a{border:0px solid #ffae00}table.button.warning:hover table td{background:#cc8b00}table.button.warning:hover table a{border:0px solid #cc8b00}table.callout{margin-bottom:16px;margin-bottom:16px}th.callout-inner{width:100%;border:1px solid #cbcbcb;padding:10px;background:#fefefe}th.callout-inner.primary{background:#def0fc;border:1px solid #444;color:#0a0a0a}th.callout-inner.secondary{background:#ebebeb;border:1px solid #444;color:#0a0a0a}th.callout-inner.success{background:#e1faea;border:1px solid #1b9448;color:#fefefe}th.callout-inner.warning{background:#fff3d9;border:1px solid #996800;color:#fefefe}th.callout-inner.alert{background:#fce6e2;border:1px solid #b42912;color:#fefefe}.thumbnail{border:solid 4px #fefefe;box-shadow:0 0 0 1px rgba(10,10,10,.2);display:inline-block;line-height:0;max-width:100%;transition:box-shadow 200ms ease-out;border-radius:3px;margin-bottom:16px}.thumbnail:hover,.thumbnail:focus{box-shadow:0 0 6px 1px rgba(33,153,232,.5)}table.menu{width:580px}table.menu td.menu-item,table.menu th.menu-item{padding:10px;padding-right:10px}table.menu td.menu-item a,table.menu th.menu-item a{color:#00b3e3}table.menu.vertical td.menu-item,table.menu.vertical th.menu-item{padding:10px;padding-right:0;display:block}table.menu.vertical td.menu-item a,table.menu.vertical th.menu-item a{width:100%}table.menu.vertical td.menu-item table.menu.vertical td.menu-item,table.menu.vertical td.menu-item table.menu.vertical th.menu-item,table.menu.vertical th.menu-item table.menu.vertical td.menu-item,table.menu.vertical th.menu-item table.menu.vertical th.menu-item{padding-left:10px}table.menu.text-center a{text-align:center}.menu[align="center"]{width:auto!important}body.outlook p{display:inline!important}@media only screen and (max-width:596px){table.body img{width:auto;height:auto}table.body center{min-width:0!important}table.body .container{width:95%!important}table.body .columns,table.body .column{height:auto!important;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;padding-left:16px!important;padding-right:16px!important}table.body .columns .column,table.body .columns .columns,table.body .column .column,table.body .column .columns{padding-left:0!important;padding-right:0!important}table.body .collapse .columns,table.body .collapse .column{padding-left:0!important;padding-right:0!important}td.small-1,th.small-1{display:inline-block!important;width:8.33333%!important}td.small-2,th.small-2{display:inline-block!important;width:16.66667%!important}td.small-3,th.small-3{display:inline-block!important;width:25%!important}td.small-4,th.small-4{display:inline-block!important;width:33.33333%!important}td.small-5,th.small-5{display:inline-block!important;width:41.66667%!important}td.small-6,th.small-6{display:inline-block!important;width:50%!important}td.small-7,th.small-7{display:inline-block!important;width:58.33333%!important}td.small-8,th.small-8{display:inline-block!important;width:66.66667%!important}td.small-9,th.small-9{display:inline-block!important;width:75%!important}td.small-10,th.small-10{display:inline-block!important;width:83.33333%!important}td.small-11,th.small-11{display:inline-block!important;width:91.66667%!important}td.small-12,th.small-12{display:inline-block!important;width:100%!important}.columns td.small-12,.column td.small-12,.columns th.small-12,.column th.small-12{display:block!important;width:100%!important}table.body td.small-offset-1,table.body th.small-offset-1{margin-left:8.33333%!important;margin-left:8.33333%!important}table.body td.small-offset-2,table.body th.small-offset-2{margin-left:16.66667%!important;margin-left:16.66667%!important}table.body td.small-offset-3,table.body th.small-offset-3{margin-left:25%!important;margin-left:25%!important}table.body td.small-offset-4,table.body th.small-offset-4{margin-left:33.33333%!important;margin-left:33.33333%!important}table.body td.small-offset-5,table.body th.small-offset-5{margin-left:41.66667%!important;margin-left:41.66667%!important}table.body td.small-offset-6,table.body th.small-offset-6{margin-left:50%!important;margin-left:50%!important}table.body td.small-offset-7,table.body th.small-offset-7{margin-left:58.33333%!important;margin-left:58.33333%!important}table.body td.small-offset-8,table.body th.small-offset-8{margin-left:66.66667%!important;margin-left:66.66667%!important}table.body td.small-offset-9,table.body th.small-offset-9{margin-left:75%!important;margin-left:75%!important}table.body td.small-offset-10,table.body th.small-offset-10{margin-left:83.33333%!important;margin-left:83.33333%!important}table.body td.small-offset-11,table.body th.small-offset-11{margin-left:91.66667%!important;margin-left:91.66667%!important}table.body table.columns td.expander,table.body table.columns th.expander{display:none!important}table.body .right-text-pad,table.body .text-pad-right{padding-left:10px!important}table.body .left-text-pad,table.body .text-pad-left{padding-right:10px!important}table.menu{width:100%!important}table.menu td,table.menu th{width:auto!important;display:inline-block!important}table.menu.vertical td,table.menu.vertical th,table.menu.small-vertical td,table.menu.small-vertical th{display:block!important}table.menu[align="center"]{width:auto!important}table.button.small-expand,table.button.small-expanded{width:100%!important}table.button.small-expand table,table.button.small-expanded table{width:100%}table.button.small-expand table a,table.button.small-expanded table a{text-align:center!important;width:100%!important;padding-left:0!important;padding-right:0!important}table.button.small-expand center,table.button.small-expanded center{min-width:0}}
        </style>
        <style>
          .header{background:#222}.header .columns{padding-bottom:0}.header p{color:#fff;margin-bottom:0}.header .wrapper-inner{padding:20px}.header .container{background:#222}.wrapper.secondary{background:#f3f3f3}.wrapper.black{background:#111!important;color:#fff}.wrapper.black table,.wrapper.black tbody,.wrapper.black tr,.wrapper.black th,.wrapper.black td,.wrapper.black .row,.wrapper.black .columns,.wrapper.black h1,.wrapper.black h2,.wrapper.black h3,.wrapper.black h4,.wrapper.black h5,.wrapper.black h6,.wrapper.black p,.wrapper.black a{color:#fff!important}.inner{margin-left:30px;margin-right:30px}.blackbg{background:#111!important;color:#fff}.blackbg table,.blackbg tbody{color:inherit!important}h1,h2,h3,h4,h5,h6,p,tbody,tr,td,th{-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;color:inherit!important}em{letter-spacing:0}blockquote{font-style:italic;border-top:4px solid #ddd;border-bottom:4px solid #ddd;padding:10px 0 16px}blockquote p{font-weight:bold;text-align:center;margin-bottom:0}.info-icon{display:inline;width:14px!important;height:auto;position:relative;top:3px;margin-right:5px}img.social-icon{float:none;display:inline;width:16px!important;position:relative;top:3px}#social-links .columns{padding-bottom:0}#social-links table.button{margin-bottom:0}#social-links table.button td a{color:#fff;text-transform:none}table.button.instagram table td{background:#125688;border:none}table.button.instagram:hover table td{background:#0f4a76!important}table.button.facebook table td{background:#3b5998;border:none}table.button.facebook:hover table td{background:#2d4473!important}table.button.twitter table td{background:#00acee;border:none}table.button.twitter:hover table td{background:#0087bb!important}#footer{color:#222}#footer th,#footer h5,#footer p{color:inherit}#footer p{font-size:14px}#url{background:#ddd}#url .columns{padding:10px 0}#url .columns h5{margin-bottom:0}#url .columns h5 a{color:#666}
        </style>
      </head>
      <body>
        <table class="body" data-made-with-foundation="">
          <tbody>
            <tr>
              <td class="float-center" >
                <center data-parsed="">
                  ${content}
                </center>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
    `;
  }
}
