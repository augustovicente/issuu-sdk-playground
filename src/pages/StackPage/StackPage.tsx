import { useIssuuSDK } from "@/hooks/useIssuuSDK";
import { LoadingStore, useLoadingStore } from "@/hooks/usePageLoading";
import { GetMyStacksResult } from "@issuu/issuu-api-sdk/types";
import { useEffect, useState } from "react";

export const StackPage = () => {
    const [stacks, setStacks] = useState<GetMyStacksResult>();
    const { user } = useIssuuSDK();
    const { setLoading, loading }: LoadingStore = useLoadingStore((state) => state);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        user.getMyStacks(undefined, undefined, undefined, controller)
            .then((result) => {
                setStacks(result);
            })
            .finally(() => {
                setLoading(false);
            });

        return () => {
            controller.abort();
        };
    }, []);

    if (!stacks && !loading) {
        return (
            <p className="empty-state">
                No Stacks? <br></br>
                You may create a new one! 🍎
            </p>
        );
    }

    return (
        <div>
            {stacks?.results.map((stack) => (
                <div key={stack.id} className="publication-data">
                    <span>
                        {stack.title}
                    </span>
                    <span>{stack.id}</span>
                    <button onClick={() => copyToClipboard(stack.id)}>
                        Copy
                    </button>
                </div>
            ))}
        </div>
    );
};
