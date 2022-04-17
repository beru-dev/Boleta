import processQuery from "../../../src/server/utils/processQuery";

describe("processQuery", () => {
    xit("should", () => {
        const stuff = {
            // @ts-ignore
            Symbol(and): {"id": "1"}
        }
        expect(processQuery({id:"1"})).toEqual(stuff);
    });
});