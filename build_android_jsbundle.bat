node ./node_modules/reactmixer-react-native/reactmixer-build/setupbuildenv.js

react-native bundle --entry-file index.js --platform android --dev false --bundle-output build/android/reactnative/react.jsbundle --assets-dest build/android/reactnative
