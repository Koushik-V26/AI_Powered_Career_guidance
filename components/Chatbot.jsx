'use client'

import { motion } from 'framer-motion';
import { Brain, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// This is the component for the corner chatbot
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // You can add your chat opening logic here
  const openChat = () => {
    setIsOpen(!isOpen);
    // Redirect to AI Assistant page
    router.push('/mentor');
  };

  return (
    <div
      className="chatbot-container fixed bottom-[-30px] right-[-20px] z-[1000] transition-all duration-600 ease-in-out cursor-pointer hover:bottom-5 hover:right-5 animate-gentleBob group"
      onClick={openChat}
      style={{ transform: 'rotate(-30deg)' }}
    >
      {/* Greeting Message */}
      <div
        className="absolute bottom-[120%] left-[-160px] bg-white text-gray-800 px-5 py-3 rounded-[20px] font-semibold whitespace-nowrap opacity-0 invisible translate-y-4 scale-80 transition-all duration-500 ease-out delay-300 pointer-events-none shadow-lg border-2 border-blue-500 min-w-[180px] text-center group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100"
      >
        Hi! I am your AI Assistant
        <div className="absolute top-full right-5 border-[10px] border-transparent border-t-white"></div>
        <div className="absolute top-[calc(100%+2px)] right-5 border-8 border-transparent border-t-blue-500"></div>
      </div>

      {/* Robot Body */}
      <div className="relative flex flex-col items-center">
        {/* Robot Head */}
        <div
          className="relative w-[50px] h-[50px] bg-gradient-to-br from-white to-gray-200 rounded-[12px] border-[3px] border-slate-900 mb-[5px] shadow-lg transition-all duration-300 group-hover:shadow-2xl"
        >
          <div className="absolute w-2 h-2 bg-slate-900 rounded-full top-[15px] left-[12px] transition-all duration-300 group-hover:bg-blue-500"></div>
          <div className="absolute w-2 h-2 bg-slate-900 rounded-full top-[15px] right-[12px] transition-all duration-300 group-hover:bg-blue-500"></div>
          <div
            className="absolute bottom-[12px] left-1/2 transform -translate-x-1/2 w-[12px] h-[6px] border-2 border-slate-600 border-t-0 rounded-b-[12px] transition-all duration-300 group-hover:border-blue-500 group-hover:w-[16px]"
          ></div>
        </div>

        {/* Robot Chest */}
        <div
          className="relative w-[40px] h-[50px] bg-gradient-to-br from-gray-100 to-gray-300 rounded-[8px] border-[3px] border-slate-900 flex items-center justify-center shadow-md transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-blue-200"
        >
          <div className="w-5 h-4 bg-slate-900 rounded-[4px] relative">
            <div className="absolute w-[14px] h-0.5 bg-slate-600 rounded-sm top-1 left-1/2 -translate-x-1/2"></div>
            <div className="absolute w-[14px] h-0.5 bg-slate-600 rounded-sm top-2.5 left-1/2 -translate-x-1/2"></div>
          </div>
          {/* Robot Arms */}
          <div className="absolute w-2 h-[35px] bg-gradient-to-br from-gray-300 to-gray-400 rounded-sm border-2 border-slate-900 top-[10px] left-[-12px] transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-blue-200 group-hover:to-blue-300"></div>
          <div className="absolute w-2 h-[35px] bg-gradient-to-br from-gray-300 to-gray-400 rounded-sm border-2 border-slate-900 top-[10px] right-[-12px] transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-blue-200 group-hover:to-blue-300"></div>
        </div>
      </div>
      <style jsx>{`
        @keyframes gentleBob {
          0%, 100% {
            transform: rotate(-30deg) translateY(0px);
          }
          50% {
            transform: rotate(-30deg) translateY(-2px);
          }
        }
        .animate-gentleBob {
          animation: gentleBob 4s ease-in-out infinite;
        }
        .chatbot-container:hover {
          animation: none !important;
          transform: rotate(0deg) !important;
        }
      `}</style>
    </div>
  );
}