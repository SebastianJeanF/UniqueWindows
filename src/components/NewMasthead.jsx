import { Parallax, ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

export default function Masthead({ img, title, subtitle }) {
	const styles = {
		masthead: {
			// background: `url(../assets/${imgName})`,
			backgroundImage: `url(${img})`,
			// textShadow: '2px 2px 2px rgba(0, 0, 0, 0.2);',
			// minHeight: '35vh',
			// backgroundSize: 'cover',
			// backgroundPosition: 'center',
		},
	};

	return (
		<div className='overflow-hidden'>
			{/* <section className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center">
      <Container>
        <div className="d-sm-flex text-center text-sm-start justify-content-between">
      <div className="m-2">
          <h1>My house <span className="text-warning">website</span>!</h1>
          <p className="lead my-4">Sebastian!</p>
          <button className="btn btn-primary btn-lg">Click to begin</button>
          </div>
        <Image className="img-fluid w-50" src={img2}  height={50} width={50} alt="image" /> 
        </div>
      </Container>
     </section> */}

			<div style={styles.masthead} id='animate-area' className='  about-title'>
				<Parallax speed={-25} className='-z-10 h-full flex flex-col  items-center  '>
					<div className='about-title-header'>{title}</div>

					<hr className='mx-auto'></hr>
					{subtitle && <p>{subtitle}</p>}
				</Parallax>
			</div>
			{/* <div style={{ height: '20vh' }} id='animate-area' className='  about-title '>
				<ParallaxBanner className='h-92'>
					<ParallaxBannerLayer speed={-20}>
						<img className='min-h-screen bg-red-400' src={img} />
					</ParallaxBannerLayer>
					<ParallaxBannerLayer className=' border border-b-red-500 z-40 h-full flex flex-col  items-center  '>
						<div className='about-title-header'>{title}</div>

						<hr className='mx-auto'></hr>
						{subtitle && <p>{subtitle}</p>}
					</ParallaxBannerLayer>
				</ParallaxBanner>
			</div> */}
		</div>
	);
}
