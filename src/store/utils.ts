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

export {
  uuid,
};
