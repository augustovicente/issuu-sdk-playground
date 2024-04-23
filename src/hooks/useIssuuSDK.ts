import IssuuSDK from "@issuu/issuu-api-sdk";

export function useIssuuSDK() {
    const token: string = localStorage.getItem('token')!;
    const issuu_instance = IssuuSDK(token);

    return issuu_instance;
}