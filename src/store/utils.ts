function uuid() {
  let u = '',
    i = 0;
  while (i++ < 36) {
    const c = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i - 1],
      r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    u += c == '-' || c == '4' ? c : v.toString(16);
  }
  return u;
}
const DEFAULT_NOTE_BODY = `Hello, AsciiDoc!
~~~~~~~~~~~~~~~~
- Take notes
- Save to Google Drive
- Preview rendered notes in Edit
  
image::https://cf.ltkcdn.net/dogs/images/std/65325-371x324-Great_dane.jpg[200,200]
  `;
export {
  uuid,
  DEFAULT_NOTE_BODY,
};
