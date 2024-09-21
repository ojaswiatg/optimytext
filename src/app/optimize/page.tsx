"use client";

import { TEXT_TONES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { FormEvent, useState } from "react";

export default function Phrase() {
    const [textForm, setTextForm] = useState({
        text: "",
        tone: "",
    });
    const [response, setResponse] = useState("");

    function onToneClick(id: string) {
        setTextForm({
            ...textForm,
            tone: id,
        });
    }

    function onTextChange(event: FormEvent<HTMLTextAreaElement>) {
        setTextForm({
            ...textForm,
            text: event.currentTarget.value,
        });
    }

    function optimizeText(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setResponse(
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla aliquam iure repellendus quae! Modi pariatur soluta provident commodi ab. Suscipit quis inventore quisquam provident harum distinctio rem earum maiores reprehenderit incidunt tempora amet minus molestiae delectus, mollitia odio, beatae repellendus nulla expedita!",
        );
    }

    function copyResponseToClipboard() {
        navigator.clipboard
            .writeText(response)
            .then(() => {
                alert("Text copied to clipboard");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="mx-auto h-fit w-full max-w-screen-md px-md md:px-lg mt-32 pb-4">
            <form onSubmit={optimizeText} className="px-4 w-full grid">
                <p className="text-2xl mx-auto">Optimize any text</p>
                <textarea
                    name="text"
                    id="text"
                    value={textForm.text}
                    onChange={onTextChange}
                    rows={4}
                    className="textarea textarea-primary w-full mt-4 shadow-sm"
                    placeholder="Enter your text here..."
                ></textarea>
                <div
                    className={cn("w-fit mt-2 ml-auto text-sm", {
                        "text-red-500": textForm.text.length > 280,
                    })}
                >
                    {textForm.text.length}/280
                </div>
                {response.length > 0 ? (
                    <div className="card border border-secondary mt-4 shadow-sm">
                        <div className="card-body">
                            <div className="w-full flex justify-between items-center">
                                <p className="card-title">Optimized text</p>
                                <button onClick={copyResponseToClipboard}>
                                    <div className="i-mdi-content-copy h-5 w-5" />
                                </button>
                            </div>
                            <p>{response}</p>
                        </div>
                    </div>
                ) : null}
                <p className="text-md mt-4 text-primary mx-auto">
                    Choose a tone
                </p>
                <div className="flex flex-wrap gap-4 w-full mt-4">
                    {TEXT_TONES.map((tone) => {
                        return (
                            <button
                                key={`para-text-tone-${tone.id}`}
                                type="button"
                                className={cn(
                                    "badge badge-ghost p-4 text-md flex gap-2",
                                    {
                                        "border-primary border-2 shadow-md":
                                            tone.id === textForm.tone,
                                    },
                                )}
                                onClick={() => onToneClick(tone.id)}
                            >
                                <span>{tone.emoji}</span>
                                <span>{tone.text}</span>
                            </button>
                        );
                    })}
                </div>
                <button
                    className="btn btn-primary btn-md text-white mt-4 mx-0 md:mt-8 md:mx-48"
                    type="submit"
                >
                    {response.length > 0 ? "Optimize again" : "Optimize"}
                </button>
            </form>
        </div>
    );
}
