import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { OtpInput } from "react-native-otp-entry";

const LoginScreen = () => {
  const [otp, setOtp] = useState('');
  const [otpKey, setOtpKey] = useState(0); // Add a key to force re-render

  const handleClearOtp = () => {
    setOtp('');
    setOtpKey(prev => prev + 1); // Change key to force re-mount
  };
  // console.log(otp)4
  console.log(otp)

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>LoginScreen</Text>

      <OtpInput
        key={otpKey} // Force re-mount when key changes
        numberOfDigits={6}
        onTextChange={setOtp}
        blurOnFilled={true}
        type="numeric"
       
       onFilled={(text) => console.log(`\OTP is ${text}`)}
      />

      <TouchableOpacity onPress={handleClearOtp} style={styles.button}>
        <Text>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'black',
    width: 60,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,
  },
});
