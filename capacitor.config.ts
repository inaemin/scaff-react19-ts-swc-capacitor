import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.example.app',
    appName: 'scaff-react19-ts-swc-capacitor',
    webDir: 'dist',
    server: {
        androidScheme: 'http',
        cleartext: true,
    },
};

export default config;
