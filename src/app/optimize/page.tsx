"use client";

import { ETextTones, TEXT_TONES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { isEmpty } from "lodash-es";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Phrase() {
    const [lastInput, setLastInput] = useState("");
    const [tone, setTone] = useState("");

    const { messages, input, handleInputChange, handleSubmit } = useChat();

    function onToneClick(id: string) {
        setTone(id);
    }

    function optimizeText(event: FormEvent<HTMLFormElement>) {
        // if tone is surprise then select a random tone
        if (tone === ETextTones.SURPRISE || !tone) {
            const randomIndex = Math.floor(
                Math.random() * (TEXT_TONES.length - 1),
            );
            setTone(TEXT_TONES[randomIndex].id);
        }

        setLastInput(input);
        handleSubmit(
            { preventDefault: () => event.preventDefault() },
            {
                body: {
                    messages: [
                        {
                            role: "user",
                            content: `${input}`,
                        },
                    ],
                    tone,
                },
            },
        );
    }

    function reOptimizeText() {
        handleInputChange({
            target: { value: lastInput },
        } as ChangeEvent<HTMLInputElement>);
        handleSubmit(
            { preventDefault: () => {} },
            {
                body: {
                    messages: [
                        {
                            role: "user",
                            content: `${lastInput}`,
                        },
                    ],
                    tone,
                },
            },
        );
    }

    function copyResponseToClipboard() {
        const text = document.querySelector("#text-response")?.innerHTML ?? "";
        navigator.clipboard
            .writeText(text)
            .then(() => {
                alert("Text copied to clipboard");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="mx-auto h-fit w-full max-w-screen-md px-md md:px-lg mt-8 md:mt-24 pb-4">
            <form onSubmit={optimizeText} className="px-4 w-full grid">
                <p className="text-2xl mx-auto">Optimize any text</p>
                <textarea
                    name="text"
                    id="text"
                    value={input}
                    onChange={handleInputChange}
                    rows={4}
                    className="textarea textarea-primary w-full mt-4 shadow-sm"
                    placeholder="Enter your text..."
                ></textarea>
                <div
                    className={cn("w-fit mt-2 ml-auto text-sm", {
                        "text-red-500": input.length > 280,
                    })}
                >
                    {input.length}/280
                </div>
                {!isEmpty(messages?.[messages.length - 1]?.content) ? (
                    <div className="card border border-secondary mt-4 shadow-sm">
                        <div className="card-body p-4">
                            <div className="w-full flex gap-4 items-center">
                                <p className="card-title">Optimized text</p>
                                <button onClick={copyResponseToClipboard}>
                                    <div className="i-mdi-content-copy h-4 w-4" />
                                </button>
                                <button onClick={reOptimizeText}>
                                    <div className="i-mdi-reload h-4 w-4" />
                                </button>
                            </div>
                            {messages?.[messages.length - 1]?.role ===
                            "assistant" ? (
                                <p id="text-response">
                                    {messages?.[messages.length - 1]?.content}
                                </p>
                            ) : null}
                        </div>
                    </div>
                ) : null}
                <p className="text-md mt-4 text-primary mx-auto">
                    Choose a tone
                </p>
                <div className="flex flex-wrap gap-4 w-full mt-4">
                    {TEXT_TONES.map((tn) => {
                        return (
                            <button
                                key={`para-text-tone-${tn.id}`}
                                type="button"
                                className={cn(
                                    "badge badge-ghost p-4 text-md flex gap-2",
                                    {
                                        "border-primary border-2 shadow-md":
                                            tn.id === tone,
                                    },
                                )}
                                onClick={() => onToneClick(tn.id)}
                            >
                                <span>{tn.emoji}</span>
                                <span>{tn.text}</span>
                            </button>
                        );
                    })}
                </div>
                <button
                    className="btn btn-primary btn-md text-white mt-4 mx-0 md:mt-8 md:mx-48"
                    type="submit"
                >
                    Optimize
                </button>
            </form>
        </div>
    );
}
