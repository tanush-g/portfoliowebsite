import { Global } from "@emotion/react";
import { M_PLUS_Rounded_1c } from 'next/font/google';

// Define the font with proper subset and weights
const mplus = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['300', '700'],
  display: 'swap',
  variable: '--font-mplus',
});

const Fonts = () => (
  <>
    <Global
      styles={`
        :root {
          --font-mplus: ${mplus.variable};
        }
      `}
    />
    <style jsx global>{`
      .font-mplus {
        font-family: ${mplus.variable};
      }
    `}</style>
  </>
);

export default Fonts;