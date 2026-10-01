import { getGreeting } from "./greetings";

describe("getGreeting", () => {
    it("greets in the morning", () => {
        expect(getGreeting(8)).toBe("Good morning");
    });
    it("greets in the afternoon", () => {
        expect(getGreeting(14)).toBe("Good afternoon");
    });
    it("greets in the evening", () => {
        expect(getGreeting(20)).toBe("Good evening");
    });
});