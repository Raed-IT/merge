// Import the http-proxy module to create a proxy server.
import httpProxy from 'http-proxy'
const proxy = httpProxy.createProxyServer()


// Export configuration for Next.js API routes.
export const config = {
    api: {
        externalResolver: true, // Indicates that this API route is handled by an external resolver.
        bodyParser: false, // Disables the default body parser to manually handle request bodies.
    },
}

// The main handler function for the API route.
export default function handler(req, res) {
    // Determine the cookie domain rewrite rules based on the request.
    const cookieDomainRewrite = getCookieDomainRewrite(req)
    // Construct the target URL to which the request will be proxied.
    const target = getTarget(req)

    // Return a promise that resolves when the proxying is complete or rejects on error.
    return new Promise((resolve, reject) => {
        // Use the proxy server to forward the request to the target URL.
        proxy.web(req, res, { target, changeOrigin: true, cookieDomainRewrite, ignorePath: true }, (err) => {
            if (err) {
                // Reject the promise if an error occurs during proxying.
                return reject(err)
            }
            // Resolve the promise once proxying is successful.
            resolve()
        })
    })
}

// Helper function to construct the target URL from the request query parameters.
const getTarget = (req) => {
    // Clone the request query parameters.
    const queryParams = { ...req.query }
    // Remove the 'slug' parameter, which is used to construct the path part of the target URL.
    delete queryParams.slug
    // Construct the target URL using the API_URL environment variable, the slug parameters, and any remaining query parameters.
    return process.env.API_URL + req.query.slug.join('/') + (Object.keys(queryParams).length ? '?' + new URLSearchParams(queryParams) : '')
}

// Helper function to construct the cookie domain rewrite rules based on environment variables.
const getCookieDomainRewrite = (req) => {
    // Initialize an empty object for the cookie domain rewrite rules.
    const cookieDomainRewrite = {}
    // Map the backend domain name to the application domain name for cookie rewriting.
    cookieDomainRewrite[process.env.BACKEND_DOMAIN_NAME] = process.env.APP_DOMAIN_NAME
    // Return the cookie domain rewrite rules.
    return cookieDomainRewrite
}