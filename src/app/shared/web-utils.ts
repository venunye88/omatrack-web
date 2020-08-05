export class WebUtils {
    public static getIsoDateString(date) {
        if (!date) return null
        date = new Date(date)
        return date = date.toISOString().substring(0, 10)
    }

    public static ReplaceDateTime(dateString: string) {
        if (dateString.includes("T0")) return dateString.replace("T0", "T1");
        else return dateString
    }

    public static getTimeString(date) {
        if (!date) return null
        date = new Date(date)
        return date = date.toISOString().substring(11, 16)
    }

    public static camelize(str: string) {
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
            if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
            return index == 0 ? match.toLowerCase() : match.toUpperCase();
        });
    }

    public static getColor() {
        // let colours = ["red", "green", "blue", "violet", "yellow", "navajo"];
        // return `${colours[Math.floor((Math.random() * colours.length))]}`;
        let newColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
        return newColor;
    }

    public static generateAlpha(len: number) {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < len; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    public static generateNumeric(len: number) {
        let text = "";
        const possible = "0123456789";
        for (var i = 0; i < len; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }


}

