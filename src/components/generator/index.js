import { h } from 'preact';
import { useState } from 'preact/compat';

import style from './style';
import Image from '/assets/marketer-logo.png';

const Generator = () => {

  const [success, setSuccess] = useState(false);

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const website = 'https://www.marketer.tech';

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
    ${name && `<div style="font-family: Arial, sans-serif; font-size: 1em; line-height: 1em; font-weight: bold;">${nameFormatted}</div>`}
    ${title && `<div style="font-family: Arial, sans-serif; line-height: 1em; font-size: 1em; ">${title}</div>`}
    ${(name || title) && `<br />`}
    ${phone && `<div style="font-family: Arial, sans-serif; font-size: 1em; line-height: 1em; ">${code && `+${code} `}${phoneFormatted}</div>`}
    ${email && `<div style="font-family: Arial, sans-serif; font-size: 1em; line-height: 1em "><a style="color:#000000;" href="mailto:${email}">${email}</a></div>`}
    ${website && `<div style="font-family: Arial, sans-serif; font-size: 1em; line-height: 1em"><a style="color:#000000;" href="${website}">${websiteClean}</a></div>`}
    <br /><br/>
    <img src="${Image}" width="100" alt="Marketer logo" />
  </body>
</html>`;

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
          <div class={style.form}>
            <div class={style.field}>
              <label>Full name</label>
              <input type="text" name="fullName" onChange={updateName} />
            </div>
            <div class={style.field}>
              <label>Job title</label>
              <input type="text" name="title" onChange={updateTitle} />
            </div>
            <div class={style.phone}>
              <div class={style.field}>
                <label>Country Code</label>
                <input type="number" min={1} max={300} name="countryCode" onChange={updateCode} />
              </div>
              <div class={style.field}>
                <label>Phone number</label>
                <input type="text" name="mobile" onChange={updatePhone} />
              </div>
            </div>
            <div class={style.field}>
              <label>Email</label>
              <input type="email" name="email" onChange={updateEmail} />
            </div>
          </div>
        </div>
      </div>
      <div class={style.preview}>
        <label class={style.previewLabel}>Highlight preview and copy</label>
        <div class={style.previewWrapper}>
          {name && <div class={style.bold}>{nameFormatted}</div>}
          {title && <div>{title}</div>}
          {(name || title) && <br />}
          {phone && <div>{code && `+${code} `}{phone && phoneFormatted}</div>}
         {email && <div class={style.underline}>{email}</div>}
          {website && <div class={style.underline}>{websiteClean}</div>}
          <br/>
          <br/>
          <div class={style.logo}><img src={Image} /></div>
        </div>
      </div>
      <div class={style.output}>
        <button disabled={success} class={`${style.copy} ${success && style.success}`} onClick={() => copyToClipboard(output)}>{success ? 'Copied' : 'Click this to copy'}</button>
        <textarea disabled rows={30} class={style.codeWrapper}>
            {output}
        </textarea>
      </div>
    </div>
  );
};

export default Generator;
