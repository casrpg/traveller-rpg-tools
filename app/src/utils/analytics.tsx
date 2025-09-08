import { useEffect } from 'react'

interface CounterscaleProps {
  url?: string
  siteId?: string
}

declare global {
  interface ImportMetaEnv {
    readonly VITE_COUNTERSCALE_URL?: string
    readonly VITE_COUNTERSCALE_SITE_ID?: string
  }
}

export const Counterscale: React.FC<CounterscaleProps> = ({ 
  url = import.meta.env.VITE_COUNTERSCALE_URL, 
  siteId = import.meta.env.VITE_COUNTERSCALE_SITE_ID || 'traveller-rpg-api' 
}) => {
  useEffect(() => {
    // Only load analytics if URL is provided and we're not in development
    if (!url || url.includes('example.com') || import.meta.env.DEV) {
      console.log('Analytics not loaded:', { 
        url, 
        siteId, 
        isDev: import.meta.env.DEV 
      })
      return
    }

    // Check if script is already loaded
    const existingScript = document.getElementById('counterscale-script')
    if (existingScript) {
      return
    }

    // Create and inject the Counterscale script
    const script = document.createElement('script')
    script.id = 'counterscale-script'
    script.src = url
    script.defer = true
    script.setAttribute('data-site-id', siteId)
    
    document.head.appendChild(script)

    // Cleanup function to remove script when component unmounts
    return () => {
      const scriptElement = document.getElementById('counterscale-script')
      if (scriptElement) {
        scriptElement.remove()
      }
    }
  }, [url, siteId])

  return null // This component doesn't render anything
}
