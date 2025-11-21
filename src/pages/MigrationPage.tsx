import React from 'react';

const MigrationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse top-1/4 left-1/4"></div>
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse bottom-1/4 right-1/4 animation-delay-2000"></div>
        <div className="absolute w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse top-1/2 right-1/3 animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl w-full">
        <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/40 p-8 md:p-12 animate-fade-in">
          {/* Icon/Logo area */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse-slow flex items-center justify-center">
                <svg 
                  className="w-10 h-10 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                  />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 px-4 animate-fade-in gradient-text">
            Site Migré
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 text-center mb-8 animate-fade-in-delay-1 font-medium">
            Une nouvelle version améliorée est disponible
          </p>

          {/* Description */}
          <div className="bg-gray-900/60 rounded-lg p-6 mb-8 border border-purple-500/30 animate-fade-in-delay-2">
            <p className="text-gray-300 text-center leading-relaxed text-base md:text-lg">
              Nous avons entièrement refait le site pour vous offrir une meilleure expérience.
              Retrouvez tous vos guides, builds et tier-lists sur la nouvelle plateforme.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mb-8 animate-fade-in-delay-3">
            <a
              href="https://slagate.com"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <span className="text-lg">Accéder au nouveau site</span>
              <svg 
                className="w-6 h-6 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
              </svg>
            </a>
          </div>

          {/* Warning message */}
          <div className="flex items-center justify-center gap-2 text-yellow-300 animate-fade-in-delay-4">
            <svg
              className="w-5 h-5 animate-pulse"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm font-semibold">
              Ce site sera bientôt supprimé
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center mt-8 text-gray-500 text-sm animate-fade-in-delay-5">
          <p>Merci de votre fidélité ✨</p>
        </div>
      </div>

      {/* Custom animations styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3);
          }
          50% {
            text-shadow: 0 0 30px rgba(236, 72, 153, 0.6), 0 0 60px rgba(236, 72, 153, 0.4);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-delay-1 {
          animation: fade-in 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s both;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in 0.8s ease-out 0.6s both;
        }

        .animate-fade-in-delay-4 {
          animation: fade-in 0.8s ease-out 0.8s both;
        }

        .animate-fade-in-delay-5 {
          animation: fade-in 0.8s ease-out 1s both;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .gradient-text {
          background: linear-gradient(135deg, #c084fc 0%, #f472b6 50%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          padding: 0.5rem 0;
          line-height: 1.3;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default MigrationPage;

