import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Modal, ScrollView, View} from 'react-native';
import {
  Title,
  Button,
  useTheme,
  ActivityIndicator,
  Portal,
} from 'react-native-paper';
import {FormBuilder} from 'react-native-paper-form-builder';
import {createAccount} from '../../Fetches/CreateAccount';
import store from '../../Store/Store';

const CreateAccountModal = () => {
  const {colors} = useTheme();
  const [fName, setFName] = useState<string>('');
  const [lName, setLName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [PW, setPW] = useState<string>('');
  const [confirmPW, setConfirmPW] = useState<string>('');
  const {control, setFocus, setValue, handleSubmit} = useForm({
    defaultValues: {
      fName: '',
      lName: '',
      email: '',
      username: '',
      pw: '',
      confirmPW: '',
    },
  });

  const handleCreateAccount = () => {
    const user = {
      fName: fName,
      lName: lName,
      email: email,
      username: username,
      pw: PW,
    };

    if (PW === confirmPW) {
      createAccount(user);
    } else {
      console.log('pw no match');
    }
  };

  const handleCloseModal = () => {
    store.authStore.setCreateAccountModalOpen(false);
  };

  useEffect(() => {
    setValue('fName', '');
    setValue('lName', '');
    setValue('email', '');
    setValue('username', '');
    setValue('pw', '');
    setValue('confirmPW', '');
  }, [setValue]);

  return (
    <Modal visible={store.authStore.createAccountModalOpen}>
      <Portal>
        <Modal
          visible={store.authStore.createUserLoading}
          style={{padding: 100}}
          transparent={true}>
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, .5)',
              width: '100%',
              height: '100%',
            }}>
            <ActivityIndicator
              animating={store.authStore.createUserLoading}
              color={colors.accent}
              size="large"
              style={{marginTop: 150}}
            />
          </View>
        </Modal>
      </Portal>
      <View
        style={{
          marginHorizontal: 15,
          padding: 25,
          backgroundColor: colors.primary,
          borderRadius: 5,
        }}>
        <Title>Create Account</Title>
        <ScrollView style={{marginBottom: 15}}>
          <FormBuilder
            control={control}
            setFocus={setFocus}
            formConfigArray={[
              {
                name: 'fName',
                type: 'text',
                rules: {
                  required: {value: true, message: 'First name is required.'},
                  onChange: e => setFName(e.target.value),
                },
                textInputProps: {
                  label: 'First Name',
                  value: fName,
                },
              },
              {
                name: 'lName',
                type: 'text',
                rules: {
                  required: {value: true, message: 'Last name is required.'},
                  onChange: e => setLName(e.target.value),
                },
                textInputProps: {
                  label: 'Last Name',
                  value: lName,
                },
              },
              {
                name: 'email',
                type: 'email',
                rules: {
                  required: {
                    value: true,
                    message: 'Email address is required.',
                  },
                  onChange: e => setEmail(e.target.value),
                },
                textInputProps: {
                  label: 'Email',
                  value: email,
                },
              },
              {
                name: 'username',
                type: 'text',
                rules: {
                  required: {value: true, message: 'Username is required.'},
                  onChange: e => setUsername(e.target.value),
                },
                textInputProps: {
                  label: 'Username',
                  value: username,
                },
              },
              {
                name: 'pw',
                type: 'password',
                rules: {
                  required: {
                    value: true,
                    message: 'Password is required.',
                  },
                  onChange: e => setPW(e.target.value),
                },
                textInputProps: {
                  label: 'Password',
                  value: PW,
                },
              },
              {
                name: 'confirmPW',
                type: 'password',
                rules: {
                  required: {
                    value: true,
                    message: 'Password confirmation is required.',
                  },
                  onChange: e => setConfirmPW(e.target.value),
                },
                textInputProps: {
                  label: 'Confirm Password',
                  value: confirmPW,
                },
              },
            ]}
          />
          <Button
            mode="contained"
            style={{marginVertical: 15, backgroundColor: colors.accent}}
            onPress={handleCloseModal}>
            Close
          </Button>
          <Button
            mode="contained"
            style={{backgroundColor: colors.accent}}
            onPress={handleSubmit(() => handleCreateAccount())}>
            Create Account
          </Button>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default observer(CreateAccountModal);
