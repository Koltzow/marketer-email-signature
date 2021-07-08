import { h } from 'preact';
import { useState } from 'preact/compat';

import style from './style';
//import Image from '/assets/marketer-logo.png';

const Image = 'https://marketer.anti.build/marketer-3.png';

const ImageEmbedded = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAAuCAYAAAFylLOGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi40IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkUwQzE4NUY5RDY3QzExRUJBN0M5OUNCQkQ0QTcxMEY0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkUwQzE4NUZBRDY3QzExRUJBN0M5OUNCQkQ0QTcxMEY0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTBDMTg1RjdENjdDMTFFQkE3Qzk5Q0JCRDRBNzEwRjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTBDMTg1RjhENjdDMTFFQkE3Qzk5Q0JCRDRBNzEwRjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4DwXJ1AAAnnUlEQVR42mL4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';

const Generator = () => {

  const [success, setSuccess] = useState(false);

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('47');
  const [prefix, setPrefix] = useState('Med vennlig hilsen / Kind regards');
  const [embed, setEmbed] = useState(false);
  const website = 'https://www.marketer.tech';

  const updatePrefix = (e) => {
    setPrefix(e.target.value);
  };

  const updateEmbed = (e) => {
    setEmbed(e.target.checked);
  }

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateTitle = (e) => {
    setTitle(e.target.value);
  }

  const updateCode = (e) => {
    setCode(e.target.value);
  }

  const updatePhone = (e) => {
    setPhone(e.target.value);
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  }

  const formatPhone = (check, num) => {

    if(!num) {
      return num;
    }

    let cleaned = ('' + num).replace(/\D/g, '');
    
    if(check === '47') {
      let match = cleaned.match(/^(\d{3})(\d{2})(\d{3})$/);
      
      if (match) {
        return match[1] + ' ' + match[2] + ' ' + match[3];
      }

    }

    if(check === '1') {
      let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      
      if (match) {
        return '(' + match[1] + ') ' + match[2] + ' ' + match[3];
      }

    }

    if(check === '62') {

      let match = cleaned.match(/^(\d{2})(\d{3})(\d{4})$/);
      
      if (match) {
        return '(' + match[1] + ') ' + match[2] + ' ' + match[3];
      }

      match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      
      if (match) {
        return '(' + match[1] + ') ' + match[2] + ' ' + match[3];
      }

      match = cleaned.match(/^(\d{4})(\d{3})(\d{4})$/);
      
      if (match) {
        return '(' + match[1] + ') ' + match[2] + ' ' + match[3];
      }

    }

    return num;
  };

  const copyToClipboard = (text) => {
    let textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      let successful = document.execCommand('copy');
      let msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);

      if(successful) {

        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
        }, 2000);

      }

    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  }

  const nameFormatted = name.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase()+w.substr(1)).join(' ');
  const phoneFormatted = formatPhone(code, phone);
  const websiteClean = website.split('//')[1];

  const output = 
