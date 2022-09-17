import * as p5 from 'p5';
import {createPrng, isPWPreview, setPreviewReady, setProperties} from "./publicworks";
import {generateTraits} from "./traits";

let s = (sk) => {
    const {traits, attributes} = generateTraits(createPrng());
    setProperties(attributes, traits);

    sk.setup = () => {
        const dimensions = getDimensions();
        sk.createCanvas(...dimensions)
        sk.colorMode(sk.HSL)
    }

    sk.draw = () => {
        const bg = sk.color(traits.bgHue, traits.bgSaturation, traits.bgLightness);
        sk.background(bg)

        const border = Math.round(sk.width * 0.15);
        const skew = border / traits.layers;

        for (let i = 0; i < traits.layers; i++) {
            const prng = createPrng()
            sk.push()
            sk.translate((i - Math.floor(traits.layers / 2)) * skew, 0)

            const fg = sk.color(traits.fgHue, traits.fgSaturation * (i / traits.layers), traits.fgLightness * (i / traits.layers));
            sk.fill(fg)
            sk.noStroke()
            sk.beginShape()

            for (let i = 0; i < traits.numLines; i++) {
                const x = prng.randomInt(border, sk.width - border)
                const y = prng.randomInt(border, sk.height - border)
                sk.curveVertex(x, y)
            }

            sk.endShape()
            sk.pop()
        }

        setPreviewReady()
        sk.noLoop()
    }
    const getDimensions = () => {
        let desiredHeight = sk.windowHeight
        let desiredWidth = sk.windowHeight;
        if (desiredWidth > sk.windowWidth) {
            desiredWidth = sk.windowWidth;
            desiredHeight = sk.windowWidth;
        }
        return [desiredWidth, desiredHeight]
    }
    sk.windowResized = () => {
        if (!isPWPreview()) {
            const dimensions = getDimensions();
            sk.resizeCanvas(...dimensions);
            // redraw at new dimensions
            sk.loop()
        }
    }
}

export const createSketch = () => {
    return new p5(s, document.getElementById('root'));
}
