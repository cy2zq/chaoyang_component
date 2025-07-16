import './tag.less';
import './tag.module.less';
function Btn(props: any) {
  let cy01 = (
    <a href="#_" className="relative inline-block text-lg group">
      <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
        <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
        <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
        <span className="relative">{props.text}</span>
      </span>
      <span
        className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
        data-rounded="rounded-lg"
      ></span>
    </a>
  );
  let cy02 = (
    <a
      href="https://loadmcx.com"
      target="_blank"
      className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
    >
      <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
      <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
        <svg
          className="w-5 h-5 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </span>
      <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
        <svg
          className="w-5 h-5 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </span>
      <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
        {props.text}
      </span>
    </a>
  );

  let cy03 = (
    <a href="#_" className="relative px-5 py-2 font-medium text-white group">
      <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
      <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
      <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
      <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
      <span className="relative">{props.text}</span>
    </a>
  );
  let cy04 = (
    <div class=" w-full  flex items-center justify-center" {...props}>
      <a
        href="#_"
        className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 "
      >
        <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
        <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">
          {props.text}
        </span>
      </a>
    </div>
  );

  let cy05 = <div className="button button-1">{props.text}</div>;
  let cy06 = <div className="button button-2">{props.text}</div>;
  let cy039 = <div className="button button-3">{props.text}</div>;
  let cy038 = <div className="button button-4">{props.text}</div>;
  let cy041 = <div className="button button-5">{props.text}</div>;

  let cy07 = (
    <a
      href="#_"
      className="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-white text-purple-600 inline-block"
    >
      <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
      <span className="relative group-hover:text-white">{props.text}</span>
    </a>
  );

  let cy08 = (
    <a href="#_" className="inline-flex overflow-hidden text-white bg-gray-900 rounded group">
      <span className="px-3.5 py-2 text-white bg-purple-500 group-hover:bg-purple-600 flex items-center justify-center">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          ></path>
        </svg>
      </span>
      <span className="pl-4 pr-5 py-2.5">{props.text}</span>
    </a>
  );

  let cy09 = (
    <a
      href="#_"
      className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50"
    >
      <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
      <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </span>
      <span className="relative">{props.text}</span>
    </a>
  );
  let cy010 = (
    <a href="#_" className="relative px-6 py-3 font-bold text-black group">
      <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-red-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
      <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
      <span className="relative">{props.text}</span>
    </a>
  );
  let cy011 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
      >
        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
        <span className="relative">{props.text}</span>
      </a>
    </div>
  );
  let cy012 = (
    <a
      href="#_"
      className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500"
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
      <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
      <span className="relative text-white">{props.text}</span>
    </a>
  );

  let cy013 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="relative px-10 py-3 font-medium text-white transition duration-300 bg-green-400 rounded-md hover:bg-green-500 ease"
      >
        <span className="absolute bottom-0 left-0 h-full -ml-2">
          <svg
            viewBox="0 0 487 487"
            className="w-auto h-full opacity-100 object-stretch"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
              fill="#FFF"
              fillRule="nonzero"
              fillOpacity=".1"
            ></path>
          </svg>
        </span>
        <span className="absolute top-0 right-0 w-12 h-full -mr-3">
          <svg
            viewBox="0 0 487 487"
            className="object-cover w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
              fill="#FFF"
              fillRule="nonzero"
              fillOpacity=".1"
            ></path>
          </svg>
        </span>
        <span className="relative">{props.text}</span>
      </a>
    </div>
  );

  let cy014 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-white border border-gray-100 rounded-lg shadow-inner group"
      >
        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
          {props.text}
        </span>
      </a>
    </div>
  );

  let cy015 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
      >
        <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
        <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
        <span className="relative z-20 flex items-center text-sm">
          <svg
            className="relative w-5 h-5 mr-2 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
          {props.text}
        </span>
      </a>
    </div>
  );

  let cy016 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-gray-500 transition-all duration-500 border border-gray-200 rounded-md cursor-pointer group ease bg-gradient-to-b from-white to-gray-50 hover:from-gray-50 hover:to-white active:to-white"
      >
        <span className="w-full h-0.5 absolute bottom-0 group-active:bg-transparent left-0 bg-gray-100"></span>
        <span className="h-full w-0.5 absolute bottom-0 group-active:bg-transparent right-0 bg-gray-100"></span>
        {props.text}
      </a>
    </div>
  );
  let cy017 = (
    <div className=" w-full  flex items-center justify-center">
      <a href="#_" className="relative inline-block px-4 py-2 font-medium group">
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
        <span className="relative text-black group-hover:text-white">{props.text}</span>
      </a>
    </div>
  );

  let cy018 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
      >
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </span>
        <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
          {props.text}
        </span>
        <span className="relative invisible">{props.text}</span>
      </a>
    </div>
  );
  let cy019 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="relative items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
      >
        <span className="absolute top-0 left-0 w-40  -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
        <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
          <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
          <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
        </span>
        <span className="relative text-white">{props.text}</span>
      </a>
    </div>
  );

  let cy020 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
      >
        <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
          <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
        </span>
        <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
        <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
          {props.text}
        </span>
      </a>
    </div>
  );
  let cy021 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="px-5 py-2.5 font-medium bg-blue-100/60 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm"
      >
        {props.text}
      </a>
    </div>
  );

  let cy022 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        data-rounded="rounded-md"
        data-primary="blue-600"
        data-primary-reset="{}"
      >
        {props.text}
      </a>
    </div>
  );

  let cy023 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="inline-flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600"
      >
        {props.text}
      </a>
    </div>
  );

  let cy024 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none"
      >
        {props.text}
      </a>
    </div>
  );
  let cy025 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-800 focus:shadow-outline focus:outline-none"
      >
        {props.text}
      </a>
    </div>
  );
  let cy026 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
        <span className="relative">{props.text}</span>
      </a>
    </div>
  );

  let cy027 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white bg-indigo-600 border border-transparent rounded-full md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
      >
        {props.text}
      </a>
    </div>
  );

  let cy028 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-500 rounded-md hover:bg-green-400 sm:w-auto sm:mb-0"
        data-primary="green-400"
        data-rounded="rounded-2xl"
        data-primary-reset="{}"
      >
        Get Started
        <svg
          className="w-4 h-4 ml-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </div>
  );
  let cy029 = (
    <div className=" w-full  flex items-center justify-center">
      <a href="#_" className="relative px-6 py-3 font-bold text-white rounded-lg group">
        <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-purple-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-pink-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
        <span className="relative">{props.text}</span>
      </a>
    </div>
  );

  let cy030 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-black hover:text-white rounded-md shadow-2xl group"
      >
        <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
        <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
        <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
        <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
        <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
        <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
        <span className="relative">{props.text}</span>
      </a>
    </div>
  );
  let cy031 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
      >
        <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
        <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
          <span className="relative text-white">{props.text}</span>
        </span>
      </a>
    </div>
  );
  let cy032 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="relative inline-flex items-center justify-start px-5 py-3 overflow-hidden font-bold rounded-full group"
      >
        <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-black opacity-[3%]"></span>
        <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-black opacity-100 group-hover:-translate-x-8"></span>
        <span className="relative w-full text-left text-blbg-black transition-colors duration-200 ease-in-out group-hover:text-gray-200">
          {props.text}
        </span>
        <span className="absolute inset-0 border-2 border-blbg-black rounded-full"></span>
      </a>
    </div>
  );
  let cy033 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="relative items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all shadow bg-blue-600 rounded-full hover:bg-white group"
      >
        <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
        <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600">
          {props.text}
        </span>
      </a>
    </div>
  );
  let cy034 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all shadow bg-white rounded hover:bg-white group"
      >
        <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
        <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
          {props.text}
        </span>
      </a>
    </div>
  );

  let cy035 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-transparent shadow rounded-md group"
      >
        <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-purple-600 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
        <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-purple-600 rounded-md opacity-0 group-hover:opacity-100 "></span>
        <span className="relative text-purple-600 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
          {props.text}
        </span>
      </a>
    </div>
  );
  let cy036 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group"
      >
        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
        <span className="relative">{props.text}</span>
      </a>
    </div>
  );
  let cy037 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="inline-flex items-center w-full px-5 py-3 mb-3 mr-1 text-base font-semibold text-white no-underline align-middle bg-blue-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-blue-700 hover:border-blue-700 hover:text-white focus-within:bg-blue-700 focus-within:border-blue-700"
      >
        {props.text}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </a>
    </div>
  );

  let cy040 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="inline-flex items-center justify-center h-16 px-10 py-0 text-xl font-semibold text-center text-gray-900 no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-gray-600 border-solid rounded-full cursor-pointer select-none hover:text-blue-600 hover:border-blue-600 focus:shadow-xs focus:no-underline"
      >
        {props.text}
      </a>
    </div>
  );

  let cy042 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="inline-block px-5 py-2 mx-auto text-white bg-blue-600 rounded-full hover:bg-blue-700 md:mx-0"
      >
        {props.text}
      </a>
    </div>
  );
  let cy043 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="inline-block items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-sky-500 border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-sky-500 hover:border-sky-500 focus:outline-none"
      >
        {props.text}
      </a>
    </div>
  );

  let cy044 = (
    <div className=" w-full  flex items-center justify-center">
      <a
        href="#_"
        className="w-full py-4 text-xl text-center text-white transition-colors duration-300 bg-green-400 rounded-full hover:bg-green-500 ease px-9 md:w-auto"
      >
        {props.text}
      </a>
    </div>
  );

  let cy045 = (
    <div className=" w-full  flex items-center justify-center">
      <button className="btn p-4 relative border-0 uppercase text-amber-300 shadow bg-transparent hover:delay-[.5s] transition-all duration-500 hover:text-white before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-0 before:transition-all before:duration-500 before:bg-amber-300 before:hover:w-full after:absolute after:left-0 after:bottom-0 after:h-0 after:w-full after:transition-all after:duration-500 after:bg-amber-300 after:hover:h-full after:text-white after:-z-10 after:hover:delay-[0.4s]">
        {props.text}
      </button>
    </div>
  );

  let btnList = {
    cy01,
    cy02,
    cy03,
    cy04,
    cy05,
    cy06,
    cy07,
    cy08,
    cy09,

    cy011,
    cy012,
    cy013,
    cy014,
    cy015,
    cy016,
    cy017,
    cy018,
    cy019,
    cy020,
    cy021,
    cy022,
    cy023,
    cy024,
    cy025,
    cy026,
    cy027,
    cy028,
    cy029,
    cy030,
    cy031,
    cy032,
    cy033,
    cy034,
    cy035,
    cy036,
    cy037,
    cy038,
    cy039,
    cy040,
    cy041,
    cy042,
    cy043,
    cy044,
    cy045,
  };
  let type = props.type || 'cy01';
  return (
    <div>
      <div className={'cy'}>{btnList[type]}</div>
    </div>
  );
}

export default Btn;
