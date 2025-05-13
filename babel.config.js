module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env.local',
        blacklist: null,
        whitelist: [
          'SUPABASE_URL',
          'SUPABASE_ANON_KEY',
          'HAIR_ANALYSIS_API_ENDPOINT',
          'HAIR_ANALYSIS_API_KEY',
        ],
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
