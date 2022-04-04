export default (): boolean => {
    return Boolean(localStorage.getItem("user") && Date.now() - Date.parse(localStorage.getItem("userTime") || "") < 86400000);
}