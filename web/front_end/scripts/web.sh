#!/bin/sh

adb devices && adb connect 192.168.1.16:43479 && adb reverse tcp:8081 tcp:8081 &

npm i --save -g && npx react-native start && npx react-native run-android