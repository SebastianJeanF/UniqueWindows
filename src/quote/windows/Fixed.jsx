import * as React from 'react';
import getRGBMap from './mapping.tsx';
// Image was created using SVGViewer: https://www.svgviewer.dev/svg-to-react-jsx

const SVGComponent = ({ colorName, props }) => {
	// Example, 199 represents rbg(199, 199, 199)
	const shades = [199, 156, 126, 104];
	const base = 199;
	const fill = getRGBMap(colorName, shades, base);

	// Learned how to add a texture to SVG from Stack Overflow: https://stackoverflow.com/questions/54605976/apply-a-texture-to-an-image-in-svg
	// Learned how to format texture properly from Stack Overflow: https://stackoverflow.com/questions/23227195/how-to-make-svg-fill-act-in-a-similar-way-to-css-background-size-cover#:~:text=To%20fix%20this%2C%20add%20an%20appropriate%20preserveAspectRatio%20attribute,want%20the%20image%20to%20be%20zoomed%20and%20sliced.
	return (
		<svg
			width='33.602089mm'
			height='62.970829mm'
			viewBox='0 0 33.602089 62.970829'
			id='svg1'
			inkscape:version='1.3 (0e150ed6c4, 2023-07-21)'
			sodipodi:docname='Fixed.svg'
			xmlSpace='preserve'
			xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape'
			xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd'
			xmlns='http://www.w3.org/2000/svg'
			xmlns:svg='http://www.w3.org/2000/svg'
			{...props}>
			<sodipodi:namedview
				id='namedview1'
				pagecolor='#ffffff'
				bordercolor='#000000'
				borderopacity={0.25}
				inkscape:showpageshadow={2}
				inkscape:pageopacity={0}
				inkscape:pagecheckerboard={0}
				inkscape:deskcolor='#d1d1d1'
				inkscape:document-units='mm'
				inkscape:zoom={1.4778115}
				inkscape:cx={130.93686}
				inkscape:cy={158.00391}
				inkscape:window-width={1350}
				inkscape:window-height={1237}
				inkscape:window-x={723}
				inkscape:window-y={131}
				inkscape:window-maximized={0}
				inkscape:current-layer='layer1'
			/>

			<defs>
				<filter id='texture'>
					<feImage
						href='https://images.ctfassets.net/dd68j6yxui75/6ZQVf1jLUbLB7GtUjNCSWg/af678d0cfa590c758550eeeef9134a6b/Provincial-Stain.png'
						result='texture-img'
						preserveAspectRatio='xMinYMin slice'
					/>
					<feComposite in2='SourceGraphic' operator='in' in='texture-img' result='composite' />
					<feBlend in='SourceGraphic' in2='composite' mode='multiply' />
				</filter>
			</defs>

			<g
				inkscape:label='Layer 1'
				inkscape:groupmode='layer'
				id='layer1'
				transform='translate(-92.121963,-120.71384)'
				// filter='url(#texture)'
			>
				<g id='g47' transform='translate(-34.912267,17.187577)'>
					<path
						style={{
							fill: fill[1],
						}}
						d='m 127.03423,135.01168 v -31.48542 h 16.80105 16.80104 v 31.48542 31.48541 h -16.80104 -16.80105 z m 30.62673,0.0661 -0.0649,-28.50885 -0.0685,28.37411 -0.0685,28.37412 -13.29413,0.0711 -13.29412,0.0711 13.42761,0.0636 13.4276,0.0636 z m -0.79372,0 -0.0649,-27.7151 -0.0686,27.58029 -0.0686,27.5803 -12.89721,0.0712 -12.89722,0.0712 13.03073,0.0636 13.03073,0.0636 z m -2.31634,-0.0661 v -25.4 h -10.71562 -10.71563 v 25.4 25.4 h 10.71563 10.71562 z'
						id='path50'
					/>
					<path
						style={{
							fill: fill[2],
						}}
						d='m 127.15703,166.16835 c -0.0697,-0.18299 -0.0961,-14.32256 -0.0586,-31.42126 l 0.0681,-31.08854 h 16.66876 16.66875 v 31.35313 31.35312 l -16.61015,0.0681 c -13.14774,0.0539 -16.63655,-10e-4 -16.73685,-0.26459 z m 33.2147,-31.15667 V 104.05543 H 143.96757 127.5634 v 30.95625 30.95625 h 16.40417 16.40416 z m -30.62669,-0.10261 0.0673,-28.60468 13.93261,-0.0685 c 13.83931,-0.068 13.93168,-0.0649 13.79362,0.46302 -0.0764,0.29232 -0.3037,0.5315 -0.50501,0.5315 -0.2013,0 -0.36601,0.17742 -0.36601,0.39428 0,0.34279 -1.63271,0.40326 -12.50157,0.46302 l -12.50156,0.0687 -0.0674,27.18594 c -0.0586,23.66042 -0.11761,27.18593 -0.45471,27.18593 -0.21958,0 -0.32699,0.15726 -0.248,0.3631 0.0899,0.23414 -0.10145,0.40913 -0.53865,0.4927 l -0.67798,0.12961 z m 2.17467,26.49752 c -0.0699,-0.1834 -0.0964,-12.18017 -0.0589,-26.6595 l 0.0682,-26.32604 h 11.90625 11.90625 v 26.59063 26.59062 l -11.84737,0.0689 c -9.33673,0.0543 -11.87429,-0.002 -11.97445,-0.26459 z m 23.42494,-26.39491 V 108.81793 H 143.83528 132.3259 v 26.19375 26.19375 h 11.50938 11.50937 z m -22.75417,0 v -25.92917 h 11.2448 11.24479 v 25.92917 25.92916 h -11.24479 -11.2448 z m 22.09271,0 v -25.53229 h -10.84791 -10.84792 l -0.0682,25.2677 c -0.0375,13.89724 -0.011,25.41788 0.059,25.60141 0.10011,0.26259 2.42642,0.31898 10.91615,0.26459 l 10.78893,-0.0691 z'
						id='path49'
					/>
					<path
						style={{
							fill: fill[3],
						}}
						d='m 160.30586,146.19035 c 0.0365,-11.02322 0.0974,-25.10237 0.13521,-31.28701 0.0378,-6.18463 0.0972,2.83435 0.13202,20.04219 0.0348,17.20784 -0.0261,31.28699 -0.13521,31.28701 -0.10914,2e-5 -0.16855,-9.01897 -0.13202,-20.04219 z m -30.29627,-11.24482 -0.0649,-28.50885 13.82448,0.0637 13.82448,0.0637 -13.691,0.071 -13.69099,0.071 -0.0686,28.37418 -0.0685,28.37418 z m 0.52915,-0.13229 0.0674,-27.7151 13.03073,-0.0686 c 8.63719,-0.0455 13.03073,0.0214 13.03073,0.19843 0,0.17605 -4.37396,0.26708 -12.83229,0.26708 h -12.8323 v 27.51667 c 0,18.25218 -0.0895,27.51666 -0.2658,27.51666 -0.17675,0 -0.24323,-9.28532 -0.19844,-27.7151 z m 1.52258,0.19844 v -26.45834 h 11.77396 11.77395 v 26.45834 26.45833 h -11.77395 -11.77396 z m 23.28333,0 V 108.81793 H 143.83528 132.3259 v 26.19375 26.19375 h 11.50938 11.50937 z m -0.40203,0 c 0,-14.18828 0.0321,-19.99258 0.0712,-12.89844 0.0392,7.09414 0.0392,18.70273 0,25.79687 -0.0392,7.09414 -0.0712,1.28985 -0.0712,-12.89843 z'
						id='path48'
					/>
					<path
						style={{
							fill: fill[4],
						}}
						d='m 130.80331,134.94553 -0.0649,-27.7151 13.03073,0.0636 13.03073,0.0636 -12.89721,0.0712 -12.89722,0.0712 -0.0686,27.5803 -0.0686,27.58029 z m 5.95436,-28.44251 c 3.81992,-0.0413 10.0707,-0.0413 13.89063,0 3.81992,0.0413 0.69453,0.0751 -6.94532,0.0751 -7.63984,0 -10.76523,-0.0338 -6.94531,-0.0751 z'
						id='path47'
					/>
				</g>
			</g>
		</svg>
	);
};
export default SVGComponent;
