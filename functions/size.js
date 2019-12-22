import upperFirst from '../utils/upperFirst.js';
import globalValues from '../values/global.js';
const { c } = globalValues;

export default function size(props) { // props -> { width,height }

    if (!props) props = {};
    if (!props.width) props.width = window.innerWidth;
    if (!props.height) props.height = window.innerHeight;

    Object.keys(props).forEach(key => {
        const innerAxis = () => window[`inner${upperFirst(key)}`];
        let value = props[key];

        if (value === innerAxis())
            value = () => innerAxis();
        else if (typeof value !== 'function') value = () => value;
        c[key] = value();

        window.addEventListener('resize', () => c[key] = value());
    });
};