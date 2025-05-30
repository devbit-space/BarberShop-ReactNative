interface RouterConfigOptions {
	name: string
}

interface RouterConfigObject {
	signUpPage: RouterConfigOptions
	loginPage: RouterConfigOptions
	sendEmailPage: RouterConfigOptions
	verifyCodePage: RouterConfigOptions
	resetPasswordPage: RouterConfigOptions
	mainScreenPage: RouterConfigOptions

	homePage: RouterConfigOptions
	appointmentPage: RouterConfigOptions
	homeAddPaymentPage: RouterConfigOptions
	homeCheckOutPage: RouterConfigOptions
	
	userMenuPage: RouterConfigOptions
	accountSettingPage: RouterConfigOptions
	appointMentsPage: RouterConfigOptions,
	orderHistoryPage: RouterConfigOptions,
	orderDetailPage: RouterConfigOptions,
	addPaymentPage: RouterConfigOptions,
	checkoutPage: RouterConfigOptions,
	confirmAppointmentPage: RouterConfigOptions,
	myPackagePage: RouterConfigOptions,
}