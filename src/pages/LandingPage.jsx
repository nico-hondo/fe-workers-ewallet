import { FaApple } from "react-icons/fa";

function LandingPage() {
  return (
    <main className="overflow-x-hidden w-full">
      <header className="bg-brand-primary px-5 lg:px-60 pt-20 overflow-hidden">
        <h1 className="hidden md:block text-white text-4xl lg:text-[60px] font-medium md:text-center mb-10">
          Experience the Future of Digital <br className="lg:block hidden" />
          Payments with Worker Wallet
        </h1>
        <h1 className="block md:hidden text-white text-4xl font-medium text-center mb-10">
          Transfer More <br /> Pay Less
        </h1>
        <div className="flex flex-col lg:flex-row-reverse lg:items-end items-center lg:gap-60">
          <section className="flex-1 flex flex-col gap-6 text-center lg:text-left lg:self-center pb-10 lg:pb-0">
            <p className="text-white text-lg">
              Simplify Your Life with Secure and Convenient Mobile Payments
            </p>
            <div className="flex gap-4 sm:gap-5 justify-center lg:justify-start">
              <button className="flex items-center justify-center gap-3 bg-white w-full max-w-45 py-3.5 rounded-xl cursor-pointer shadow-sm">
                <img src="/gplay.svg" alt="Play Store" className="w-5 h-5" />
                <p className="text-brand-primary font-semibold text-sm">Play Store</p>
              </button>
              <button className="flex items-center justify-center gap-3 border border-white w-full max-w-45 py-3.5 rounded-xl cursor-pointer">
                <img src="/appstore.svg" alt="App Store" className="w-5 h-5" />
                <p className="font-semibold text-white text-sm">App Store</p>
              </button>
            </div>
            <div>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <p className="text-white text-3xl lg:text-[50px] font-bold">4.6M</p>
                <img src="/user.svg" alt="Users" />
              </div>
              <p className="text-white mt-2 text-sm sm:text-base">
                Around the world, we already have over 4.6M happy users
              </p>
            </div>
          </section>

          <section className="flex-1 relative w-full max-w-xs sm:max-w-sm md:max-w-lg mx-auto lg:mx-0 self-center lg:self-end">
            <img
              src="/Mobile - Dashboard V2.png"
              alt="Dashboard V2"
              className="block w-4/5 sm:w-3/4 mx-auto lg:mx-0"
            />
            <img
              src="/Mobile - Dashboard V1.png"
              alt="Dashboard V1"
              className="block absolute bottom-0 right-0 sm:-right-4 w-3/5 sm:w-2/3"
            />
          </section>
        </div>
      </header>
      <article className="my-15 px-5 lg:px-30 flex flex-col lg:flex-row gap-10">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <img
            src="/Headphone.svg"
            alt="24/7 Support"
            className="w-13 h-13 bg-brand-primary p-3 rounded-full"
          />
          <div className="text-center lg:text-left">
            <h2 className="font-bold text-lg text-brand-primary">
              24/7 Support
            </h2>
            <p className="text-brand-charcoal text-sm">
              We have 24/7 contact support so you can contact us whenever you want.
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <img
            src="/Shield Done.svg"
            alt="Data Privacy"
            className="w-13 h-13 bg-brand-primary p-3 rounded-full"
          />
          <div className="text-center lg:text-left">
            <h2 className="font-bold text-lg text-brand-primary">
              Data Privacy
            </h2>
            <p className="text-brand-charcoal text-sm">
              We make sure your data is safe and encrypted in our database.
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <img
            src="/Downlaod.svg"
            alt="Easy Download"
            className="w-13 h-13 bg-brand-primary p-3 rounded-full"
          />
          <div className="text-center lg:text-left">
            <h2 className="font-bold text-lg text-brand-primary">
              Easy Download
            </h2>
            <p className="text-brand-charcoal text-sm">
              Worker Wallet is 100% free to use on Play Store and App Store.
            </p>
          </div>
        </div>
      </article>
      <section className="mt-50 lg:flex lg:flex-row-reverse lg:px-30 lg:my-30">
        <div className="flex justify-center items-center relative lg:w-1/2">
          <div className="relative overflow-hidden rounded-lg bg-brand-secondary aspect-2/1 w-[calc(100%-2.5rem)] lg:w-155">
            <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-64 h-64 lg:w-80 lg:h-80 rounded-full border-28 lg:border-40 border-brand-background" />
            <div className="absolute -right-12 -bottom-16 w-48 h-48 lg:w-64 lg:h-64 rounded-full border-28 lg:border-40 border-brand-background" />
          </div>
          <img
            src="/Mobile - Dashboard V2.png"
            alt=""
            className="w-50 lg:w-65 absolute -bottom-4.5 lg:-bottom-7"
          />
        </div>
        <div className="text-center px-5 mt-10 flex flex-col gap-5 lg:w-1/2">
          <h2 className="text-brand-background text-xl font-bold lg:text-left">
            WELCOME TO WORKER WALLET
          </h2>
          <h2 className="font-medium text-3xl lg:text-left text-brand-primary font-montserrat">
            Your All-in-One Digital Payment Solution
          </h2>
          <p className="text-brand-charcoal text-sm lg:text-left leading-relaxed">
            Say goodbye to cash and hello to the future of payments! With Worker Wallet, you have the power of secure, fast, and convenient digital transactions right at your fingertips. Whether you're shopping, dining out, or sending money to loved ones, we've got you covered.
          </p>
          <button className="bg-brand-primary hover:bg-brand-secondary text-white rounded-lg min-h-12 cursor-pointer lg:w-40 mb-3 font-medium">
            Get Started
          </button>
        </div>
      </section>
      <section>
        <div className="bg-brand-primary w-full px-5 py-10 lg:px-30 lg:py-16 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
          <div className="flex justify-center lg:w-1/2">
            <img
              src="/notebook.svg"
              alt="notebook"
              className="w-full max-w-md lg:max-w-full"
            />
          </div>

          <div className="flex flex-col gap-3 lg:w-1/2">
            <h2 className="font-normal text-3xl lg:text-4xl text-white font-montserrat">
              Why Choose Worker Wallet?
            </h2>
            <p className="text-gray-300 text-sm lg:text-base font-montserrat">
              We have some great features from the application and it’s totally free to use by all users around the world.
            </p>
            <div className="flex flex-col gap-3 pt-6">
              <div className="flex gap-3 text-brand-green font-bold text-sm sm:text-base">
                <img src="/checkgreen.svg" alt="" />
                <p>Small Fee</p>
              </div>
              <div className="flex gap-3 text-brand-green font-bold text-sm sm:text-base">
                <img src="/checkgreen.svg" alt="" />
                <p>Data Secured</p>
              </div>
              <div className="flex gap-3 text-brand-green font-bold text-sm sm:text-base">
                <img src="/checkgreen.svg" alt="" />
                <p>User Friendly</p>
              </div>
              <button className="w-full bg-blue-700 hover:bg-blue-900 text-white min-h-12 rounded-lg mt-2 lg:w-40 cursor-pointer font-medium">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="px-5 lg:px-30 mt-20 flex flex-col gap-8 lg:flex-row">
        <div className="flex flex-col gap-4 lg:w-1/2">
          <h2 className="font-medium text-3xl text-center lg:text-left lg:font-normal lg:text-[50px] text-brand-primary">
            100+ Trusted Partners
          </h2>
          <p className="text-center text-brand-charcoal lg:text-left text-sm sm:text-base">
            We have reached global level and have 100+ <br className="hidden md:block" /> brand partners around the globe.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-6 mb-15 lg:w-1/2">
          <img src="/microsoft.svg" alt="Microsoft" className="h-15 object-contain" />
          <img src="/dropbox.svg" alt="Dropbox" className="h-15 object-contain" />
          <img src="/h&m.svg" alt="H&M" className="h-15 object-contain" />
          <img src="/airbnb.svg" alt="Airbnb" className="h-15 object-contain" />
          <img src="/canon.svg" alt="Canon" className="h-15 object-contain" />
          <img src="/dell.svg" alt="Dell" className="h-15 object-contain" />
        </div>
      </section>
      <section className="mb-15 relative">
        <article className="px-5 flex flex-col gap-3 lg:mt-20">
          <h2 className="font-medium text-3xl text-center lg:font-normal lg:text-[50px] text-brand-primary">
            What Our Users Are Saying
          </h2>
          <p className="text-center text-brand-charcoal text-sm sm:text-base">
            Ready to experience the future of payments? Download E-Wallet now.
          </p>
        </article>
        <article className="mt-10 px-5 lg:px-30 lg:flex lg:justify-center relative">
          <button className="hidden lg:block cursor-pointer">
            <img
              src="/arrow-up (2).svg"
              alt="Prev"
              className="absolute left-35 w-12 h-12 bg-brand-gray rounded-full p-3"
            />
          </button>
          <div className="bg-brand-primary lg:w-fit rounded-3xl px-6 py-8 sm:p-10 flex flex-col gap-3 shadow-lg">
            <img
              src="/profilejames.svg"
              alt="James Bond"
              className="mx-auto block w-16 h-16 rounded-full"
            />
            <p className="text-white text-center font-medium text-lg">
              James Bond
            </p>
            <div className="flex gap-2 justify-center items-center">
              <img src="/bintang.svg" alt="star" />
              <img src="/bintang.svg" alt="star" />
              <img src="/bintang.svg" alt="star" />
              <img src="/bintang.svg" alt="star" />
              <img src="/bintang.svg" alt="star" />
              <p className="text-white text-base ml-1">5.0</p>
            </div>
            <img src="/petik.svg" alt="quote" className="mx-auto block w-6" />
            <p className="text-white text-center text-sm sm:text-base lg:px-10 leading-relaxed">
              I've been using Worker Wallet for over two years now, and I'm very satisfied...
            </p>
          </div>
          <button className="hidden lg:block cursor-pointer">
            <img
              src="/arrow-right.svg"
              alt="Next"
              className="absolute right-35 bg-brand-primary w-12 h-12 rounded-full p-3"
            />
          </button>
        </article>

        <div className="flex items-center justify-center gap-3 mt-8 lg:hidden">
          <button className="w-4 h-2 rounded-full bg-brand-primary transition-all"></button>
          <button className="w-2 h-2 rounded-full bg-gray-300 transition-all"></button>
          <button className="w-2 h-2 rounded-full bg-gray-300 transition-all"></button>
          <button className="w-2 h-2 rounded-full bg-gray-300 transition-all"></button>
        </div>
      </section>
      <section className="bg-brand-background px-5 pt-10 pb-12 lg:pb-0 overflow-hidden">
        <div className="flex flex-col gap-8 md:gap-6 lg:gap-20 lg:flex-row-reverse lg:justify-between lg:items-center max-w-6xl mx-auto">
          {/* Text & Button Wrapper */}
          <div className="lg:flex lg:flex-col text-center md:text-left flex flex-col gap-5 lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-montserrat">Download The App</h2>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-montserrat">
              Ready to experience the future of payments? <br className="hidden sm:block" /> Download Worker Wallet now
              and enjoy a world of convenience at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <button className="flex items-center justify-center gap-3 bg-brand-primary px-6 py-3.5 rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
                <img src="/gplay.svg" alt="Play Store" className="w-5 h-5" />
                <p className="text-white font-medium text-sm">Play store</p>
              </button>
              <button className="flex items-center justify-center gap-3 border border-white px-6 py-3.5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                <FaApple className="text-white text-xl" />
                <p className="text-white font-medium text-sm">App Store</p>
              </button>
            </div>
          </div>
          <div className="flex-1 relative w-full max-w-xs sm:max-w-sm md:max-w-lg mx-auto lg:mx-0 self-center lg:self-end">
            <img
              src="/Mobile - Dashboard V2.png"
              alt="Dashboard V2"
              className="w-3/4 sm:w-2/3 mx-auto lg:mx-0 block"
            />
            <img
              src="/Mobile - Dashboard V1.png"
              alt="Dashboard V1"
              className="absolute bottom-0 right-0 w-3/5 sm:w-1/2 block"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;