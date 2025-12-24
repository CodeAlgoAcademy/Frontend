
export const WinterBanner = () => {
  return (
     <div className="relative z-40 bg-mainRed px-4 py-3 flex justify-center text-center text-white">
      <p className="text-sm font-semibold md:text-2xl">
        Winter Sale 20% OFF Premium subscriptions! For a limited time only.
     <span className="bg-mainGreen text-white rounded-full px-3 mx-2 py-1 text-sm font-bold">
          SALE
        </span>
        <a
          href="/login"
          className="text-white text-sm md:text-2xl underline font-bold"
        >
          Get Started now
        </a>
         </p>
    </div>
  );
};


export const PromoBanner = () => {
  return (
    <div className="w-full bg-mainRed text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-4 py-3">
          
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center h-8 w-8 bg-white rounded-full">
              <span className="text-red-600 font-bold text-sm">🔥</span>
            </span>
            <span className="text-white font-bold text-lg">
              DISCOUNT APPLIED! Winter Sale! Now 20% OFF all Yearly Subscriptions
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white text-sm opacity-90">
              Limited time
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
