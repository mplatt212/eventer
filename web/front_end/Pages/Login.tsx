import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {Button, Portal, Text, Title} from 'react-native-paper';
import {View} from 'react-native';
import {FormBuilder} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';
import CreateAccountModal from '../Components/Login/CreateAccountModal';
import store from '../Store/Store';
import LoginInfoDialog from '../Components/LoginInfoDialog';
import {login} from '../Fetches/Login';

const Login = () => {
  const {control, setFocus, setValue, handleSubmit} = useForm({
    defaultValues: {
      username: '',
      pw: '',
    },
  });

  const onSubmit = async () => {
    login(store.authStore.username, store.authStore.pw);
  };

  useEffect(() => {
    setValue('username', '');
    setValue('pw', '');
  }, [setValue]);

  return (
    <>
      <View style={{padding: 35}}>
        <Portal>
          <CreateAccountModal />
        </Portal>
        <LoginInfoDialog />
        <Title style={{alignSelf: 'center', fontSize: 50, lineHeight: 50}}>
          Eventerr
        </Title>
        <Text style={{alignSelf: 'center', fontSize: 25, marginTop: 25}}>
          Login
        </Text>
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              name: 'username',
              type: 'text',
              rules: {
                required: {value: true, message: 'Username is required.'},
                onChange: e => store.authStore.setUsername(e.target.value),
              },
              textInputProps: {
                label: 'Username',
                value: store.authStore.username,
              },
            },
            {
              name: 'password',
              type: 'password',
              rules: {
                required: {
                  value: true,
                  message: 'Password is required.',
                },
                onChange: e => store.authStore.setPW(e.target.value),
              },
              textInputProps: {
                label: 'Password',
                value: store.authStore.pw,
              },
            },
          ]}
        />
        {store.authStore.loginErrorMsg !== '' && (
          <Text style={{color: 'red'}}>{store.authStore.loginErrorMsg}</Text>
        )}
        <Button
          mode="contained"
          onPress={handleSubmit(() => {
            console.log('Submit Btn Click')
            onSubmit();
          })}>
          Login
        </Button>
        <Text style={{alignSelf: 'center', marginVertical: 35}}>or</Text>
        <Button
          mode="contained"
          onPress={() => store.authStore.setCreateAccountModalOpen(true)}>
          Create Account
        </Button>
      </View>
    </>
  );
};

export default observer(Login);
