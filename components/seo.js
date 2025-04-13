import Head from "next/head";

const SEO = ({ 
  title, 
  description, 
  image = "/images/og-image.jpeg", 
  url = "", 
  type = "website" 
}) => {
  const siteTitle = title ? `${title} | Tanush Gautam` : "Tanush Gautam - Software Developer";
  const siteUrl = `https://www.tanush.pro${url}`;
  const siteDescription = description || 
    "Tanush Gautam is a software developer specializing in full stack web development, machine learning, and cloud computing.";
  const siteImage = image.startsWith("http") ? image : `https://www.tanush.pro${image}`;
  
  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:url" content={siteUrl} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
      
      {/* LinkedIn */}
      <meta property="og:site_name" content="Tanush Gautam Portfolio" />
      
      {/* Instagram (uses Open Graph) */}
      
      {/* Canonical Link */}
      <link rel="canonical" href={siteUrl} />
    </Head>
  );
};

export default SEO;