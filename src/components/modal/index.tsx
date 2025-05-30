import styled from "styled-components/native";
import { Modal, ModalBaseProps, Pressable, View } from "react-native";

interface TransparentModalProps extends ModalBaseProps {
	children: any
}

interface BaseModalProps extends ModalBaseProps {
	children: any
	onClose: () => void
}

const TransparentModal = ({ visible, children }: TransparentModalProps) => {
	return (
		<Modal animationType="slide" transparent={true} visible={visible}>
			{children}
		</Modal>
	)
}

const BaseModal = ({ visible, onClose, children }: BaseModalProps) => {
	return (
		<Modal animationType="slide" transparent={true} visible={visible}>
			<BaseModalHidden onPress={onClose} />

			<BaseModalContainer>
				{children}
			</BaseModalContainer>
		</Modal>
	)
}

const BaseModalContainer = styled(View)(({ theme }) => ({
	bottom: 0,
	width: "100%",
	position: "absolute",
	backgroundColor: theme.white,
}))

const BaseModalHidden = styled(Pressable)(({ theme }) => ({
	bottom: 0,
	width: "100%",
	height: "100%",
	position: "absolute",
	backgroundColor: theme.baseModalHideBackground,
}))

export { TransparentModal, BaseModal };