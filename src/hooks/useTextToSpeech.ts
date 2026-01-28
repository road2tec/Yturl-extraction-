import { useEffect, useState, useRef, useCallback } from "react";

interface UseTextToSpeechProps {
    lang?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
}

export const useTextToSpeech = ({
    lang = "en-US",
    rate = 1,
    pitch = 1,
    volume = 1,
}: UseTextToSpeechProps = {}) => {
    const [isSupported, setIsSupported] = useState<boolean>(false);
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
    const synth = useRef<SpeechSynthesis | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
            synth.current = window.speechSynthesis;
            setIsSupported(true);
        }
    }, []);

    const speak = useCallback(
        (text: string) => {
            if (!synth.current || !isSupported) return;

            if (synth.current.speaking) {
                synth.current.cancel();
            }

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.rate = rate;
            utterance.pitch = pitch;
            utterance.volume = volume;

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            synth.current.speak(utterance);
        },
        [isSupported, lang, rate, pitch, volume]
    );

    const cancel = useCallback(() => {
        if (synth.current) {
            synth.current.cancel();
            setIsSpeaking(false);
        }
    }, []);

    return { isSupported, isSpeaking, speak, cancel };
};
