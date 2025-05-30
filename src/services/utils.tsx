import Toast from 'react-native-toast-message';

const toastMessage = (type: string, html: string) => {
	switch (type) {
		case 'info': {
			Toast.show({ type: 'info', text2: html, visibilityTime: 1500 })
			break;
		}
		case 'success': {
			Toast.show({ type: 'success', text2: html, visibilityTime: 1500 });
			break;
		}
		case 'error': {
			Toast.show({ type: 'error', text2: html, visibilityTime: 1500 });
			break;
		}
	}
}

const formatPhoneNumber = (input: any) => {
	let cleaned = input.replace(/[^+\d]/g, '');

	let formatted = '+972';
	if (cleaned.length < 4) {
		return '+972'
	}

	if (cleaned.length > 4) {
		formatted += '-' + cleaned.substring(4, 6); // Second part
	}
	if (cleaned.length > 6) {
		formatted += '-' + cleaned.substring(6, 9); // Last part
	}
	if (cleaned.length > 9) {
		formatted += '-' + cleaned.substring(9, 13); // Last part
	}

	return formatted
}

const emailEllipse = (email: string) => {
	if (!email) return '';
	const p = email.lastIndexOf('@');
	return email.slice(0, 3) + '***@' + (p > 8 ? email.slice(p + 1) : email.slice(-8));
}

export { toastMessage, formatPhoneNumber, emailEllipse };