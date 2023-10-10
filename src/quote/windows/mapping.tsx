const COLOR_MAP = {
	Almond: 'rgb(219, 206, 187)',
	null: 'rgb(199, 199, 199)',
	undefined: 'rgb(199, 199, 199)',
	White: 'rgb(225, 225, 225)',
	Fossil: 'rgb(177, 165, 152)',
	Brown: 'rgb(81, 68, 49)',
	'Brick Red': 'rgb(102, 13, 0)',
	Black: 'rgb(60, 60, 60)',
	'Black Stain': 'rgb(80, 80, 80)',
	'Bright White Paint': 'rgb(235, 235, 235)',
	Primed: 'rgb(248, 246, 236)',
	'Linen White Paint': 'rgb(244, 237, 221)',
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
const createColor = (rgb: number, shade, base) => {
	const SHIFT = base - shade;
	let r = shiftColor(rgb[0], SHIFT);
	let g = shiftColor(rgb[1], SHIFT);
	let b = shiftColor(rgb[2], SHIFT);
	return 'rgb(' + r + ',' + g + ',' + b + ')';
};

/* This returns a map of different shades of an RGB color for a window */
const getRGBMap = (colorName, shades, base) => {
	let color = COLOR_MAP[colorName];
	if (!color) {
		color = COLOR_MAP['undefined'];
	}
	const rgb = color.replace('rgb(', '').replace(')', '').split(',');
	const rgbMap = {};
	for (let i = 1; i <= shades.length; i++) {
		rgbMap[i] = createColor(rgb, shades[i - 1], base);
	}
	return rgbMap;
};

export default getRGBMap;
