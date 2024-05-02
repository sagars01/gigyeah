import VideoThumb from '../../../public/img/homepage/hero-image.png'
import ModalVideo from './modal-video'

export default function Hero() {
  return (
    <section className="relative">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="max-w-3xl text-center mx-auto">
            <p className="text-xl text-gray-600 mb-4" data-aos="zoom-y-out" data-aos-delay="150">
              Introducing the
            </p>

          </div>
          <div className="text-center pb-10 md:pb-16">
            <h1 className="text-6xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Simplest
              </span> Tech Hiring Platform </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-4" data-aos="zoom-y-out" data-aos-delay="150">
                One dashboard. Post jobs, share links, manage applicants.
                <span className=" text-2xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 md:te font-semibold"> Effortless</span>
              </p>
              <p className="relative text-2xl font-bold flex mb-8 justify-center" data-aos="zoom-y-out" data-aos-delay="150">
                Built by builders, for busy builders
                <img style={{
                  display: 'inline-block',
                  position: 'absolute',
                  top: '0.5rem'
                }} src='/img/homepage/underline_homt.svg' />
              </p>

              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                <div>
                  <a className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0" href="/dashboard">Try Now!</a>
                </div>
                {/* <div>
                  <a className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="#0">Learn more</a>
                </div> */}
              </div>
            </div>
          </div>

          {/* Hero image */}
          <ModalVideo
            thumb={VideoThumb}
            thumbWidth={768}
            thumbHeight={432}
            thumbAlt="Modal video thumbnail"
            video="/videos/homepage/video.mp4"
            videoWidth={1920}
            videoHeight={1080} />

        </div>

      </div>
    </section >
  )
}