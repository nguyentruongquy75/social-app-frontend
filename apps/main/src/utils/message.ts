export function getFormMessage(base: string, field: string) {
  return base.replace('{{name}}', field);
}

export function getMinLengthMessage(base: string, field: string, min: number) {
  return base.replace('{{name}}', field).replace('{{length}}', min + '');
}
