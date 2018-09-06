node ./node_modules/zatech-react-native/zatech-build/setupbuildenv.js

react-native bundle --entry-file index.js --platform android --dev false --bundle-output build/android/reactnative/react.jsbundle --assets-dest build/android/reactnative
