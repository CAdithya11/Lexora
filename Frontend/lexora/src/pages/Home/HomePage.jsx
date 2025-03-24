import React from 'react';
import NavBar from '../../component/template/NavBar';
import Features from '../Home/FeaturesSum';
import Footer from './Footer';
import FeatureExplain from '../../component/template/FeatureExplain';

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <div className="home">
        <div class="bg-white">
          <section class="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
            <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div class="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                <div>
                  <p class="text-base font-semibold tracking-wider text-blue-600 uppercase">
                    A social media for learners
                  </p>
                  <h1 class="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                    Connect & learn from the experts
                  </h1>
                  <p class="mt-4 text-base text-black lg:mt-8 sm:text-xl">Grow your career fast with right mentor.</p>

                  <a
                    href="#"
                    title=""
                    class="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400"
                    role="button"
                  >
                    Join for free
                    <svg
                      class="w-6 h-6 ml-8 -mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </a>

                  <p class="mt-5 text-gray-600">
                    Already joined us?{' '}
                    <a href="#" title="" class="text-black transition-all duration-200 hover:underline">
                      Log in
                    </a>
                  </p>
                </div>

                <div>
                  <img
                    class="w-full"
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <Features />
            <FeatureExplain />

            {/* How does it works */}
            <section class="py-10 bg-white sm:py-16 lg:py-24">
              <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="max-w-2xl mx-auto text-center">
                  <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">How does it work?</h2>
                  <p class="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat
                    duis.
                  </p>
                </div>

                <div class="relative mt-12 lg:mt-20">
                  <div class="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                    <img
                      class="w-full"
                      src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
                      alt=""
                    />
                  </div>

                  <div class="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                    <div>
                      <div class="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                        <span class="text-xl font-semibold text-gray-700"> 1 </span>
                      </div>
                      <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                        Create a free account
                      </h3>
                      <p class="mt-4 text-base text-gray-600">
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
                        consequat duis enim velit mollit.
                      </p>
                    </div>

                    <div>
                      <div class="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                        <span class="text-xl font-semibold text-gray-700"> 2 </span>
                      </div>
                      <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Build your website</h3>
                      <p class="mt-4 text-base text-gray-600">
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
                        consequat duis enim velit mollit.
                      </p>
                    </div>

                    <div>
                      <div class="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                        <span class="text-xl font-semibold text-gray-700"> 3 </span>
                      </div>
                      <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Release & Launch</h3>
                      <p class="mt-4 text-base text-gray-600">
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
                        consequat duis enim velit mollit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* How does it works */}

            {/* Lead to registration */}

            <section class="py-10 bg-gray-100 sm:py-16 lg:py-24">
              <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div class="text-center">
                  <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                    Get full access to Celebration
                  </h2>
                  <p class="mt-4 text-2xl font-medium">130+ Hand Crafted Coded Blocks</p>

                  <div class="flex flex-col items-center justify-center px-16 mt-8 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row lg:mt-12 sm:px-0">
                    <a
                      href="#"
                      title=""
                      class="inline-flex items-center justify-center w-full px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md sm:w-auto hover:bg-blue-700 focus:bg-blue-700"
                      role="button"
                    >
                      {' '}
                      Try For Free{' '}
                    </a>

                    <a
                      href="#"
                      title=""
                      class="inline-flex items-center justify-center w-full px-8 py-4 text-base font-semibold text-black transition-all duration-200 bg-transparent border border-black rounded-md sm:w-auto hover:bg-black hover:text-white focus:bg-black focus:text-white"
                      role="button"
                    >
                      <svg
                        class="w-5 h-5 mr-2 -ml-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      Contact Sales
                    </a>
                  </div>

                  <p class="mt-6 text-base text-black">
                    Already have an account?{' '}
                    <a
                      href="#"
                      title=""
                      class="text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
                    >
                      Log in
                    </a>
                  </p>
                </div>
              </div>
            </section>

            <Footer />
          </section>
        </div>
      </div>
    </div>
  );
}
