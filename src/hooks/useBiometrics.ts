import { useState, useCallback, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

interface BiometricState {
  isSupported: boolean;
  isEnrolled: boolean;
  biometricTypes: LocalAuthentication.AuthenticationType[];
  isAuthenticating: boolean;
}

export function useBiometrics() {
  const [state, setState] = useState<BiometricState>({
    isSupported: false,
    isEnrolled: false,
    biometricTypes: [],
    isAuthenticating: false,
  });

  useEffect(() => {
    checkBiometrics();
  }, []);

  const checkBiometrics = useCallback(async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      const types =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      setState((prev) => ({
        ...prev,
        isSupported: compatible,
        isEnrolled: enrolled,
        biometricTypes: types,
      }));
    } catch {
      // biometrics not available
    }
  }, []);

  const authenticate = useCallback(
    async (
      promptMessage = 'Authenticate to access KAVACH',
    ): Promise<boolean> => {
      if (!state.isSupported || !state.isEnrolled) return false;

      setState((prev) => ({ ...prev, isAuthenticating: true }));
      try {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage,
          cancelLabel: 'Cancel',
          disableDeviceFallback: false,
          fallbackLabel: 'Use Passcode',
        });
        return result.success;
      } catch {
        return false;
      } finally {
        setState((prev) => ({ ...prev, isAuthenticating: false }));
      }
    },
    [state.isSupported, state.isEnrolled],
  );

  return {
    ...state,
    authenticate,
    checkBiometrics,
  };
}
