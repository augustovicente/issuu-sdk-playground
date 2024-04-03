import { useIssuuSDK } from "@/hooks/useIssuuSDK";
import { LoadingStore, useLoadingStore } from "@/hooks/usePageLoading";
import {
    GetMyDraftsResult,
    GetMyProfileResult,
    GetMyPublicationsResult,
    GetMyStacksResult,
    GetMyStatsResult
} from "issuu-sdk/types";
import { useEffect, useState } from "react";

export const UserPage = () => {
    const [profile, setProfile] = useState<GetMyProfileResult>();
    const [publications, setPublications] = useState<GetMyPublicationsResult>();
    const [drafts, setDrafts] = useState<GetMyDraftsResult>();
    const [stacks, setStacks] = useState<GetMyStacksResult>();
    const [statistics, setStatistics] = useState<GetMyStatsResult>();

    const { user } = useIssuuSDK();
    const { setLoading, loading }: LoadingStore = useLoadingStore((state) => state);

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        user.getAllData(undefined, undefined, controller)
            .then((result) => {
                setPublications(result[0]);
                setDrafts(result[1]);
                setStacks(result[2]);
                setStatistics(result[3]);
                setProfile(result[4]);
            })
            .finally(() => {
                setLoading(false);
            });

        return () => {
            controller.abort();
        };
    }, [user]);

    return loading ? null : (<div style={{
        display: 'flex',
        gap: '20px',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    }}>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            textAlign: 'left',
        }}>
            <img 
                style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '100%',
                }}
                src={"https://"+profile?.profileImages.thumbnail}
                alt="Profile"
            />
            <h3><b>Profile Information</b></h3>
            <span><b>Username:</b> {profile?.username}</span>
            <span><b>Display Name:</b> {profile?.displayName}</span>
            <span><b>Owner Name:</b> {profile?.ownerName}</span>
        </div>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            textAlign: 'left',
        }}>
            <h3><b>Stats</b></h3>
            <span><b>Publications Count:</b> {publications?.pageSize}</span>
            <span><b>Drafts Count:</b> {drafts?.pageSize}</span>
            <span><b>Stacks Count:</b> {stacks?.results.length}</span>
            <span><b>Reads:</b> {statistics?.reads}</span>
            <span><b>Impressions:</b> {statistics?.impressions}</span>
            <span><b>Clicks:</b> {statistics?.clicks}</span>
            <span><b>Average time spent:</b> {statistics?.averageTimeSpent.toFixed(2)}</span>
        </div>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            textAlign: 'left',
        }}>

        </div>
    </div>);
};
