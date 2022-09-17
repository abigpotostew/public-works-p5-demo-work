const mapDecimalToWord = (value, lo = 0, hi = 1) => {
    const normal = (value - lo) / (hi - lo);
    if (normal < .5) {
        return 'Low'
    } else if (normal < 0.75) {
        return 'Medium';
    } else {
        return 'High'
    }
}
export const generateTraits = (prng) => {
    const createHSLColor = () => {
        const res = {
            hue: prng.randomInt(0, 360),
            saturation: prng.randomInt(50, 100),
            lightness: prng.randomInt(50, 100)
        }
        return res
    }
    const colorStyle = prng.randomWeighted(new Map([['COMPLIMENT', .5], ["ANALOGOUS", .5], ["TRIADIC", .25]]))
    let degrees;
    if (colorStyle === 'COMPLIMENT') {
        degrees = 180
    } else if (colorStyle === 'ANALOGOUS') {
        degrees = 60
    } else {
        degrees = 120;
    }
    const {hue: bgHue, saturation: bgSaturation, lightness: bgLightness} = createHSLColor()
    const {fgHue, fgSaturation, fgLightness} = {
        fgHue: (bgHue + degrees) % 360, // fg is a complimentary color to bg
        fgSaturation: Math.min((bgSaturation + (prng.randomInt(10) - prng.randomInt(10))), 100),
        fgLightness: Math.min((bgLightness + (prng.randomInt(10) - prng.randomInt(10))), 100)
    }
    const numLines = prng.randomInt(10, 40);
    const layers = prng.randomInt(2, 10);

    const attributes = {
        'Background Lightness': mapDecimalToWord(bgLightness, 0, 100),
        "Foreground Brightness": mapDecimalToWord(fgLightness, 0, 100),
        "Number of Lines": mapDecimalToWord(numLines, 10, 290),
        "Layers": mapDecimalToWord(layers, 1, 5)
    }
    const traits = {bgHue, bgSaturation, bgLightness, fgHue, fgSaturation, fgLightness, numLines, layers};
    console.log("attributes", attributes)
    console.log("traits", traits)
    return {attributes, traits}
}