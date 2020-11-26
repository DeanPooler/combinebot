exports.formatter = formatter = {
    string: 'aaa',
    removeColorCodes: function removeColorCodes() {
        output = this.string;
        this.string = output.replace(/(\§\d)|(\§[a-f])/gm, '');
        return this.string;
    },
    italics: function italics() {
        this.string = `*${this.string}*`;
        return this.string;
    },
    bold: function bold() {
        this.string = `**${this.string}**`;
        return this.string;
    },
    underline: function underline() {
        this.string = `__${this.string}__`;
        return this.string;
    },
    strikethrough: function strikethrough() {
        this.string = `~~${this.string}~~`;
        return this.string;
    },
    codeblock: function codeblock() {
        this.string = `\`\`\`${this.string}\`\`\``;
        return this.string;
    },
    blockSingle: function blockSingle() {
        this.string = `>${this.string}`;
        return this.string;
    },
    blockMulti: function blockMulti() {
        this.string = `>>>>${this.string}`;
        return this.string;
    },
    red: function red() {
        this.string = `\`\`\`diff\n- ${this.string} -\n\`\`\``;
        return this.string;
    },
    green: function green() {
        this.string = `\`\`\`diff\n+ ${this.string} +\n\`\`\``;
        return this.string;
    },
    darkGreen: function darkGreen() {
        this.string = `\`\`\`bash\n"${this.string}"\n\`\`\``;
        return this.string;
    },
    blue: function blue() {
        this.string = `\`\`\`ini\n[${this.string}]\n\`\`\``;
        return this.string;
    },
    setString: function setString(input) {
        this.string = input;
        return this.string;
    }

}