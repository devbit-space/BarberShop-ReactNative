import React from "react";
import styled from "styled-components/native";
import { View, Image, StyleSheet, Text, Platform, PermissionsAndroid, Pressable } from "react-native";
import { useI18n } from "react-simple-i18n";
import moment from "moment";

import { routerConfig } from "../../routerConfig";

import { h, w } from "../../theme/services";
import { useGlobalContext } from "../../provider";
import { restApi, } from "../../provider/restApi";
import { IMAGE, userAvatarImg } from "../../assets/image";
import { UserHeader } from "./common/header";
import Input from "../../components/input";
import DatePicker from '../../components/date-picker';
import { LogoutButton } from "./common/logoutButton";
import { LogoutModal } from "./common/logoutModal";
import { apiNotification } from "../../services";
import { TextH6 } from "../../components/typography";
import ChooseImageModal from "../../components/modal/choose-image-modal";
import { CameraOptions, ImageLibraryOptions, MediaType, launchCamera, launchImageLibrary } from "react-native-image-picker";
import StyledNumber from "../../components/input/number";
import { formatPhoneNumber, toastMessage } from "../../services/utils";
import { Loading } from "../../components/loading";
interface AccountSettingProps {
	phoneNumber: string
	firstName: string
	lastName: string
	birthday: string
	email: string
	image: string
}

