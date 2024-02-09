import * as axios from 'axios';
import React from 'react';

declare function useFetchCsrfToken(): (path: string) => Promise<string>;
declare function useLogin(): {
    login: (requestBody: object) => Promise<{
        success: boolean;
    } | {
        success: boolean;
        error: unknown;
    } | undefined>;
};
declare function useRegister(): {
    register: (requestBody: object) => Promise<{
        success: boolean;
    } | {
        success: boolean;
        error: unknown;
    } | undefined>;
};
declare function useLogout(): {
    logout: () => Promise<{
        success: boolean;
        error: unknown;
    } | undefined>;
};

declare function useApiClient(): axios.AxiosInstance;

declare function AuthProvider({ config, children }: AuthContextProps): React.JSX.Element;

export { AuthProvider, useApiClient, useFetchCsrfToken, useLogin, useLogout, useRegister };
