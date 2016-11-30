export default function getConvertedValue(par: any): string {
    if (par === true || par === "true") { return '1'; }
    if (par === false || par === "false") { return '0'; }
    if (typeof par === "string") { return "'" + par + "'"; }
    return String(par);
}