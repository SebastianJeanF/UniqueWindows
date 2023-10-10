import * as React from 'react';
const SVGComponent = (props) => (
	<svg
		id='visual'
		viewBox='0 0 900 450'
		width={900}
		height={450}
		xmlns='http://www.w3.org/2000/svg'
		xmlnsXlink='http://www.w3.org/1999/xlink'
		className='z-20'
		style={{ zIndex: '-40' }}
		{...props}>
		<defs>
			<filter id='blur1' x='-10%' y='-10%' width='120%' height='120%'>
				<feFlood floodOpacity={0} result='BackgroundImageFix' />
				<feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
				<feGaussianBlur stdDeviation={149} result='effect1_foregroundBlur' />
			</filter>
		</defs>
		<rect width={900} height={450} fill='#6600FF' />
		<g filter='url(#blur1)'>
			<circle cx={824} cy={41} fill='#00CC99' r={332} />
			<circle cx={696} cy={219} fill='#6600FF' r={332} />
			<circle cx={120} cy={11} fill='#00CC99' r={332} />
			<circle cx={871} cy={264} fill='#00CC99' r={332} />
			<circle cx={233} cy={425} fill='#6600FF' r={332} />
			<circle cx={482} cy={171} fill='#00CC99' r={332} />
		</g>
	</svg>
);
export default SVGComponent;
