"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
class Group {
    constructor(entry) {
        this.id = parseInt(entry.substring(4, 2));
        this.name = entry.substring(10, 20);
        this.name.trim();
    }
}
exports.Group = Group;
