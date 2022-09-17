import {generateTxHash, PRNGRand} from "./random";

/**
 * Get reset PRNG instance.
 */
export const createPrng = () => {
    return new PRNGRand();
}

/**
 * Check if the work is rendering in the public works preview pipeline
 */
export const isPWPreview = () => {
    return new URLSearchParams(window.location.search).get('preview') === 'true'
}

/**
 * Enable new hashes on click during development.
 */
export const registerDevEvents = () => {
    const freshHash = () => {
        window.location = '?hash=' + generateTxHash()
    }
    window.addEventListener('touchend', function () {
        freshHash()
    });
    document.addEventListener('keyup', (e) => {
        if (e.key === ' ') {
            freshHash()
        }
    })
}

const setWindowProperties = (key, attributes) => {
    if (typeof attributes !== 'object') {
        throw new Error('attributes should be an object')
    }
    window[key] = {...attributes};
}

/**
 * Set the NFT traits. Attributes are the NFT attributes seen on marketplaces. Traits are optional numeric 
 * representations of attributes to expose to public works.
 */
export const setProperties = (attributes, traits = {}) => {
    setWindowProperties('attributes', attributes)
    setWindowProperties('traits', traits)
}

/**
 * Notify public works preview pipeline that rendering is complete.
 */
export const setPreviewReady = () => {
    window.previewReady = true;
}