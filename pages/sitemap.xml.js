const EXTERNAL_DATA_URL = 'https://www.tanush.pro';

function generateSiteMap(projects) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
       <changefreq>monthly</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/works</loc>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
     ${projects
       .map(({ id }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/works/${id}`}</loc>
           <changefreq>monthly</changefreq>
           <priority>0.7</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  // Get all project IDs
  const projects = [
    { id: 'brain' },
    { id: 'imageblend' },
    { id: 'neuroface' },
    { id: 'obe' },
  ];
  
  const sitemap = generateSiteMap(projects);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

// Default export to prevent Next.js errors
export default function Sitemap() {
  return null;
}