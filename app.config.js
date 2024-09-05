import 'dotenv/config'

export default {
  expo: {
    name: 't.dy',
    slug: 't.dy',
    scheme: 't.dy',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      GITHUB_CLIENT: process.env.GITHUB_CLIENT,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
      SUPABASE_CALLBACK: process.env.SUPABASE_CALLBACK,
    },
  },
}
