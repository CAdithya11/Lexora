import React from 'react';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function SignUpPage() {
  return (
    <>
      <section class="bg-white">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <div class="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
            <div class="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
              <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>
              <p class="mt-2 text-base text-gray-600">
                Already have an account?{' '}
                <Link to={'/signin'}>
                  <a
                    href="#"
                    title=""
                    class="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700"
                  >
                    Login
                  </a>
                </Link>
              </p>

              <form action="#" method="POST" class="mt-8">
                <div class="space-y-5">
                  <div>
                    <label for="" class="text-base font-medium text-gray-900">
                      {' '}
                      Username{' '}
                    </label>
                    <div class="mt-2.5">
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter your username"
                        class="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label for="" class="text-base font-medium text-gray-900">
                      {' '}
                      Email address{' '}
                    </label>
                    <div class="mt-2.5">
                      <input
                        type="email"
                        name=""
                        id=""
                        placeholder="Enter email to get started"
                        class="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label for="" class="text-base font-medium text-gray-900">
                      {' '}
                      Password{' '}
                    </label>
                    <div class="mt-2.5">
                      <input
                        type="password"
                        name=""
                        id=""
                        placeholder="Enter your password"
                        class="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                    >
                      Create free account
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
            <div>
              <img
                class="w-full mx-auto"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/1/cards.png"
                alt=""
              />

              <div class="w-full max-w-md mx-auto xl:max-w-xl">
                <h3 class="text-2xl font-bold text-center text-black">Design your own card</h3>
                <p class="leading-relaxed text-center text-gray-500 mt-2.5">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat
                  duis.
                </p>

                <div class="flex items-center justify-center mt-10 space-x-3">
                  <div class="bg-orange-500 rounded-full w-20 h-1.5"></div>

                  <div class="bg-gray-200 rounded-full w-12 h-1.5"></div>

                  <div class="bg-gray-200 rounded-full w-12 h-1.5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
