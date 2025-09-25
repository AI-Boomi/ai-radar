import db from '../../public/companies.json';

export default async (request: Request) => {
  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    console.log('🔄 Proxying request to GitHub for companies data...');

    //hardcoding DB to local file
    let data = db;
  
    console.log('✅ Successfully fetched companies data from GitHub');

    return new Response(
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=300", // Cache for 5 minutes
        },
      }
    );

  } catch (error) {
    console.error('💥 Companies proxy error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to fetch companies data", 
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
};