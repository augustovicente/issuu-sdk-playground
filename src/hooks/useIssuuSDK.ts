import IssuuSDK from 'issuu-sdk';

export function useIssuuSDK() {
    const token: string = localStorage.getItem('token')!;
    const issuu_instance = IssuuSDK(token);

    return issuu_instance;
}