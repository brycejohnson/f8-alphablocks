import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.volcanofrog.app',
  appName: 'Volcano Frog',
  webDir: 'build',
  server: {
    // App runs at root in native shell, not under /alphablocks/
    url: undefined,
  },
};

export default config;
