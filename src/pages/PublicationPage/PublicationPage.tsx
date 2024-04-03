import { useEffect, useState } from "react";
import { GetMyPublicationsResult } from "issuu-sdk/types";
import { useIssuuSDK } from "@/hooks/useIssuuSDK";
import { LoadingStore, useLoadingStore } from "@/hooks/usePageLoading";

export const PublicationPage = () => {
    const [publications, setPublications] = useState<GetMyPublicationsResult>();
    const { user } = useIssuuSDK();
    const { setLoading, loading }: LoadingStore = useLoadingStore((state) => state);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        user.getMyPublications(undefined, undefined, undefined, undefined, controller)
            .then((result) => {
                setPublications(result);
            })
            .finally(() => {
                setLoading(false);
            });
        
        return () => {
            controller.abort();
        };
    }, []);

    if (!publications && !loading) {
        return (
            <p className="empty-state">
                No publications? <br></br>Don't apple-y any pressure, but it's time to
                publish! 🍎
            </p>
        );
    }

    return (
        <div>
            {publications?.results.map((publication) => (
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
