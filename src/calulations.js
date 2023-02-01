function kelvToCelc(kelv) {
    const celcius = Math.round(kelv - 273.15);
    return celcius;
}

function kelvToFahr(kelv) {
    const fahrenheit = Math.round((kelv - 273.15) * 9/5 + 32);
    return fahrenheit;
}

export {kelvToCelc, kelvToFahr};