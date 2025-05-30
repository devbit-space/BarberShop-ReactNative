import React from 'react';
import styled from 'styled-components/native';
import { Pressable, TouchableOpacity } from 'react-native';

import { isIOS } from '../services';
import { h, w } from '../theme/services';
import { useGlobalContext } from '../provider';

const NativeButton = !isIOS ? Pressable : TouchableOpacity;

const FormPressable = ({ children, hitSlop, onPress }: { children: React.ReactNode, hitSlop?: number, onPress: () => void }) => {
    const [state] = useGlobalContext();
    return (
        <StyledCheckBox
            lang={state.lang}
            android_ripple={{
                borderless: false,
                foreground: true,
            }}
            hitSlop={hitSlop}
            onPress={onPress}
        >
            {children}
        </StyledCheckBox>
    );
};

const StyledCheckBox = styled(NativeButton)<{lang: string}>(({ theme, lang }) => ({
    display: 'flex',
    flexDirection: lang === "en" ? 'row' : 'row-reverse',
    alignItems: 'center',
    gap: w(2.2),
    paddingTop: h(.7)
}))

export default FormPressable;
