import { h } from 'preact';
import { useState } from 'preact/compat';

import style from './style';
//import Image from '/assets/marketer-logo.png';

const Image = 'https://www.marketer.tech/logo/marketer-email.png';

const ImageEmbedded = 'data:image/png;base64,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';

const Generator = () => {

  const [success, setSuccess] = useState(false);

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('47');
  const [prefix, setPrefix] = useState('Med vennlig hilsen / Kind regards');
  const [embed, setEmbed] = useState(true);
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
    ${title && `<div style="font-family: Arial, sans-serif; font-size: 1em; line-height: 1.3em;">${title}</div>`}
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
    fontSize: '12px',
    color: 'black'
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
          <div class={style.warning}>Most email clients accept copy/paste of the preview. Only use HTML if you know how to implement it.</div>
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
          <div class={style.warning}>If you get errors about too long signatures, turn off embedding.</div>
          <form class={style.form}>
            <div class={style.field}>
              <label><input type="checkbox" name="embed" defaultChecked={embed} onClick={updateEmbed}/> Embed image</label>
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
        <button disabled={success} class={`${style.copy} ${success && style.success}`} onClick={() => copyToClipboard(output)}>{success ? 'Copied to clipboard' : 'Click this to copy HTML'}</button>
        <textarea disabled rows={30} class={style.codeWrapper}>
            {output}
        </textarea>
      </div>
    </div>
  );
};

export default Generator;
