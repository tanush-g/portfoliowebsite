import { motion } from "framer-motion"
import Head from "next/head"
import { GridItemStyle } from "../grid-item"

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
}

const Layout = ({ children, title }) => {
  const pageTitle = Array.isArray(title) ? title.join(" ") : title;
  const fullTitle = `${pageTitle} - Tanush Gautam`;
  
  return (
    <motion.article
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, type: "easeInOut" }}
      style={{ position: "relative" }}
    >
      <>
        {title && (
          <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={`${pageTitle} - A project by Tanush Gautam, software developer specializing in full stack web development, machine learning, and cloud computing.`} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="article" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={`${pageTitle} - A project by Tanush Gautam, software developer specializing in full stack web development, machine learning, and cloud computing.`} />
            <meta property="og:image" content={`https://www.tanush.pro/images/works/${encodeURIComponent(title?.toLowerCase?.().replace(/\s+/g, '-')?.split('/')?.pop())}.png`} />
            <meta property="og:url" content={`https://www.tanush.pro/works/${title?.toLowerCase?.().replace(/\s+/g, '-')?.split('/')?.pop()}`} />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={`${pageTitle} - A project by Tanush Gautam, software developer specializing in full stack web development, machine learning, and cloud computing.`} />
            <meta name="twitter:image" content={`https://www.tanush.pro/images/works/${title?.toLowerCase?.().replace(/\s+/g, '-')?.split('/')?.pop()}.png`} />
            
            {/* LinkedIn */}
            <meta property="og:site_name" content="Tanush Gautam Portfolio" />
          </Head>
        )}
        {children}
        <GridItemStyle />
      </>
    </motion.article>
  )
}

export default Layout
