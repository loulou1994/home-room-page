export default function pxToRem(pxVal, unit="rem"){
    return (pxVal / 16) + unit
}