import { getAllChars } from "@/lib/utils";

export const createId = () => {
    const arr = getAllChars();
    let id = [];
    for (let i = 0; i <= 24; i++) {
        id.push(arr[Math.floor(Math.random() * 62)])
    }
    return id.join('');
}
