import React, { useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

import { Login } from './pages/auth/login';
import { SignUp } from './pages/auth/sign-up';
import { SendEmail } from './pages/auth/send-email';
import { ResetPassword } from './pages/auth/reset-password';
import { VerifyCode } from './pages/auth/verify-code';
import { MainScreen } from './pages/mainscreen/mainscreen';

import { Home, Appointment, HomeAddPayment, HomeCheckout } from './pages/home';

import { AccountSetting, UserMenu, OrderDetail, Appointments, AddPayment, Checkout, Packages, OrderHistory, ConfirmAppointment } from './pages/userpages';
import { useGlobalContext } from './provider';
import { routerConfig } from './routerConfig';
import { Loading } from './components/loading';
import { restApi } from './provider/restApi';
import { FirstPage } from './components/first-page';
import { w } from './theme/services';

// Enable screens for better performance
enableScreens();

const Stack = createNativeStackNavigator();

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        width: w(70),
        maxWidth: 300,
        borderLeftColor: 'green',
      }}
      contentContainerStyle={{
        paddingHorizontal: 10,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        width: w(70),
        maxWidth: 300,
        borderLeftColor: 'tomato',
      }}
      contentContainerStyle={{
        paddingHorizontal: 10,
      }}
    />
  )
}

const Routers = () => {
  const [state]: GlobalContextType = useGlobalContext();

  useEffect(() => {
    restApi.setAuthToken(state.authToken);
  }, [state.authToken])

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={routerConfig.appointmentPage.name}>
          {!state.authToken && (
            <React.Fragment>
              <Stack.Screen name="*" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name={routerConfig.loginPage.name} component={Login} options={{ headerShown: false }} />
              <Stack.Screen name={routerConfig.signUpPage.name} component={SignUp} options={{ headerShown: false }} />

              <Stack.Screen name={routerConfig.sendEmailPage.name} component={SendEmail} options={{ headerShown: false }} />
              <Stack.Screen name={routerConfig.verifyCodePage.name} component={VerifyCode} options={{ headerShown: false }} />
              <Stack.Screen name={routerConfig.resetPasswordPage.name} component={ResetPassword} options={{ headerShown: false }} />
            </React.Fragment>
          )}

          {!!state.authToken && (
            <React.Fragment>
              <Stack.Screen name="*" component={MainScreen} options={{ headerShown: false }} />
              <Stack.Screen name={routerConfig.mainScreenPage.name} component={MainScreen} options={{ headerShown: false }} />
              
              <Stack.Screen name={routerConfig.userMenuPage.name} component={UserMenu} options={{ headerShown: false }} />

              <Stack.Screen name={routerConfig.accountSettingPage.name} component={AccountSetting} options={{ headerShown: false }} />
              <Stack.Screen name={routerConfig.appointMentsPage.name} component={Appointments} options={{ headerShown: false }} />
              <Stack.Screen name={routerConfig.orderDetailPage.name} component={OrderDetail} options={{ headerShown: false }} />
              <Stack.Screen name={routerConfig.myPackagePage.name} component={Packages} options={{ headerShown: false }} />
              
              <Stack.Screen name={routerConfig.homePage.name} component={Home} options={{ headerShown: false }} />
              <Stack.Screen name={routerConfig.appointmentPage.name} component={Appointment} options={{ headerShown: false }} />
              <Stack.Screen name={routerConfig.homeAddPaymentPage.name} component={HomeAddPayment} options={{ headerShown: false }} />
              <Stack.Screen name={routerConfig.homeCheckOutPage.name} component={HomeCheckout} options={{ headerShown: false }} />
              
              <Stack.Screen name={routerConfig.orderHistoryPage.name} component={OrderHistory} options={{ headerShown: false }} />
              <Stack.Screen name={routerConfig.addPaymentPage.name} component={AddPayment} options={{ headerShown: false }} />
              <Stack.Screen name={routerConfig.checkoutPage.name} component={Checkout} options={{ headerShown: false }} />
              <Stack.Screen name={routerConfig.confirmAppointmentPage.name} component={ConfirmAppointment} options={{ headerShown: false }} />
            </React.Fragment>
          )}
        </Stack.Navigator>
      </NavigationContainer>

      <Toast config={toastConfig} />
      <Loading isLoading={state.loading} />
      <FirstPage isShow={state.showLoadingPage} />
    </SafeAreaProvider>
  )
}

export { Routers }