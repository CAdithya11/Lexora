import React from 'react';

export default function FeatureExplain() {
  return (
    <section class="py-10 bg-white sm:py-16 lg:py-24">
      <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div class="grid items-center md:grid-cols-2 gap-y-10 md:gap-x-20">
          <div class="pr-12 sm:pr-0">
            <div class="relative max-w-xs mb-12">
              <img
                class="object-bottom rounded-md"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/features/4/man-eating-noodles.jpg"
                alt=""
              />

              <img
                class="absolute origin-bottom-right scale-75 rounded-md -bottom-12 -right-12"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/features/4/smiling-businessman.jpg"
                alt=""
              />
            </div>
          </div>

          <div>
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Grow business with Celebration.
            </h2>
            <p class="mt-4 text-base leading-relaxed text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
              enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
