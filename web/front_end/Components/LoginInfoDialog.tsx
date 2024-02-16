import {observer} from 'mobx-react';
import React from 'react';
import {Modal, View, ActivityIndicator} from 'react-native';
import {Dialog, Portal, Button, Paragraph} from 'react-native-paper';
import store from '../Store/Store';

const LoginInfoDialog = () => {
  return (
    <Portal>
      <Dialog visible={store.authStore.infoModalOpen}>
        <Dialog.Title>{store.authStore.infoModalTitle}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{store.authStore.infoModalMsg}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="contained"
            onPress={() => store.authStore.setInfoModalOpen(false)}>
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default observer(LoginInfoDialog);
