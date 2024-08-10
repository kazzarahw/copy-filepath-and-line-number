import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('copy-filepath-and-line-number.run', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const filePath = editor.document.uri.fsPath;
            const lineNumber = editor.selection.active.line + 1; // Line numbers in VS Code are 0-based

            const formattedString = `${filePath}#L${lineNumber}`;
            vscode.env.clipboard.writeText(formattedString).then(() => {
                vscode.window.showInformationMessage('Copied to clipboard: ' + formattedString);
            });
        } else {
            vscode.window.showInformationMessage('No active editor found');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
