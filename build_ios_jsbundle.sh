node ./node_modules/reactmixer-react-native/reactmixer-build/setupbuildenv.js

react-native bundle --entry-file src/index-rn.js --platform ios --dev true --bundle-output build/ios/reactnative/react.jsbundle --assets-dest build/ios/reactnative

