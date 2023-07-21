// Soon

function kFormatter(num) {
    if (Math.abs(num) > 999 && Math.abs(num) < 999999) {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    } else if (Math.abs(num) > 999999) {
        return Math.abs(num) > 999999 ? Math.sign(num)*((Math.abs(num)/1000000).toFixed(1)) + 'M' : Math.sign(num)*Math.abs(num)
    } else if (Math.abs(num) < 999) {
        return num
    }
}
    
console.log(kFormatter(3750000)); // 1.2k
console.log(kFormatter(-1200)); // -1.2k
console.log(kFormatter(900)); // 900
console.log(kFormatter(-900)); // -900