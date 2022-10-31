import { constants } from "buffer"
import { useState, useEffect } from "react"

interface IBeforeInstallPromptEvent extends Event {
    readonly platforms: string[]
    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed"
        platform: string
    }>
    prompt(): Promise<void>
}

export function useAddToHomescreenPrompt(): [
    IBeforeInstallPromptEvent | null,
    () => void,
    boolean
] {
    const [promptInstall, setPromptInstall] = useState<IBeforeInstallPromptEvent>(null)
    const [isDevice, setIsDevice] = useState(false)

    const promptToInstall = () => {
        if (!promptInstall) {
            return
        }

        promptInstall.prompt()
    }

    useEffect(() => {
        const handler = (e: IBeforeInstallPromptEvent) => {
            e.preventDefault()
            // console.log("we are being triggered :D")
            setPromptInstall(e)
        }
        window.addEventListener("beforeinstallprompt", handler)

        return () => window.removeEventListener("transitionend", handler)
    }, [])

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.search(/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i) != -1)
            setIsDevice(true)
    }, [])

    return [promptInstall, promptToInstall, isDevice]
}
