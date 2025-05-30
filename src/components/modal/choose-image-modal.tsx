import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image } from 'react-native';
import { useI18n } from 'react-simple-i18n';

import { h, w } from '../../theme/services';
import { IMAGE } from '../../assets/image';
import { TextH2, TextH3 } from '../typography';
import { useTheme } from 'styled-components/native';
import { useGlobalContext } from '../../provider';

const ChooseImageModal = ({ isModal, setIsModal, onCamera, onGallery }: { isModal: boolean, setIsModal: Function, onCamera: () => void, onGallery: () => void }) => {

  const theme = useTheme();
  const [state] = useGlobalContext();
  const {t} = useI18n()
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setIsModal(!isModal);
      }}>
      <View style={styles.centeredView}>

        <View style={styles.modalView}>
          <TextH2 style={{ textAlign: 'center', paddingBottom: h(1) }}>{t('account.chooseImage')}</TextH2>
          <Pressable
            style={{ position: 'absolute', right: w(-1.5), top: w(-1.5), backgroundColor: theme.borderColor, padding: w(2), borderRadius: w(100), }}
            onPress={() => setIsModal(!isModal)}>
            <Image style={{ width: w(2), height: w(2) }} source={IMAGE.cancel} />
          </Pressable>
          <View
            style={{
              display: 'flex',
              flexDirection: state.lang === "en" ? "row" : "row-reverse",
              alignItems: 'center',
              gap: w(3)
            }}
          >
            <Pressable
              style={[styles.button, { borderColor: theme.borderColor }]}
              onPress={onCamera}>
              <Image style={styles.iconStyle} source={IMAGE.camera} />
              <TextH3>{t('account.fromCamera')}</TextH3>
            </Pressable>
            <Pressable
              style={[styles.button, { borderColor: theme.borderColor }]}
              onPress={onGallery}>
              <Image style={styles.iconStyle} source={IMAGE.gallery} />
              <TextH3>{t('account.fromGallery')}</TextH3>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: h(1.5),
  },
  modalView: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: w(1),
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingTop: h(3),
    paddingBottom: h(2),
    paddingHorizontal: w(5),
  },
  button: {
    paddingHorizontal: w(4),
    paddingVertical: w(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconStyle: {
    height: w(15),
    width: w(15)
  },
});

export default ChooseImageModal;