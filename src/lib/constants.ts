export enum EDataTheme {
    CORPORATE = "corporate",
    BUSINESS = "business",
}

export enum ETextTones {
    PROFESSIONAL = "professional",
    CASUAL = "casual",
    FRIENDLY = "friendly",
    ACADEMIC = "academic",
    FUNNY = "funny",
    INTERESTING = "interesting",
    CURIOUS = "curious",
    SURPRISE = "surprise",
}

export const TEXT_TONES: { id: ETextTones; text: string; emoji: string }[] = [
    { id: ETextTones.PROFESSIONAL, text: "Professional", emoji: "💼" },
    { id: ETextTones.CASUAL, text: "Casual", emoji: "✍️" },
    { id: ETextTones.FRIENDLY, text: "Friendly", emoji: "🤝" },
    { id: ETextTones.ACADEMIC, text: "Academic", emoji: "🎓" },
    { id: ETextTones.FUNNY, text: "Funny", emoji: "😆" },
    { id: ETextTones.INTERESTING, text: "Interesting", emoji: "🤔" },
    { id: ETextTones.CURIOUS, text: "Curious", emoji: "🧐" },
    { id: ETextTones.SURPRISE, text: "Surprise Me!", emoji: "🎁" },
];

export enum EAuthTabs {
    LOGIN,
    SIGNUP,
}

export const AUTH_PATHS = ["/login", "/signup"];
export const USER_AUTH_PATHS = ["/history"];

export enum EAlertType {
    INFO = "info",
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
}

export enum EOTPOperation {
    SIGNUP,
    CHANGE_EMAIL,
    FORGOT_PASSWORD,
}