`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title></title>
  </head>
  <body style="color: #000000; line-height: 1em;">
    ${prefix && `<div style="font-family: Arial, sans-serif; font-size: 1em; line-height: 1.3em;">${prefix}</div>
    <br/><br/>`}
    ${name && `<div style="font-family: Arial, sans-serif; font-size: 1em; line-height: 1.3em; font-weight: bold;">${nameFormatted}</div>`}
    ${title && `<div style="font-family: Arial, sans-serif; line-height: 1em; font-size: 1.3em; ">${title}</div>`}
    ${(name || title) && `<br />`}
    ${phone && `<div style="font-family: Arial, sans-serif; font-size: 1em; line-height: 1.3em; ">${code && `+${code} `}${phoneFormatted}</div>`}
    ${email && `<div style="font-family: Arial, sans-serif; font-size: 1em; line-height: 1.3em "><a style="color:#000000;" href="mailto:${email}">${email}</a></div>`}
    ${website && `<div style="font-family: Arial, sans-serif; font-size: 1em; line-height: 1.3em"><a style="color:#000000;" href="${website}">${websiteClean}</a></div>`}
    <br /><br />
    <img src="${(embed ? ImageEmbedded : Image)}" width="100" alt="Marketer logo" />
  </body>
</html>`;

  let blackStyle = {
    fontFamily: 'arial, sans-serif',
    lineHeight: '1.3em',
    fontSize: '1em',
    color: '#000'
  };

  let blackStyleBold = {
    ...blackStyle,
    fontWeight: 'bold'
  };

  return (
    <div class={style.main}>
      <div class={style.formContainer}>
        <div class={style.header}>
          <h1 class={style.title}>Marketer</h1>
          <p class={style.desc}>Email Signature Generator</p>
        </div>
        <div class={style.formwrapper}>
          <h2 class={style.subtitle}>Signature information</h2>
          <p class={style.subdesc}>Please fill inn the information below to generate.</p>
          <form class={style.form}>
            <div class={style.field}>
              <label for="prefix">Prefix</label>
              <input id="prefix" defaultValue={prefix} type="text" name="prefix" onChange={updatePrefix} />
            </div>
            <div class={style.field}>
              <label for="name">Full name</label>
              <input id="name" autoComplete="on" type="text" name="name" onChange={updateName} />
            </div>
            <div class={style.field}>
              <label for="organization-title">Job title</label>
              <input id="organization-title" autoComplete="organization-title" type="text" name="organization-title" onChange={updateTitle} />
            </div>
            <div class={style.phone}>
              <div class={style.field}>
                <label for="tel-country-code">Country Code</label>
                <input id="tel-country-code" defaultValue={code} autoComplete="tel-country-code" type="text" name="tel-country-code" onChange={updateCode} />
              </div>
              <div class={style.field}>
                <label for="tel-national">Phone number</label>
                <input id="tel-national" autoComplete="on" type="text" name="tel-national" onChange={updatePhone} />
              </div>
            </div>
            <div class={style.field}>
              <label for="email">Email</label>
              <input id="email" autoComplete="on" type="email" name="email" onChange={updateEmail} />
            </div>
          </form>
          <h2 class={style.subtitle}>Some clients support embedded image</h2>
          <p class={style.subdesc}>If you get errors about to long signature, don't embed</p>
          <form class={style.form}>
            <div class={style.field}>
              <label><input type="checkbox" name="embed" defaultValue={embed} onClick={updateEmbed}/> Embed image</label>
            </div>
          </form>
        </div>
      </div>
      <div class={style.preview}>
        <label class={style.previewLabel}>Highlight preview and copy</label>
        <div class={style.previewWrapper}>
          {prefix && <><div style={blackStyle}>{prefix}</div><br/><br/></>}
          {name && <div style={blackStyleBold}>{nameFormatted}</div>}
          {title && <div style={blackStyle}>{title}</div>}
          {(name || title) && <br />}
          {phone && <div style={blackStyle}>{code && `+${code} `}{phone && phoneFormatted}</div>}
         {email && <div style={blackStyle} class={style.underline}><a style={blackStyle} href={`mailto:${email}`}>{email}</a></div>}
          {website && <div style={blackStyle} class={style.underline}><a style={blackStyle} href={website}>{websiteClean}</a></div>}
          <br/>
          <br/>
          <div class={style.logo}><img src={(embed ? ImageEmbedded : Image)} /></div>
        </div>
      </div>
      <div class={style.output}>
        <button disabled={success} class={`${style.copy} ${success && style.success}`} onClick={() => copyToClipboard(output)}>{success ? 'Copied to clipboard' : 'Click this to copy'}</button>
        <textarea disabled rows={30} class={style.codeWrapper}>
            {output}
        </textarea>
      </div>
    </div>
  );
};

export default Generator;
