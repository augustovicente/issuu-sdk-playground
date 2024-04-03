import { useState } from "react";
import "./Main.css";
import { UserPage } from "../../pages/UserPage/UserPage";
import { PublicationPage } from "@/pages/PublicationPage/PublicationPage";
import { DraftPage } from "@/pages/DraftPage/DraftPage";
import { StackPage } from "@/pages/StackPage/StackPage";
import { LoadingStore, useLoadingStore } from "@/hooks/usePageLoading";
import { Loading } from "../Loading/Loading";

type Tabs = "user" | "drafts" | "publications" | "stacks";

const Main = () => {
    const [selectedOption, setSelectedOption] = useState<Tabs>("drafts");
    const { loading }: LoadingStore = useLoadingStore((state) => state);

    const renderOption = () => {
        switch (selectedOption) {
            case "drafts":
                return <DraftPage />;
            case "publications":
                return <PublicationPage />;
            case "stacks":
                return <StackPage />;
            case "user":
                return <UserPage />;
            default:
                return null;
        }
    };

    return (
        <div className="main-container">
            <div className="main-buttons">
                <button
                    onClick={() => {
                        setSelectedOption("user");
                    }}
                    className={selectedOption === "user" ? "selected" : ""}
                >
                    User Information
                </button>
                <button
                    onClick={() => {
                        setSelectedOption("drafts");
                    }}
                    className={selectedOption === "drafts" ? "selected" : ""}
                >
                    Drafts List
                </button>
                <button
                    onClick={() => {
                        setSelectedOption("publications");
                    }}
                    className={selectedOption === "publications" ? "selected" : ""}
                >
                    Publications List
                </button>
                <button
                    onClick={() => {
                        setSelectedOption("stacks");
                    }}
                    className={selectedOption === "stacks" ? "selected" : ""}
                >
                    Stacks List
                </button>
            </div>
            <div className="main-render">
                {loading && <Loading />}
                {renderOption()}
            </div>
        </div>
    );
};

export default Main;
