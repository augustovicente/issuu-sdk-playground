import { useIssuuSDK } from "@/hooks/useIssuuSDK";
import { LoadingStore, useLoadingStore } from "@/hooks/usePageLoading";
import { GetMyDraftsResult } from "issuu-sdk/types";
import { useEffect, useState } from "react";

export const DraftPage = () => {
    const [drafts, setDrafts] = useState<GetMyDraftsResult>();
    const { user } = useIssuuSDK();
    const { setLoading, loading }: LoadingStore = useLoadingStore((state) => state);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    useEffect(() => {
        setLoading(true);
        const controller = new AbortController();
        user.getMyDrafts(undefined, undefined, undefined, controller)
            .then((result) => {
                setDrafts(result);
            })
            .finally(() => {
                setLoading(false);
            });

        return () => {
            controller.abort();
        };
    }, []);

    if (!drafts && !loading) {
        return (
            <p className="empty-state">
                No Drafts? <br></br>
                You may create a new one! 🍎
            </p>
        );
    }

    return (
        <div>
            {drafts?.results.map((publication) => (
                <div key={publication.slug} className="publication-data">
                    <a href={publication.location} target="_blank">
                        {publication.location}
                    </a>
                    <span>{publication.slug}</span>
                    <button onClick={() => copyToClipboard(publication.slug)}>
                        Copy
                    </button>
                </div>
            ))}
        </div>
    );
};
