export const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
};

export const monthShortName = (fullMonthName: string) => {
    const shortMonthName = new Date(`${fullMonthName} 1, 2023`).toLocaleString('en-US', { month: 'short' });
    return shortMonthName;
}

export const isEmpty = (e:any) => {
    switch (e) {
        case "":
        case null:
        case undefined:
            return true;
        default:
            return false;
    }
}