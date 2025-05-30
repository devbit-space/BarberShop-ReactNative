import React from 'react';
import { Pressable, TouchableOpacity, StyleSheet, ActivityIndicator, Text } from 'react-native';
import styled from 'styled-components/native';

import { isIOS } from '../services';
import { h, w } from '../theme/services';

interface ButtonProps {
    loading?: boolean
    disabled?: boolean
    onPress: () => void
    btnProps?: any
    children: React.ReactNode
}

const NativeButton = !isIOS ? Pressable : TouchableOpacity;
const Button = (props: ButtonProps) => {
    const {
        loading,
        disabled,
        onPress,
        children,
        btnProps
    } = props

    return (
        <StyledButton
            disabled={disabled || loading}
            {...btnProps}
            android_ripple={{
                borderless: false,
                foreground: true,
            }}
            onPress={onPress}
        >
            {children}
        </StyledButton>
    );
};

export default Button;

const StyledButton = styled(NativeButton)(({ theme }) => ({
    color: theme.primary,
    borderRadius: w(100),
    padding: h(1.2),
    backgroundColor: "#CFCAC2",
    borderWidth: 1.1,
    borderColor: "#CFCAC2",
    alignItems: 'center',
}))