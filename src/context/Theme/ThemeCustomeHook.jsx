import { useContext } from "react"
import { ThemeCustomeContext } from "./ThemeCustomeContext"

export const ThemeCustomeHook = () => {
    const ctx = useContext(ThemeCustomeContext)

    if (!ctx) {
        throw new Error("ThemeCustomeHook must be used inside ThemeCustomeProvider");
    }
    return ctx;
}