import { useEffect, useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        localStorage.setItem("token", token);
    }, [token]);

    return (
        <div className="side">
            <div className="side-buttons">
                <span>
                    Token
                </span>
            </div>

            <div className="side-inputs">
                <div>
                    <input
                        type="text"
                        placeholder="Token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
