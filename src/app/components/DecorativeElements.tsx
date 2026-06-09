import { motion, AnimatePresence } from 'motion/react';
import svgPaths from "../../imports/svg-o549jhci01";
import Lottie from 'lottie-react';
import birdsAnimation from '../../assets/Lottie/birds_small.json';
import { useSky } from '../SkyContext';

export function DecorativeElements() {
  const { state } = useSky();
  const showBirds = state.id === 'golden';

  return (
    <>
      {/* Birds Lottie — Evening only */}
      <AnimatePresence>
        {showBirds && (
          <motion.div
            key="birds"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-[10%] w-full h-[40vh] pointer-events-none z-[2] flex items-center justify-center overflow-hidden"
            style={{ filter: 'brightness(0) opacity(0.4)' }}
          >
            <Lottie 
              animationData={birdsAnimation} 
              loop 
              style={{ width: '100%', height: '100%' }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Large Shooting Star */}
      {/* The "crop" div (66×181px) clips the SVG. The SVG div uses negative inset to extend beyond
          the crop container so its dimensions exactly match the 116×230 viewBox — no distortion. */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(15px)', x: -40, y: -54 }}
        animate={{ 
          opacity: [0, 0.7, 0.7, 0], 
          filter: ['blur(15px)', 'blur(0px)', 'blur(0px)', 'blur(15px)'],
          x: [-40, 0, 200, 240], 
          y: [-54, 0, 270, 325] 
        }}
        transition={{ 
          duration: 20, 
          delay: 0.8, 
          repeat: Infinity, 
          ease: "linear",
          times: [0, 0.2, 0.8, 1] 
        }}
        className="hidden lg:block fixed pointer-events-none"
        style={{ right: "10%", top: "220px" }}
      >
        <div
          className="flex items-center justify-center"
          style={{ width: "183.899px", height: "162.657px" }}
        >
          <div className="flex-none rotate-[171.5deg]">
            {/* crop container */}
            <div style={{ width: "66.014px", height: "181.15px", position: "relative" }}>
              {/* SVG container sized to exactly match the viewBox (116.014 × 230.15) */}
              <div style={{ position: "absolute", inset: "-27.05% 0 0 -75.74%" }}>
                <svg
                  className="block"
                  style={{ width: "100%", height: "100%" }}
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 116.014 230.15"
                >
                  <g id="Group 144">
                    <g filter="url(#filter0_d_1_102)" id="Ellipse 21">
                      <circle cx="56.0386" cy="55.0386" fill="white" r="6.03856" />
                    </g>
                    <path
                      d={svgPaths.p3b6e6ec0}
                      fill="url(#paint0_linear_1_102)"
                      id="Vector 458"
                    />
                  </g>
                  <defs>
                    <filter
                      colorInterpolationFilters="sRGB"
                      filterUnits="userSpaceOnUse"
                      height="112.077"
                      id="filter0_d_1_102"
                      width="112.077"
                      x="0"
                      y="0"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        result="hardAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      />
                      <feMorphology
                        in="SourceAlpha"
                        operator="dilate"
                        radius="20"
                        result="effect1_dropShadow_1_102"
                      />
                      <feOffset dy="1" />
                      <feGaussianBlur stdDeviation="15" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0"
                      />
                      <feBlend
                        in2="BackgroundImageFix"
                        mode="normal"
                        result="effect1_dropShadow_1_102"
                      />
                      <feBlend
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1_102"
                        mode="normal"
                        result="shape"
                      />
                    </filter>
                    <linearGradient
                      gradientUnits="userSpaceOnUse"
                      id="paint0_linear_1_102"
                      x1="86.2379"
                      x2="129.351"
                      y1="139.377"
                      y2="193.549"
                    >
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Small Shooting Star */}
      {/* Same trick: crop container (27.741×76.123px), SVG extends to match 105.075×125.123 viewBox */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(15px)', x: -80, y: -108 }}
        animate={{ 
          opacity: [0, 0.5, 0.5, 0], 
          filter: ['blur(15px)', 'blur(0px)', 'blur(0px)', 'blur(15px)'],
          x: [-80, 0, 240, 320], 
          y: [-108, 0, 325, 432] 
        }}
        transition={{ 
          duration: 25, 
          delay: 4.5, 
          repeat: Infinity, 
          ease: "linear",
          times: [0, 0.15, 0.85, 1] 
        }}
        className="hidden lg:block fixed pointer-events-none"
        style={{ right: "22%", top: "350px" }}
      >
        <div
          className="flex items-center justify-center"
          style={{ width: "77.278px", height: "68.352px" }}
        >
          <div className="flex-none rotate-[171.5deg]">
            {/* crop container */}
            <div style={{ width: "27.741px", height: "76.123px", position: "relative" }}>
              {/* SVG container sized to exactly match the viewBox (105.075 × 125.123) */}
              <div style={{ position: "absolute", inset: "-64.37% -98.53% 0 -180.24%" }}>
                <svg
                  className="block"
                  style={{ width: "100%", height: "100%" }}
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 105.075 125.123"
                >
                  <g id="Group 145">
                    <g filter="url(#filter0_d_1_98)" id="Ellipse 21">
                      <circle cx="52.5375" cy="51.5375" fill="white" r="2.53752" />
                    </g>
                    <path
                      d={svgPaths.p3924ad00}
                      fill="url(#paint0_linear_1_98)"
                      id="Vector 458"
                    />
                  </g>
                  <defs>
                    <filter
                      colorInterpolationFilters="sRGB"
                      filterUnits="userSpaceOnUse"
                      height="105.075"
                      id="filter0_d_1_98"
                      width="105.075"
                      x="0"
                      y="0"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        result="hardAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      />
                      <feMorphology
                        in="SourceAlpha"
                        operator="dilate"
                        radius="20"
                        result="effect1_dropShadow_1_98"
                      />
                      <feOffset dy="1" />
                      <feGaussianBlur stdDeviation="15" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0"
                      />
                      <feBlend
                        in2="BackgroundImageFix"
                        mode="normal"
                        result="effect1_dropShadow_1_98"
                      />
                      <feBlend
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1_98"
                        mode="normal"
                        result="shape"
                      />
                    </filter>
                    <linearGradient
                      gradientUnits="userSpaceOnUse"
                      id="paint0_linear_1_98"
                      x1="65.2281"
                      x2="83.345"
                      y1="86.9782"
                      y2="109.743"
                    >
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
