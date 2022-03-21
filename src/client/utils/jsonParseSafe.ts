export default (textToParse: string | null | undefined) => {
    try {
        return JSON.parse(textToParse || "");
    } catch (error) {
        return null;
    }
}