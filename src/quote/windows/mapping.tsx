const COLOR_MAP = {
	Almond: 'rgb(219, 206, 187)',
	null: 'rgb(100, 100, 100)',
	White: 'rgb(244, 244 ,244)',
	'Classic White': 'rgb(199, 199, 199)',
	undefined: 'rgb(100, 100, 100)',
	Fossil: 'rgb(177, 165, 152)',
};

/* This shifts a primary component of an RGB color by a certain amount */
const shiftColor = (primaryColor, shift) => {
	let MAX = 255;
	let MIN = 0;
	if (primaryColor - shift > MAX) {
		return MAX;
	}
	if (primaryColor - shift < MIN) {
		return MIN;
	}
	return primaryColor - shift;
};
/* This creates a new RGB color based on a shift from the original */
const createColor = (rgb, shade, base) => {
	const SHIFT = base - shade;
	let r = shiftColor(rgb[0], SHIFT);
	let g = shiftColor(rgb[1], SHIFT);
	let b = shiftColor(rgb[2], SHIFT);
	return 'rgb(' + r + ',' + g + ',' + b + ')';
};

/* This returns a map of different shades of an RGB color for a window */
const getRGBMap = (colorName, shades, base) => {
	const color = COLOR_MAP[colorName];
	const rgb = color.replace('rgb(', '').replace(')', '').split(',');
	const rgbMap = {};
	for (let i = 1; i <= shades.length; i++) {
		rgbMap[i] = createColor(rgb, shades[i - 1], base);
	}
	return rgbMap;
};

export default getRGBMap;
