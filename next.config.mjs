/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'http://localhost:5000/api',
    APP_NAME: 'ebuddy-test',
    // NEXT_PUBLIC_FIREBASE_EMULATOR_HOST: 'localhost',
    // NEXT_PUBLIC_EMULATOR: true,
    // NEXT_PUBLIC_FIRESTORE_EMULATOR_PORT: 8080,
    // NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_PORT: 9099,
    // NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_PORT: 9199,
  },
};

export default nextConfig;