const AccountSetting = ({ navigation }: { navigation: any }) => {
	const { t } = useI18n();
	const [state, { dispatch }]: GlobalContextType = useGlobalContext()

	const [status, setStatus] = React.useState({
		phoneNumber: "+972",
		firstName: "",
		lastName: "",
		birthday: "",
		email: "",
		image: ""
	} as AccountSettingProps)

	const [isLoading, setIsLoading] = React.useState(false);

	const [showLogoutModal, setShowLogoutModal] = React.useState(false);
	const [showChooseModal, setShowChooseModal] = React.useState(false)

	React.useEffect(() => {
		console.log("state.userData", state.userData)
		if (state.userData.email !== "" && state.userData.firstName != '') {
			setStatus(state.userData)
		} else {
			(async () => {
				const res = await restApi.postRequest("getProfile");
				if (res.data) {
					setStatus(res.data)
				}
			})()
		}
	}, [])

	const goToUserMenu = () => {
		navigation.navigate(routerConfig.userMenuPage.name);
	}

	const onChangeText = (key: string, value: string | boolean) => {
		setStatus(prev => ({ ...prev, [key]: value }));
	}

	const onChangeDate = (date: Date, key: string) => {
		console.log(date)
		setStatus({ ...status, [key]: moment(date).format('DD.MM.YYYY') })
	}

	const onChangePhoneNumber = (input: any) => {
		const phoneNumber = formatPhoneNumber(input);

		if (phoneNumber) {
			setStatus({ ...status, phoneNumber: phoneNumber })
		}
	}

	const openLogoutModal = () => setShowLogoutModal(true);

	const closeLogoutModal = () => setShowLogoutModal(false);

	const onSend = async () => {
		try {
			const formData = new FormData();
			const fields: (keyof AccountSettingProps)[] = ['firstName', 'lastName', 'email', 'birthday', 'phoneNumber'];
			fields.forEach(field => {
				formData.append(field, status[field]);
			});
			if (!!status.image && status.image.includes('data:image/png;base64,')) {

				formData.append('image', {
					uri: status.image,
					name: "image.png",
					type: "image/png"
				});
			} else {
				formData.append('image', status.image)
			}

			setIsLoading(true);
			const res = await restApi.postRequest("updateProfile", formData)
			if (res.data) {
				dispatch({
					type: "userData",
					payload: res.data
				})
			}
			setIsLoading(false);
			toastMessage('success', 'Profile updated successfully');

		} catch (error: any) {
			apiNotification(error)
		}
	}

	const requestCameraPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.CAMERA,
				{
					title: 'Camera Permission',
					message: 'This app needs camera permission to take photos.',
					buttonNeutral: 'Ask Me Later',
					buttonNegative: 'Cancel',
					buttonPositive: 'OK',
				}
			)

			return granted === PermissionsAndroid.RESULTS.GRANTED;
		} catch (err) {
			console.warn(err);
			return false;
		}
	}

	const onGallery = async () => {
		const options: ImageLibraryOptions = {
			mediaType: 'photo' as MediaType,
			selectionLimit: 1,
			includeBase64: true
		}

		launchImageLibrary(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.errorCode) {
				console.log('ImagePicker Error: ', response.errorCode);
			} else if (response.errorMessage) {
				console.log('ImagePicker Error: ', response.errorMessage);
			} else if (response.assets && response.assets.length > 0) {
				const asset = response.assets[0];
				const base64String = asset.base64 ?? '';
				// setImage(`data:image/png;base64,${base64String}`);
				setStatus({ ...status, image: `data:image/png;base64,${base64String}` })
			} else {
				console.log('No assets found');
			}
			setShowChooseModal(false)
		})
	}

	const onCamera = async () => {
		if (Platform.OS === 'android') {
			const hasPermission = await requestCameraPermission();
			if (!hasPermission) {
				console.log('Camera permission denied');
				return;
			}
		}

		const options: CameraOptions = {
			mediaType: 'photo' as MediaType,
			includeBase64: true, // Add this to include base64 string in the response
		}

		launchCamera(options, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled camera picker');
			} else if (response.errorCode) {
				console.log('CameraPicker Error: ', response.errorCode);
			} else if (response.errorMessage) {
				console.log('CameraPicker Error: ', response.errorMessage);
			} else if (response.assets && response.assets.length > 0) {
				const asset = response.assets[0];
				const sourceUri = asset.uri ?? '';
				const base64String = asset.base64 ?? '';

				setStatus({ ...status, image: `data:image/png;base64,${base64String}` })
			} else {
				console.log('No assets found');
			}

			setShowChooseModal(false)
		})
	}

	const onSetLang  = (lang: string) => {
		dispatch({
			type: "lang",
			payload: lang
		})
	}

	return (
		<View>
			<Loading isLoading={isLoading} />
			<AccountSettingWrapper>
				<UserHeader title={t('account.myAccount')} btn={t('account.done')} onPress={goToUserMenu} onSave={onSend} />

				<AvatarWrapper style={styles.avatar}>
					<Image style={styles.avatarImg} source={!status.image ? userAvatarImg : { uri: status.image }} />
					<Text onPress={() => setShowChooseModal(true)} style={styles.avatarTxt}>{t('account.edit')}</Text>
				</AvatarWrapper>

				<StyledSwitch lang={state.lang}>
					<Pressable onPress={() => onSetLang('en')}><TextH6 style={{ fontWeight: '700', color: state.lang === "en" ? "black" : "#8F90A6" }}>{t('account.en')}</TextH6></Pressable>
					<TextH6 style={{ fontWeight: '900' }}>/</TextH6>
					<Pressable onPress={() => onSetLang('he')}><TextH6 style={{ fontWeight: '700', color: state.lang === "en" ? "#8F90A6" : "black" }}>{t('account.he')}</TextH6></Pressable>
				</StyledSwitch>

				<View style={styles.form}>
					<StyledNumber
						title={t('signUp.phoneNumber')}
						// placeholder={t('signUp.phoneNumberPlaceholder')}
						value={status.phoneNumber}
						onChangeText={(e: any) => onChangePhoneNumber(e)}
					/>
					<Input
						title={t('signUp.fName')}
						placeholder={t('signUp.fNamePlaceholder')}
						value={status.firstName}
						onChangeText={(e: any) => onChangeText('firstName', e)}
					/>
					<Input
						title={t('signUp.lName')}
						placeholder={t('signUp.lNamePlaceholder')}
						value={status.lastName}
						onChangeText={(e: any) => onChangeText('lastName', e)}
					/>
					<DatePicker
						// icon={IMAGE.calender}
						title={t('signUp.dateOfBirth')}
						placeholder={t('signUp.dateOfBirthPlaceholder')}
						k="birthday"
						value={status.birthday}
						onChangeDate={onChangeDate}
					/>
					<Input
						title={t('login.email')}
						placeholder={t('login.emailPlaceholder')}
						value={status.email}
						onChangeText={(e: any) => onChangeText('email', e)}
						disable
					/>

					<LogoutButton onPress={openLogoutModal} />
				</View>

				<LogoutModal navigation={navigation}
					isVisible={showLogoutModal}
					onClose={closeLogoutModal}
				/>

				<ChooseImageModal isModal={showChooseModal} setIsModal={setShowChooseModal} onCamera={onCamera} onGallery={onGallery} />
			</AccountSettingWrapper>
		</View>
	)
}

const AccountSettingWrapper = styled(View)(({ theme }) => ({
	gap: 8,
	display: "flex",
	paddingLeft: w(4),
	paddingRight: w(4),
	flexDirection: "column",
	backgroundColor: "#EEECEA",
	height: "100%",
}));

const AvatarWrapper = styled(View)(({ theme }) => ({
	borderColor: theme.borderColor
}))
const StyledSwitch = styled(View)<{ lang: string }>(({ theme, lang }) => ({
	paddingTop: h(2.5),
	paddingBottom: h(1.5),
	display: 'flex',
	flexDirection: 'row',
	justifyContent: lang === 'en' ? 'flex-start' : 'flex-end',
	gap: w(1),
}))

const styles = StyleSheet.create({
	avatar: {
		paddingTop: h(1.5),
		// paddingBottom: h(1),
		// borderBottomWidth: 1,
		display: 'flex',
		alignItems: 'center'
	},
	avatarImg: {
		width: w(20),
		height: w(20),
		borderRadius: 100
	},
	avatarTxt: {
		paddingTop: h(1),
		fontSize: w(3.5),
		fontWeight: '700'
	},
	form: {
		display: "flex",
		gap: h(1.2),
		marginBottom: h(2)
	}
});

export { AccountSetting };